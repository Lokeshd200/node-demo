// backend-api/routes/userRoutes.js
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  router.post("/", async (req, res) => {
    const { id, name, email } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
        [id, name, email]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, req.params.id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};