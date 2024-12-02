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
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only PNG files are allowed"));
    }
  },
});
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

    const token = generateToken(newUser); // Generate JWT token
    const { user_id, profile_pic } = newUser; // Destructure user details

    console.log("User created successfully");

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        user_id,
        username: newUser.username,
        email: newUser.email,
        profile_pic,
      },
    });
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
      // Convert profile_pic Buffer to Base64 string
      const profilePicBase64 = profile_pic
        ? profile_pic.toString("base64")
        : null;

      console.log("logged in");
      console.log({
        message: "Login successful",
        token,
        user: {
          user_id,
          profile_pic: profilePicBase64,
        },
      });

      res.json({
        message: "Login successful",
        token,
        user: {
          user_id,
          profile_pic: profilePicBase64,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Route to fetch user profile picture
app.get("/profile-pic/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userDb.getUserById(id);
    if (!user || !user.profile_pic) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    const profilePicBase64 = user.profile_pic
      ? user.profile_pic.toString("base64")
      : null;

    res.json({ profilePic: profilePicBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// All Posts Ordered by timestamps
app.get(
  "/posts",
  // passport.authenticate("jwt", { session: false }),
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

//creating posts  - FIX VALIDATIN
app.post(
  "/profile/create-post",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, content, authorId } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Missing required fields: title and content are required.",
      });
    }

    // Log the token for debugging
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      console.log("Received JWT Token:", token);
    } else {
      console.log("No JWT Token provided.");
    }

    // const authorId = req.user.user_id;

    try {
      const newPost = await postDb.createPost(authorId, title, content);
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Error creating post" });
    }
  }
);

// all posts of a particular user
app.get(
  "/posts/user/:userId",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Extract userId from the URL parameters
    const { userId } = req.params;

    try {
      // all posts from user
      const posts = await postDb.getAllPostsByUser(userId);

      if (posts.length === 0) {
        return res
          .status(201)
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

// user details
app.get("/users/user-details/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userWithPostCount = await userDb.getUserPostCountById(userId);

    if (!userWithPostCount) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userWithPostCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details" });
  }
});

// a posts content - FIX VALIDATIN
app.get(
  "/posts/details",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { postId } = req.query;

      if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
      }

      // Fetch post details from the database
      const postDetails = await postDb.getPostById(postId);

      if (!postDetails) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(postDetails);
    } catch (error) {
      console.error("Error fetching post details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = app;

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
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;

    try {
      // Fetch comments for the specified post from the database
      const comments = await commentDb.getCommentsByPostId(postId);

      if (comments.length === 0) {
        return res
          .status(203)
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
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;
    const { content, userId } = req.body;
    console.log("yooo i start");

    if (!content) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    try {
      const newComment = await commentDb.createComment(postId, userId, content);

      console.log("comment done");
      res
        .status(201)
        .json({ message: "Comment added successfully", newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding comment" });
    }
  }
);


// Route to get the count of comments for a specific post
app.get('/posts/:postId/comments/count', async (req, res) => {
  const { postId } = req.params;

  try {
      const commentCount = await commentDb.getCommentCountByPostId(postId);
      res.status(200).json({ postId, commentCount });
  } catch (error) {
      console.error("Error fetching comment count:", error);
      res.status(500).json({ error: "Failed to fetch comment count" });
  }
});


// Search the users by username
app.get("/users/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const searchResults = await userDb.searchUsers(query);
    res.status(200).json({ results: searchResults });
  } catch (error) {
    res.status(203).json({ results: null });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "The server is running" });
});

// If the routes do not work uncomment this
// app.use('/posts', postRoutes);
// app.use('/comments', commentRoutes);
