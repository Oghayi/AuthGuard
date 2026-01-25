import { Post } from "../models/post.models.js";

//Create a new post
const createPost = async (req, res) => {
    try {
        const {name, role, age} = req.body;
        if(!name || !role || !age){
            return res.status(400).json({message: "Please provide all required fields"});
        }
        const post = await Post.create({name, role, age});
        return res.status(201).json({"Post created successfully": post});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};

//Get all posts
const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};

const updatePost = async (req, res) => {
    try{
        //basic validation to check if the body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}