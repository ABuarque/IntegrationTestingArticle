import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    favouriteColor: {
        type: String,
        required: false
    }
}, {
    timestamp:true
});

export default mongoose.model("User", userSchema);
