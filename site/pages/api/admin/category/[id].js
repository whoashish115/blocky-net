import connectDB from "../../../../utils/connectDB";
import Categories from "../../../../models/categoryModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name,slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ err: "Please add all the fields." });
    }
    
    const category =  await Categories.findOne({slug})
    if(category){
      return res.status(400).json({ err: "This slug is already taken." });
    }

    await Categories.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug,
      }
    );

    res.json({ msg: "Category Updated" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    await Categories.findByIdAndDelete({ _id: id });
    res.json({ msg: "Category Deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
