import connectDB from "../../../../utils/connectDB";
import NavigationCategories from "../../../../models/navigationCategoryModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
  
    case "POST":
      await createNavigationCategory(req, res);
      break;
  }
};


const createNavigationCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name ,index} = req.body;
    if (!name || !index) return res.status(400).json({ err: "Please add all the fields." });

    const navigationCategory = await NavigationCategories.findOne({ index })
    if (navigationCategory) return res.status(400).json({ err: 'Navigation Index already exists.' })

    const newNavigationCategory = new NavigationCategories({ name ,index:Number(index)});
    await newNavigationCategory.save();

    res.json({ msg: "New Navigation Category created" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
