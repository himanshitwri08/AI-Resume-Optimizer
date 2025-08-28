import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { resumeText, keywords, prompt } = req.body;

     console.log("Received /api/optimize request body:", {
      resumePreview: resumeText ? resumeText.slice(0, 200) : null,
      keywords,
      prompt,
    });

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }
     
    // const trimmedResume = resumeText.length > 100000 ? resumeText.slice(0, 100000) : resumeText;

    // Build complete prompt
    const userMessage = `
      You are a highly skilled resume optimization assistant.  
      Rewrite resumes to be impactful, ATS-friendly, and tailored to the job requirements.  
      Always return only the optimized resume (no extra explanation).

      Resume:
      ${resumeText}

      Please optimize it with the following conditions:
      - Emphasize these keywords/skills: ${keywords || "No specific keywords"}
      - Special request from user: ${prompt || "No special request"}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Call Gemini API
    const result = await model.generateContent(userMessage);

    // Extract response
    const optimizedText = result.response.text();

    res.json({ optimizedText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to optimize resume" });
  }
});

export default router;
