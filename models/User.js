import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamp:true
});

export default mongoose.model("User", userSchema);
