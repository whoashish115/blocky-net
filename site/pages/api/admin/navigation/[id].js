import connectDB from "../../../../utils/connectDB";
import Navigations from "../../../../models/navigationModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getNavigation(req, res);
      break;
    case "PUT":
      await updateNavigation(req, res);
      break;
    case "DELETE":
      await deleteNavigation(req, res);
      break;
  }
};

const getNavigation = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    const navigation = await Navigations.findById(id);
    if (!navigation)
      return res.status(400).json({ err: "This navigation does not exist." });

    res.json({ navigation });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateNavigation = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name, url, icon, category, children } = req.body;
    const { id } = req.query;

    if (!name || !url || !icon || !category)
      return res.status(400).json({ err: "Please add all the fields." });

    const oldNavigation = await Navigations.findOne({ _id: id });
   
    const newChildrenIncludes = children.filter((value) => !oldNavigation.children.includes(value));
    const oldChildrenDiscludes = oldNavigation.children.filter((value) => !children.includes(value));

    newChildrenIncludes.forEach(async (navigationId) => {
      await Navigations.findByIdAndUpdate(navigationId, { isChildren: true, $push: { parents: id }, },{ new: true });
    });
    
    oldChildrenDiscludes.forEach(async (navigationId) => {
      const parentUpdatedNavigation = await Navigations.findByIdAndUpdate(navigationId, { $pull: { parents: id }, },{ new: true });
      await Navigations.findByIdAndUpdate(navigationId, { isChildren: parentUpdatedNavigation.parents.length == 0 ? false : true },{ new: true });
    });

    await Navigations.findOneAndUpdate(
      { _id: id },
      {
        name,
        url,
        icon,
        category,
        children: children.length !== 0 ? children : [],
      },
    );

    res.json({ msg: "Navigation Updated" });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteNavigation = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const oldNavigation = await Navigations.findOne({ _id: id });
    oldNavigation.children.forEach(async (navigationId) => {
      const parentUpdatedNavigation = await Navigations.findByIdAndUpdate(navigationId, { $pull: { parents: id }, },{ new: true });
      await Navigations.findByIdAndUpdate(navigationId, { isChildren: parentUpdatedNavigation.parents.length == 0 ? false : true },{ new: true });
    });


    await Navigations.findByIdAndDelete({ _id: id });
    res.json({ msg: "Navigation Deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
