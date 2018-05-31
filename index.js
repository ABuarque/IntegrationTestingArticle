import app from "./app";
import mongoose from "mongoose";

mongoose.connect("mongodb://animal505:vaca505@ds239930.mlab.com:39930/article-in");

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
