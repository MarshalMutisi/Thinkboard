import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimit.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);

// Apply CORS for dev or prod
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:5174" }));
} else {
  app.use(cors()); // optional in production
}

// API routes first
app.use("/api/notes", notesRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route to serve React's index.html
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"), (err) => {
      if (err) next(err);
    });
  });
}

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
