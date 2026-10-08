const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = Number(process.env.PORT) || 5050;
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "db_455j2ngzu";

if (!mongoUri) {
  console.error("MONGODB_URI is required.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

async function start() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(databaseName);
    const students = db.collection("students");

    app.get("/students", async (req, res) => {
      try {
        const studentList = await students.find().toArray();
        res.json(studentList);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete("/students/:id", async (req, res) => {
      try {
        const result = await students.deleteOne({ studentId: req.params.id });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
