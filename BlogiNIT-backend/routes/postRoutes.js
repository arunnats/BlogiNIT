const express = require('express');
const router = express.Router();
const { createPost, updatePost, getAllPosts, getAllPostsByUser } = require('../controllers/postController');

router.post('/', createPost); // create a post endpoint: /posts
router.put('/:postId', updatePost); //update a post endpoint: /posts/:postId
router.get('/', getAllPosts); // get all the posts endpoint:  /posts
router.get('/user/:userId', getAllPostsByUser) // get all posts by a user endpoint: /posts/user/:userId