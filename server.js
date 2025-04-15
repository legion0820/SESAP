const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");  // Import axios
const path = require("path");
const app = express();

// Ensure the "uploads" directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer to save files to the "uploads" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Increase the payload size limit for JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(uploadsDir));

// Fetch all narratives from the external API
app.get("/api/narratives", async (req, res) => {
  try {
    // Fetch narratives from the external API
    const response = await axios.get("http://localhost:5084/api/v1/interviews");
    const externalNarratives = response.data;  // Assuming the API returns an array of narratives
    res.json(externalNarratives);
  } catch (error) {
    console.error("Error fetching narratives:", error);
    res.status(500).json({ error: "Failed to fetch narratives" });
  }
});

// Fetch a specific narrative by ID from the external API
app.get("/api/narratives/:id", async (req, res) => {
  const narrativeId = parseInt(req.params.id);
  try {
    const response = await axios.get(`http://localhost:5084/api/v1/interviews/${narrativeId}`);
    const narrative = response.data; // Assuming the API returns a single narrative by ID
    if (narrative) {
      res.json(narrative);
    } else {
      res.status(404).json({ error: "Narrative not found" });
    }
  } catch (error) {
    console.error(`Error fetching narrative with ID ${narrativeId}:`, error);
    res.status(500).json({ error: "Failed to fetch narrative" });
  }
});

// Add a new narrative (you can still add new ones if needed)
app.post("/api/narratives", upload.fields([{ name: "textFiles", maxCount: 10 }]), async (req, res) => {
  try {
    console.log("Request body:", req.body); 
    console.log("Request files:", req.files); 

    let transcriptText = "";
    if (req.files && req.files.textFiles && req.files.textFiles.length > 0) {
      const filePath = req.files.textFiles[0].path;
      transcriptText = fs.readFileSync(filePath, 'utf8');
    }

    const newNarrative = {
      intervieweeName: req.body.intervieweeName,
      interviewerName: req.body.interviewerName,
      interviewDate: req.body.interviewDate, 
      interviewDesc: req.body.description, 
      interviewEmbedLink: req.body.embedLinks || "", 
      interviewTranscript: transcriptText || req.body.interviewTranscript || "" 
    };
    
    // Send data to external API
    const response = await axios.post(
      "http://localhost:5084/api/v1/interviews",
      newNarrative
    );
    
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error saving narrative:", error);
    res.status(500).json({ error: "Failed to save narrative" });
  }
});

app.put("/api/narratives/:id/embed", async (req, res) => {
  const narrativeId = parseInt(req.params.id);
  try {
    const response = await axios.get(`http://localhost:5084/api/v1/interviews/${narrativeId}`);
    let narrative = response.data; // Assuming the API returns a single narrative by ID

    if (!narrative) {
      return res.status(404).json({ error: "Narrative not found" });
    }

    let embedLinks = [];

    if (req.body.embedLinks) {
      try {
        embedLinks = Array.isArray(req.body.embedLinks)
          ? req.body.embedLinks
          : JSON.parse(req.body.embedLinks);
      } catch (err) {
        console.warn("Failed to parse embedLinks, falling back to single string");
        embedLinks = [req.body.embedLinks];
      }
    }

    narrative.embedLinks = embedLinks;

    // Save the updated narrative in your actual database or external API if needed

    res.status(200).json({ message: "Embed links updated", narrative });
  } catch (error) {
    console.error(`Error updating embed links for narrative ID ${narrativeId}:`, error);
    res.status(500).json({ error: "Failed to update embed links" });
  }
});

app.post("/proxy/api/interviews", async (req, res) => {
  try {
    console.log("Proxying request to interviews API");
    // Log the size to debug
    console.log("Request size:", JSON.stringify(req.body).length / 1024 / 1024, "MB");
    
    const response = await axios.post(
      "http://localhost:5084/api/v1/interviews",
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers required by the API
        },
        // Increase axios timeout if needed
        timeout: 30000
      }
    );
    console.log("Proxy response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to API:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: "Failed to proxy request to API", 
      details: error.response?.data || error.message 
    });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
