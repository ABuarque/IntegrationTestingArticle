import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
