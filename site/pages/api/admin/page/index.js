import connectDB from "../../../../utils/connectDB";
import Pages from "../../../../models/pageModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPages(req, res);
      break;
    case "POST":
      await createPage(req, res);
      break;
  }
};

const getPages = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const pages = await Pages.find();
    res.json({ pages });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createPage = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { title, slug, markdownContent,htmlContent } = req.body;

    if (!title || !slug || !markdownContent || !htmlContent)
      return res.status(400).json({ err: "Please add all the fields." });

    const page = await Pages.findOne({ slug });
    if (page) return res.status(400).json({ err: "Page slug already exists." });

    const newPage = new Pages({ title, slug, htmlContent,markdownContent });

    await newPage.save();

    res.json({ msg: "new Page Created" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
