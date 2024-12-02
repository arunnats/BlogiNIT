const pool = require("../db");

const createComment = async (postId, userId, content) => {
  const result = await pool.query(
    "INSERT INTO comments (post_id, user_id, content, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [postId, userId, content]
  );
  return result.rows[0];
};

const getCommentsByPostId = async (postId) => {
  const result = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY timestamp DESC",
    [postId]
  );
  return result.rows;
};

const getCommentCountByPostId = async (postId) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) AS comment_count FROM comments WHERE post_id = $1;`,
            [postId]
        );
        //converting to interger 
        return parseInt(result.rows[0].comment_count, 10);
    } catch (error) {
        console.error("Error in getCommentCountByPostId:", error);
        throw error;
    }
};

module.exports = { createComment, getCommentsByPostId , getCommentCountByPostId };
