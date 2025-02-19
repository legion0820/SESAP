import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

// Button Component
const Button = ({ onClick, children, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
        transition: "background-color 0.2s",
        ':hover': {
          backgroundColor: "#0b5ed7"
        }
      }}
    >
      {children}
    </button>
  );
};

// Dialog Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogClose onClick={() => onOpenChange(false)} />
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => {
  return <div>{children}</div>;
};

const DialogHeader = ({ children }) => {
  return <div style={{ marginBottom: "20px" }}>{children}</div>;
};

const DialogTitle = ({ children }) => {
  return <h2 style={{ margin: 0, color: "#212529" }}>{children}</h2>;
};

const DialogClose = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        color: "#666",
        padding: "5px",
        lineHeight: 1
      }}
    >
      ×
    </button>
  );
};

// Styled Components
const Filter = styled.div`
  text-align: left;
  margin: 20px;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #495057;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #343a40;
`;

const Search = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #495057;
    border-radius: 4px;
    background-color: #495057;
    color: white;
    box-sizing: border-box;

    &::placeholder {
      color: #adb5bd;
    }

    &:focus {
      outline: none;
      border-color: #0d6efd;
    }
  }
`;

const Theme = styled.div`
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #495057;
  padding: 15px;
  border-radius: 8px;
  margin-top: 8px;
  background-color: #495057;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  input[type="checkbox"] {
    margin-right: 8px;
    cursor: pointer;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  min-height: calc(100vh - 40px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 1600px;
  min-width: 1500px;
  border: 1px solid #495057;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  margin: 20px;
  background-color: #343a40;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
`;

const VideoContent = styled.div`
  flex: 1 1 calc(33.333% - 20px);
  max-width: 300px;
  text-align: left;
  padding: 20px;
  border: 1px solid #495057;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: #495057;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-top: 0;
    color: white;
  }

  p {
    margin: 8px 0;
    color: #dee2e6;
  }

  strong {
    color: white;
  }
`;

// Themes array
const themes = [
  "community",
  "religion",
  "support",
  "diversity",
  "connection",
  "family",
  "access",
  "work",
];

// Main component
function NarrativePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [textFile, setTextFile] = useState(null);
  const [narratives, setNarratives] = useState([]);
  const [intervieweeName, setIntervieweeName] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleVideoClick = (narrative) => {
    navigate("/interview-video", { 
      state: { narrative }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNarrative = {
      intervieweeName,
      interviewerName,
      description,
      videoFile: videoFile ? videoFile.name : "No file uploaded",
      textFile: textFile ? textFile.name : "No file uploaded",
      date: new Date().toLocaleDateString(),
      themes: selectedThemes
    };
    setNarratives([...narratives, newNarrative]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setVideoFile(null);
    setTextFile(null);
    setIntervieweeName("");
    setInterviewerName("");
    setSelectedThemes([]);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleThemeChange = (theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme)
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const filteredNarratives = narratives.filter(narrative => {
    const searchMatch = 
      narrative.intervieweeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrative.interviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrative.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    return searchMatch;
  });

  return (
    <PageWrapper>
      <Filter>
        <Search>
          <label htmlFor="search">Search Name/Date</label>
          <br />
          <input
            id="search"
            type="text"
            placeholder="Enter name or date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        <Theme>
          <label htmlFor="theme">Themes</label>
          <CheckboxContainer>
            {themes.map((theme) => (
              <CheckboxWrapper key={theme}>
                <label>
                  <input
                    type="checkbox"
                    value={theme}
                    checked={selectedThemes.includes(theme)}
                    onChange={() => handleThemeChange(theme)}
                  />
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </label>
              </CheckboxWrapper>
            ))}
          </CheckboxContainer>
        </Theme>
        <Button onClick={() => setIsModalOpen(true)}>Add New Narrative</Button>
      </Filter>

      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Narrative</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Interviewee Name</h4>
              <input
                id="interviewee-name"
                type="text"
                value={intervieweeName}
                onChange={(e) => setIntervieweeName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Interviewer Name</h4>
              <input
                id="interviewer-name"
                type="text"
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Date of Interview</h4>
              <input
                id="date"
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Upload Text File</h4>
              <input
                id="text-file"
                type="file"
                accept=".txt"
                onChange={(e) => setTextFile(e.target.files[0])}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Upload Video</h4>
              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Description</h4>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box", height: "100px" }}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Content>
        <h1 style={{ textAlign: "center", width: "100%" }}>Narratives Page</h1>
        <VideoContainer>
          {filteredNarratives.map((narrative, index) => (
            <VideoContent 
              key={index}
              onClick={() => handleVideoClick(narrative)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{narrative.intervieweeName}</h3>
              <p><strong>Interviewer:</strong> {narrative.interviewerName}</p>
              <p><strong>Date:</strong> {narrative.date}</p>
              <p><strong>Description:</strong> {narrative.description}</p>
              <p><strong>Video File:</strong> {narrative.videoFile ? "Video uploaded" : "No video"}</p>
              {narrative.themes && narrative.themes.length > 0 && (
                <p><strong>Themes:</strong> {narrative.themes.join(", ")}</p>
              )}
            </VideoContent>
          ))}
        </VideoContainer>
      </Content>
    </PageWrapper>
  );
}

export default NarrativePage