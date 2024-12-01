const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const userDb = require("./models/User");
const commentDb = require("./models/Comment");
const postDb = require("./models/Post");
const { generateToken } = require("./config/passport");
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
const multer = require("multer");

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Backend online check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "The server is running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Register Route
app.post("/register", upload.single("profile_pic"), async (req, res) => {
  const { username, email, password } = req.body;
  const profilePic = req.file ? req.file.buffer : null; // Store the profile picture as a buffer

  // Check if user already exists
  const existingUser = await userDb.getUserByEmail(email);
  if (existingUser) {
    console.log("User already exists");
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in database
  try {
    const newUser = await userDb.createUser(
      username,
      email,
      hashedPassword,
      profilePic
    );
    const token = generateToken(newUser);
    console.log("User created successfully");
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch user profile picture
app.get("/profile-pic/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userDb.getUserById(id);
    if (!user || !user.profile_pic) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.set("Content-Type", "image/png"); // Adjust if you use another format
    res.send(user.profile_pic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    try {
      const token = generateToken(req.user); // Generate JWT token
      const { user_id, profile_pic } = req.user;

      res.json({
        message: "Login successful",
        token,
        user: {
          user_id,
          profile_pic,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// All Posts Ordered by timestamps
app.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // getting all posts
      const posts = await postDb.getAllPosts();
      res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  }
);

//creating posts
app.post(
  "/profile/create-post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Missing required fields: title and content are required.",
      });
    }

    const authorId = req.user.user_id;

    try {
      const newPost = await postDb.createPost(authorId, title, content);
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating post" });
    }
  }
);

// all posts of a particular user
app.get(
  "/posts/user/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Extract userId from the URL parameters
    const { userId } = req.params;

    try {
      // all posts from user
      const posts = await postDb.getAllPostsByUser(userId);

      if (posts.length === 0) {
        return res
          .status(404)
          .json({ message: "No posts found for this user." });
      }

      // Return the posts
      res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  }
);

// request to update a post
app.post(
  "/post/update/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params; // Extract postId from URL parameters
    const { title, content } = req.body; // Expect title and content from the request body
    const authorId = req.user.user_id;

    try {
      const updatedPost = await postDb.updatePost(
        postId,
        authorId,
        title,
        content
      );

      if (!updatedPost) {
        return res.status(404).json({
          message: "Post not found or user not authorized to edit this post.",
        });
      }

      res
        .status(200)
        .json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating post" });
    }
  }
);

// GET get comments for a specific post
app.get(
  "/post/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;

    try {
      // Fetch comments for the specified post from the database
      const comments = await commentDb.getCommentsByPostId(postId);

      if (comments.length === 0) {
        return res
          .status(404)
          .json({ message: "No comments found for this post." });
      }

      // Return the comments
      res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);

// Creating comments comment to a post
app.post(
  "/post/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.user_id;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    try {
      const newComment = await commentDb.createComment(postId, userId, content);

      // Respond with the newly added comment
      res
        .status(201)
        .json({ message: "Comment added successfully", newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding comment" });
    }
  }
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "The server is running" });
});

// If the routes do not work uncomment this
// app.use('/posts', postRoutes);
// app.use('/comments', commentRoutes);