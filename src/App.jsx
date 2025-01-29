import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from '@emotion/styled';

const Nav = styled.nav`
    background-color: rgb(33 37 41);
    padding-bottom: 10px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-evenly;
    padding-top: 10px;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
`;

const NavItem = styled.div`
    margin: 0 15px;
`;

const Container = styled.div`
    text-align: center; /* Center-align the header */
    padding: 5px 0; /* Add padding around the header */
`;

const Heading = styled.h1`
    padding: 20px 0; /* Add padding to the heading for better spacing */
    color: #d73f09; /* Set text color to orange */
`;

const Wrapper = styled.div`
    background-color: rgb(24, 22, 22); /* Apply same background color to the entire div */
`;

const Footer = styled.footer`
    margin: 0px;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px); /* Adjust width to prevent overlap with scrollbar */
    padding: 5px 20px; /* Reduce padding to make the footer smaller */
    background-color: rgb(24, 22, 22);
`;

const FootTitle = styled.h2`
    color: #d73f09;
sldaslasla`;

const FooterLink = styled.a`
    color: #d73f09;
    text-decoration: none;
    margin: 0 15px;
    &:hover {
        text-decoration: underline;
    }
`;

const MainContent = styled.div`
    margin-bottom: 100px; /* Increase margin to ensure sufficient space above footer */
`;

function Root() {
    return (
        <>
            <Wrapper>
                <Container>
                    <Heading>The EECS Student Experience Story Archive Project</Heading>
                </Container>
                <Nav>
                    <NavItem><NavLink to="/" className="nav-link">Visualization</NavLink></NavItem>
                    <NavItem><NavLink to="/narrative" className="nav-link">Narratives</NavLink></NavItem>
                    <NavItem><NavLink to="/purpose" className="nav-link">Purpose</NavLink></NavItem>
                    <NavItem><NavLink to="/recommendation" className="nav-link">Recommendations</NavLink></NavItem>
                </Nav>
            </Wrapper>
            <MainContent>
                <Outlet />
            </MainContent>    
            <Footer>
                <FootTitle>The Archive Project</FootTitle>
                <div>
                    <FooterLink href="https://media.oregonstate.edu/tag?tagid=oh53" target="_blank" rel="noopener noreferrer">The Archive Site</FooterLink>
                    <FooterLink href="https://scarc.library.oregonstate.edu/oralhistory.html" target="_blank" rel="noopener noreferrer">SCARC OSU</FooterLink>
                </div>
            </Footer>
        </>
    );
}

export default Root;
