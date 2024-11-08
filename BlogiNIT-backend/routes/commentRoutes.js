const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');

router.post('/:postId', addComment);   // add a comment endpoint: /comments/:postId
router.get('/:postId', getComments);  //  get all the comments endpoint: /comments/:postId

module.exports = router;
