import connectDB from "../../../../utils/connectDB";
import Navigations from "../../../../models/navigationModel";
import auth from "../../../../middleware/auth";
import mongoose from "mongoose";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createNavigation(req, res);
      break;
  }
};

const createNavigation = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name, url, icon, category, children } = req.body;

    if (!name || !url || !icon || !category)
      return res.status(400).json({ err: "Please add all the fields." });

    const newNavigation = new Navigations({
      name,
      url,
      icon,
      category: mongoose.Types.ObjectId(category),
      children: children.length !== 0 ? children : [],
    });
    await newNavigation.save();

    if (children.length > 0) {
      children.forEach(async (navigationId) => {
        await Navigations.findByIdAndUpdate(navigationId, {
          isChildren: true,
          $push: { parents: newNavigation._id },
        });
      });
    }

    res.json({ msg: "New Navigation created" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
