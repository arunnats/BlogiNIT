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

const getUserPostCount = async () => {
  const result = await pool.query(`
    SELECT 
      users.user_id, 
      users.username, 
      COUNT(posts.post_id) AS post_count
    FROM users
    LEFT JOIN posts ON users.user_id = posts.author_id
    GROUP BY users.user_id, users.username
    ORDER BY users.username ASC;
  `);
  return result.rows;
};

const getUserPostCountById = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      users.user_id, 
      users.username, 
      COUNT(posts.post_id) AS post_count
    FROM users
    LEFT JOIN posts ON users.user_id = posts.author_id
    WHERE users.user_id = $1
    GROUP BY users.user_id, users.username;
  `,
    [userId]
  );
  return result.rows[0];
};

// search users by username
const searchUsers = async (searchQuery) => {
  const query = `
    SELECT 
      user_id,
      username,
      email,
      profile_pic
    FROM users
    WHERE 
      LOWER(username) LIKE LOWER($1)
    ORDER BY username ASC
  `;
  
  const searchPattern = `%${searchQuery}%`;
  
  try {
    const result = await pool.query(query, [searchPattern]);
    const users = result.rows.map(user => ({
      ...user,
      profile_pic: user.profile_pic ? user.profile_pic.toString('base64') : null
    }));
    return users;
  } catch (error) {
    console.error('Database search error:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserPostCount,
  getUserPostCountById,
  searchUsers
};
