import connectDB from "../../../../utils/connectDB";
import NavigationCategories from "../../../../models/navigationCategoryModel";
import Navigations from "../../../../models/navigationModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getNavigationCategory(req, res);
      break;
    case "PUT":
      await updateNavigationCategory(req, res);
      break;
    case "DELETE":
      await deleteNavigationCategory(req, res);
      break;
  }
};


const getNavigationCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    const navigationCategory = await NavigationCategories.findById(id);
    if (!navigationCategory) return res.status(400).json({ err: "This navigation category does not exist." });

    res.json({ navigationCategory });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateNavigationCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name ,index} = req.body;

    if (!name || !index) {
      return res.status(400).json({ err: "Please add all the fields." });
    }

    await NavigationCategories.findOneAndUpdate(
      { _id: id },
      {
        name,
        index
      }
    );

    res.json({ msg: "Navigation Category Updated" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteNavigationCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    await NavigationCategories.findByIdAndDelete({ _id: id });
    await Navigations.deleteMany({ category: id });

    res.json({ msg: "Navigation Category Deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
