import React from "react";
import styled from "@emotion/styled";

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
  text-align: center;
  margin: 0 auto;
  max-width: 1600px;
  min-width: 1500px; /* Set a minimum width to avoid collapsing */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  flex-direction: column;
  justify-content: flex-start;
`;

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


function NarrativePage() {
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
      </Filter>
      <Content>
        <h1>Narratives Page</h1>
      </Content>
    </PageWrapper>
  );
}

export default NarrativePage;
