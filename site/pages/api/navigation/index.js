import connectDB from "../../../utils/connectDB";
import Navigations from "../../../models/navigationModel";
import NavigationCategories from "../../../models/navigationCategoryModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getNavigations(req, res);
      break;
  }
};

const getNavigations = async (req, res) => {
  try {
    const navigations = await Navigations.find().populate({ path: "category children",model:NavigationCategories,populate: {path: "children",populate: { path: "children" ,populate: {path: "children",populate: {path: "children",populate: {path: "children",populate: {path: "children"}}}}}}});
    res.json({ navigations });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
