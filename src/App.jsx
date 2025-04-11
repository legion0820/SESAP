import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
    position: relative; /* For absolute positioning of login button */
    text-align: center; /* Keep the heading centered */
    padding: 5px 0; /* Add padding around the header */
`;

const Heading = styled.h1`
    padding: 20px 0; /* Add padding to the heading for better spacing */
    color: #d73f09; /* Set text color to orange */
    margin: 0 auto; /* Center the heading */
`;

const LoginButton = styled.button`
    position: absolute; /* Position the button absolutely */
    right: 20px; /* Position from the right edge */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Adjust for perfect vertical centering */
    background-color: #d73f09; /* Match the orange color scheme */
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        background-color: #b33000; /* Darker shade for hover state */
    }
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
`;

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
    const navigate = useNavigate();
    
    // Initialize Google OAuth client
    useEffect(() => {
        // Load the Google API client library
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            
            script.onload = initializeGoogleSignIn;
        };
        
        // Initialize Google Sign-In
        const initializeGoogleSignIn = () => {
            // Replace with your actual Google Client ID
            window.google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
                callback: handleGoogleSignIn,
                auto_select: false,
                cancel_on_tap_outside: true,
            });
        };
        
        loadGoogleScript();
        
        // Cleanup
        return () => {
            const scriptTag = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (scriptTag) {
                scriptTag.remove();
            }
        };
    }, []);
    
    // Handle Google Sign-In
    const handleGoogleSignIn = (response) => {
        // Get the ID token from the response
        const idToken = response.credential;
        
        // Here you would typically:
        // 1. Send this token to your backend
        // 2. Verify the token on your server
        // 3. Create a session for the user
        
        console.log("Google Sign-In successful", response);
        
        // Store user info in localStorage or state management solution
        localStorage.setItem('userToken', idToken);
        
        // Redirect to a dashboard or refresh the current page
        // navigate('/dashboard');
        window.location.reload();
    };
    
    // Handle login button click
    const handleLoginClick = () => {
        // If user is already logged in, handle logout
        if (localStorage.getItem('userToken')) {
            localStorage.removeItem('userToken');
            window.location.reload();
            return;
        }
        
        // Otherwise, prompt Google Sign-In
        window.google.accounts.id.prompt();
    };
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userToken') !== null;
    
    return (
        <>
            <Wrapper>
                <Container>
                    <Heading>The EECS Student Experience Story Archive Project</Heading>
                    <LoginButton onClick={handleLoginClick}>
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </LoginButton>
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