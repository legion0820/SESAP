const express = require("express");
const multer = require("multer");
const cors = require("cors"); // Enable CORS for frontend-backend communication
const app = express();
const upload = multer({ dest: "uploads/" }); // Store uploaded files in the "uploads" folder

let narratives = [];

app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

// Fetch all narratives
app.get("/api/narratives", (req, res) => {
  res.json(narratives);
});

// Fetch a specific narrative by ID
app.get("/api/narratives/:id", (req, res) => {
  const narrativeId = parseInt(req.params.id);
  const narrative = narratives.find(n => n.id === narrativeId);
  if (narrative) {
    res.json(narrative);
  } else {
    res.status(404).json({ error: "Narrative not found" });
  }
});

// Add a new narrative
app.post("/api/narratives", upload.fields([
  { name: "videoFiles", maxCount: 10 }, // Allow multiple video files
  { name: "textFiles", maxCount: 10 },  // Allow multiple text files
]), (req, res) => {
  try {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    const newNarrative = {
      id: narratives.length + 1,
      intervieweeName: req.body.intervieweeName,
      interviewerName: req.body.interviewerName,
      description: req.body.description,
      interviewDate: req.body.interviewDate,
      videoFiles: req.files.videoFiles ? req.files.videoFiles.map((file) => file.originalname) : [],
      textFiles: req.files.textFiles ? req.files.textFiles.map((file) => file.originalname) : [],
    };

    narratives.push(newNarrative);
    console.log("New narrative added:", newNarrative);
    res.status(201).json(newNarrative);
  } catch (error) {
    console.error("Error adding narrative:", error);
    res.status(500).json({ error: "Failed to add narrative" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});