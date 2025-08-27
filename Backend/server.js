import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRoutes from "./routes/optimize.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/optimize",optimizeRoutes);
app.listen(process.env.PORT||5000,()=>{
   console.log(`Server running on port ${process.env.PORT || 5000}`);
});
