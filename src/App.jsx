import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from '@emotion/styled';
import './index.css'


const Nav = styled.nav`
    background-color: rgb(33 37 41);
    padding-bottom: 10px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;


`;

const NavItem = styled.div`
    margin: 0 15px;
`;

const Container = styled.div`
    // background-color: rgb(100, 95, 95); /* Same color as navbar */
    text-align: center; /* Center-align the header */
    padding: 5px 0; /* Add padding around the header */
`;

const Heading = styled.h1`
    // background-color: rgb(100, 95, 95); /* Same color as navbar */
    padding: 20px 0; /* Add padding to the heading for better spacing */
    color: #d73f09; /* Set text color to orange */
`;

const Wrapper = styled.div`
    background-color: rgb(24, 22, 22); /* Apply same background color to the entire div */
`;

const Footer = styled.footer`
    bottom: 0px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    padding: 13px;
    padding-left: 0px;
    background-color: rgb(24, 22, 22);;
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
            <div><Outlet/></div>    
            <Footer >
                The Archive Project
                {/* Spotify Data Powered by: <a href="https://developer.spotify.com/documentation/web-api"> developer.spotify.com</a> */}
            </Footer>
        </>
    );
}

export default Root;
