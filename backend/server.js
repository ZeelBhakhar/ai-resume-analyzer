const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Check API key
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not configured in .env");
}

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer Backend is running!",
  });
});

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    // --------------------------------
    // 1. Check uploaded file
    // --------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    console.log("Resume received:", req.file.originalname);

    // --------------------------------
    // 2. Extract resume text
    // --------------------------------

    let resumeText = "";

    // PDF
    if (req.file.mimetype === "application/pdf") {
      const parser = new PDFParse({
        data: req.file.buffer,
      });

      const result = await parser.getText();

      resumeText = result.text;

      await parser.destroy();
    }

    // DOCX
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });

      resumeText = result.value;
    }

    // Unsupported file
    else {
      return res.status(400).json({
        success: false,
        message: "Only PDF and DOCX files are supported.",
      });
    }

    // --------------------------------
    // 3. Check extracted text
    // --------------------------------

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract readable text from this resume.",
      });
    }

    console.log(
      "Extracted characters:",
      resumeText.length
    );

    // --------------------------------
    // 4. Check Gemini API key
    // --------------------------------

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured.",
      });
    }

    // --------------------------------
    // 5. Load Gemini SDK
    // --------------------------------

    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // --------------------------------
    // 6. Resume analysis prompt
    // --------------------------------

    const prompt = `
You are an expert AI Resume Analyzer and ATS consultant.

Analyze the resume provided below.

Your analysis must be based ONLY on information present in the resume.
Do not invent skills, experience, education, projects, certifications,
or achievements.

Evaluate the resume for:

1. Overall resume quality
2. ATS compatibility
3. Skills
4. Work experience
5. Education
6. Projects
7. Strengths
8. Weaknesses
9. Missing or potentially useful skills
10. Resume improvement recommendations

Scoring:

- overallScore: 0 to 100
- atsScore: 0 to 100
- skillsScore: 0 to 100
- experienceScore: 0 to 100

If a section is not present in the resume, do not assume it exists.

Return ONLY valid JSON matching the requested structure.

Resume:

-------------------------
${resumeText}
-------------------------
`;
// Gemini request with automatic retry
async function generateWithRetry(generateFunction, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await generateFunction();
    } catch (error) {
      const status = error?.status || error?.error?.status;
      const code = error?.code || error?.error?.code;

      // Retry only for temporary server overload
      if ((status === 503 || code === 503) && attempt < maxRetries) {
        const waitTime = attempt * 3000;

        console.log(
          `Gemini temporarily unavailable. Retrying in ${waitTime / 1000} seconds...`
        );

        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
}

    // --------------------------------
    // 7. Gemini request
    // --------------------------------
    console.log("Sending request to Gemini...");
    const response = await generateWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-3.7-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            overallScore: {
              type: "number",
            },

            atsScore: {
              type: "number",
            },

            skillsScore: {
              type: "number",
            },

            experienceScore: {
              type: "number",
            },

            summary: {
              type: "string",
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            weaknesses: {
              type: "array",
              items: {
                type: "string",
              },
            },

            skills: {
              type: "array",
              items: {
                type: "string",
              },
            },

            missingSkills: {
              type: "array",
              items: {
                type: "string",
              },
            },

            recommendations: {
              type: "array",
              items: {
                type: "string",
              },
            },

            experience: {
              type: "array",
              items: {
                type: "string",
              },
            },

            education: {
              type: "array",
              items: {
                type: "string",
              },
            },

            projects: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "overallScore",
            "atsScore",
            "skillsScore",
            "experienceScore",
            "summary",
            "strengths",
            "weaknesses",
            "skills",
            "missingSkills",
            "recommendations",
            "experience",
            "education",
            "projects",
          ],
        },
      },
    }));
    console.log("Gemini response received!");
    // --------------------------------
    // 8. Convert Gemini response
    // --------------------------------

    const analysisText = response.text;

    if (!analysisText) {
      throw new Error("Gemini returned an empty response.");
    }

    const analysis = JSON.parse(analysisText);

    // --------------------------------
    // 9. Send result to frontend
    // --------------------------------

    res.json({
      success: true,
      fileName: req.file.originalname,
      analysis: analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while analyzing the resume.",
    });
  }
});

// --------------------------------
// Start server
// --------------------------------

app.listen(PORT, () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  );
});