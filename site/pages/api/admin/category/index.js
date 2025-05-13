import connectDB from "../../../../utils/connectDB";
import Categories from "../../../../models/categoryModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
  }
};

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name, slug } = req.body;
    if (!name || !slug)
      return res.status(400).json({ err: "Please add all the fields." });

    const category = await Categories.findOne({ slug });
    if (category)
      return res.status(400).json({ err: "This slug already exists." });

    const newCategory = new Categories({ name, slug });
    await newCategory.save();

    res.json({ msg: "New Category created" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
