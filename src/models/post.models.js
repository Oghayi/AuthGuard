
//CRUD API
import mongoose, { Schema } from "mongoose";


const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150,
    },
}, {
    timestamps: true, //Time when the post was created or updated
});

export const Post = mongoose.model("Post", postSchema);