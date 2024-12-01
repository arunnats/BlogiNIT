const pool = require("../db");

const createUser = async (username, email, hashedPassword, profilePic) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, profilePic]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const getUserById = async (userId) => {
  const result = await pool.query(
    "SELECT user_id, username, email, profile_pic FROM users WHERE user_id = $1",
    [userId]
  );
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };