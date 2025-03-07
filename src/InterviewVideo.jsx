import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios"; // Import axios for API calls

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  max-width: 1000px;
  margin: auto;
  background-color: #2c3034;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  margin-bottom: 40px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  background-color: #212529;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  video {
    width: 100%;
    border-radius: 4px;
    background-color: #000;
  }
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 30px;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoLabel = styled.strong`
  color: #adb5bd;
`;

const InfoText = styled.p`
  color: white;
  margin: 10px 0;
  line-height: 1.6;
`;

const ErrorContainer = styled.div`
  padding: 40px;
  background-color: #2c3034;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin: 40px auto;
  max-width: 600px;

  h2 {
    color: #dc3545;
    margin-bottom: 20px;
  }
`;

function InterviewVideo() {
  const { id } = useParams(); // Get the ID from the URL
  const location = useLocation(); // Access location state
  const navigate = useNavigate();
  const [narrative, setNarrative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNarrative = async () => {
      try {
        // Fetch the narrative data from the server
        const response = await axios.get(`http://localhost:5000/api/narratives/${id}`);
        setNarrative(response.data);
      } catch (err) {
        console.error("Error fetching narrative:", err);
        setError("Failed to fetch narrative");
      } finally {
        setLoading(false);
      }
    };

    // If no location state is available, fetch the data from the server
    if (!location.state) {
      fetchNarrative();
    } else {
      setNarrative(location.state);
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <h2>Error: {error}</h2>
        <BackButton onClick={() => navigate(-1)}>Return to Narratives</BackButton>
      </ErrorContainer>
    );
  }

  if (!narrative) {
    return (
      <ErrorContainer>
        <h2>No Interview Found</h2>
        <BackButton onClick={() => navigate(-1)}>Return to Narratives</BackButton>
      </ErrorContainer>
    );
  }

  // Ensure videoFiles is an array, even if it's undefined
  const videoFiles = narrative.videoFiles || [];

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back to Narratives</BackButton>
      <Title>{narrative.intervieweeName}</Title>
      <InfoSection>
        <InfoText>
          <InfoLabel>Interviewer:</InfoLabel> {narrative.interviewerName}
        </InfoText>
        <InfoText>
          <InfoLabel>Date:</InfoLabel> {narrative.interviewDate}
        </InfoText>
        <InfoText>
          <InfoLabel>Description:</InfoLabel><br />
          {narrative.description}
        </InfoText>
      </InfoSection>
      {videoFiles.map((videoFile, index) => (
        <VideoWrapper key={index}>
          <video controls>
            <source src={`http://localhost:5000/uploads/${videoFile}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>
      ))}
    </Container>
  );
}

export default InterviewVideo;