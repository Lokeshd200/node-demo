require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;


// Firebase Setup
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// PostgreSQL Setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully. Current time:", res.rows[0].now);
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./routes/userRoutes")(pool); // Pass pool to userRoutes
app.use("/users", userRoutes);

app.get("/protected", (req, res) => {
  res.json({ message: "Protected route" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { pool };