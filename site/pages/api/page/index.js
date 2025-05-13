import connectDB from "../../../utils/connectDB";
import Pages from "../../../models/pageModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPages(req, res);
      break;
  }
};

const getPages = async (req, res) => {
  try {
    const pages = await Pages.find()
    res.json({ pages });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
