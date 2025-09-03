import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRoutes from "./routes/optimize.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",                     // VITE dev default
  "https://resume-genie-omega.vercel.app"     // Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/optimize", optimizeRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});