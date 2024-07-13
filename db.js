import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed !!!", err);
    return;
  }
  console.log("Connected to Database");

  // Create 'users' table if not exists
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      email VARCHAR(50) UNIQUE,
      password VARCHAR(250),
      img VARCHAR(250)
    )`, (err) => {
      if (err) {
        console.error("Error creating users table:", err);
      } else {
        console.log("Users table created or already exists");
      }
    });

  // Create 'posts' table if not exists
  db.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT PRIMARY KEY,
      title VARCHAR(50),
      \`desc\` TEXT,
      img VARCHAR(250),
      uid INT,
      cat VARCHAR(50),
      date DATETIME,
      FOREIGN KEY (uid) REFERENCES users(id)
    )`, (err) => {
      if (err) {
        console.error("Error creating posts table:", err);
      } else {
        console.log("Posts table created or already exists");
      }
    });
});
