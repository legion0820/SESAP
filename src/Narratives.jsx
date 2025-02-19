import React, { useState } from "react";
import styled from "@emotion/styled";

// Define the Button component
const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

// Define the Dialog component and its subcomponents
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
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          position: "relative", // Add relative positioning to the dialog content
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
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
  return <div style={{ marginBottom: "10px" }}>{children}</div>;
};

const DialogTitle = ({ children }) => {
  return <h2 style={{ margin: 0 }}>{children}</h2>;
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
        fontSize: "16px",
      }}
    >
      X
    </button>
  );
};

// Styled components
const Filter = styled.div`
  text-align: left;
  margin: 20px;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Search = styled.div`
  margin-bottom: 20px;
`;

const Theme = styled.div`
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  max-width: 1600px;
  min-width: 1500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  margin: 20px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
`;

const VideoContent = styled.div`
  flex: 1 1 calc(33.333% - 20px); /* Each item takes up about 1/3 of the row minus the gap */
  max-width: 300px;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [narratives, setNarratives] = useState([]); // State to store submitted narratives

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNarrative = {
      name,
      description,
      videoFile: videoFile ? videoFile.name : "No file uploaded",
      date: new Date().toLocaleDateString(),
    };
    setNarratives([...narratives, newNarrative]); // Add the new narrative to the list
    setIsModalOpen(false); // Close the modal after submission
    resetForm(); // Clear the form
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setVideoFile(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm(); // Clear the form when the modal is closed
  };

  return (
    <PageWrapper>
      <Filter>
        <Search>
          <label htmlFor="search">Search Name/Date</label>
          <br />
          <input id="search" type="text" placeholder="Enter name or date" />
        </Search>
        <Theme>
          <label htmlFor="theme">Themes</label>
          <br />
          <CheckboxContainer>
            {themes.map((theme) => (
              <CheckboxWrapper key={theme}>
                <label>
                  <input type="checkbox" value={theme} />
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </label>
              </CheckboxWrapper>
            ))}
          </CheckboxContainer>
        </Theme>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
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
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Interviewer Name</h4>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "black" }}>Date of Interview</h4>
              <input
                id="date"
                type="text"
                value={new Date().toLocaleDateString()} // Automatically set the current date
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
                onChange={(e) => setTextFile(e.target.files[0])} // Handle text file change
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
          {narratives.map((narrative, index) => (
            <VideoContent key={index}>
              <h3>{narrative.name}</h3>
              <p><strong>Date:</strong> {narrative.date}</p>
              <p><strong>Description:</strong> {narrative.description}</p>
              <p><strong>Video File:</strong> {narrative.videoFile}</p>
            </VideoContent>
          ))}
        </VideoContainer>
      </Content>
    </PageWrapper>
  );
}

export default NarrativePage;