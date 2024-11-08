const { createComment, getCommentsByPostId } = require('../models/Comment');

exports.addComment = async (req, res) => {
    const postId = req.params;
    const content = req.body;
    const userId = req.body.userId; // replace with req.user.userId

    try {
        const comment = await createComment(postId, userId, content);
        res.status(201).json(comment);
    } catch(error) {
        res.status(500).json({error: 'Failed to create comment'});
    }
};

exports.getCommentsByPostId = async (req, res) => {
    const postId = req.params;

    try {
        const comments = getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch(error) {
        res.status(500).json({error: 'Failed to retrieve comments'});
    };
}