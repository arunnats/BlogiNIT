const { createPost, updatePost, getPostById, getAllPosts, getAllPostsByUser } = require('../models/Post');

exports.createPost = async (req, res) => {
    
    //Change req.body.authorId to req.user.userId when auth is implemented
    const authorId = req.body.authorId;
    const { title, content } = req.body;

    try {
        const post = await createPost(authorId, title, content);
        res.status(201).json(post);
    } catch(error) {
        res.status(500).json({error: 'Post Creation Failed'});
    }
};

exports.updatePost = async (req, res) => {
    
    const { postId } = req.params;
    const { title, content } = req.body;
    const { authorId } = req.body.authorId; //replace with req.user.userId

    try {
        const updatedPost = await updatePost(postId, authorId, title, content);
        if(!updatedPost){
            return res.status(404).json({error: 'Post not found or unauthorized.'})
        }
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(500).json({error: 'Post Updation Failed'});
    }
};

exports.getAllPosts = async (req, res) => {
    
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({error: 'Could not get all posts'});
    }
};

exports.getAllPostsByUser = async (req, res) => {
    
    const { userId } = req.params;

    try {
        const post = await getAllPostsByUser(userId);
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json({error: 'Could not get posts by user'});
    }
};