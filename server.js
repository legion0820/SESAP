const express = require("express");
const multer = require("multer");
const cors = require("cors"); // Enable CORS for frontend-backend communication
const fs = require("fs"); // For writing JSON files
const path = require("path"); // For handling file paths
const app = express();

// Ensure the "uploads" directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer to save files to the "uploads" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to the filename
  },
});

const upload = multer({ storage }); // Use the configured storage

let narratives = [];

app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(uploadsDir));

// Fetch all narratives
app.get("/api/narratives", (req, res) => {
  res.json(narratives);
});

// Fetch a specific narrative by ID
app.get("/api/narratives/:id", (req, res) => {
  const narrativeId = parseInt(req.params.id);
  const narrative = narratives.find((n) => n.id === narrativeId);
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

    // Log the uploaded files
    if (req.files.videoFiles) {
      console.log("Video files uploaded:", req.files.videoFiles);
    }
    if (req.files.textFiles) {
      console.log("Text files uploaded:", req.files.textFiles);
    }

    // Save the file names to the narrative
    const newNarrative = {
      id: narratives.length + 1,
      intervieweeName: req.body.intervieweeName,
      interviewerName: req.body.interviewerName,
      description: req.body.description,
      interviewDate: req.body.interviewDate,
      videoFiles: req.files.videoFiles ? req.files.videoFiles.map((file) => file.filename) : [],
      textFiles: req.files.textFiles ? req.files.textFiles.map((file) => file.filename) : [],
    };

    narratives.push(newNarrative);

    // Write the narratives array to a JSON file
    const jsonFilePath = path.join(__dirname, "narratives.json");
    fs.writeFileSync(jsonFilePath, JSON.stringify(narratives, null, 2));

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