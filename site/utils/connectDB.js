import mongoose from "mongoose";

const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    mongoose.connect(
        process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        },
        (err) => {
            if (err) throw err;
        }
    );
};

export default connectDB;
