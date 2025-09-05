import express from 'express'
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimit.js';
import cors from 'cors';


const app = express();
dotenv.config(); // Load .env variables
const PORT =process.env.PORT || 5001
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5174"
}));
app.use(rateLimiter);


app.use("/api/notes", notesRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});