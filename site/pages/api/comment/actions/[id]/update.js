import connectDB from "../../../../../utils/connectDB";
import Comments from "../../../../../models/commentModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateComment(req, res);
      break;
  }
};

const updateComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;
    const { content } = req.body
            
    await Comments.findOneAndUpdate({_id: id, user: result.id}, {content,edited:true})
    
    res.json({msg: 'Comment Updated!'})

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
