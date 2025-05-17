# Student Experience Story Archive Project (SESAP)

## What is the SESAP Project?
The SESAP Project aims to create a sustainable platform that can be used to maintain, analyze, and present data related to underserved and marginalized students' experiences in the EECS program.
Automatic analysis is done on interviews from these students with the findings used to highlight areas of improvement. 

## Core Features
The SESAP system’s main features are its interview archiving ability and automatic chart generation. Whitelisted users are allowed to submit new student interviews to the archive as is shown in the video below.

[Watch the video](https://youtu.be/-_LrM5NgOdU) <br/>

Once the interview is submitted, the transcript file is automatically analyzed and the findings are then sent to the chart generator and the charts on the visualization page are updated in real time.

## Previous site
The previous SESAP website also served as an archive and provided visualizations, but everything had to be manually embedded in the code. We also aimed to make the site design a little cleaner and specifically declutter the narratives page.

<img width="630" alt="image" src="https://github.com/user-attachments/assets/cebed398-db62-430d-8415-b44c07bbefb0" /> <br/>
Figure 1. Narratives page of the old site. <br/>

<img width="630" alt="image" src="https://github.com/user-attachments/assets/0287893e-c20a-435e-a579-190545017b58" /> <br/>
Figure 2. Narratives page of the new site. <br/>

<img width="630" alt="image" src="https://github.com/user-attachments/assets/07288bbe-6021-47aa-993b-7fb8ee9152f8" /> <br/>
Figure 3. Word cloud of previous site. <br/>

<img width="630" alt="image" src="https://github.com/user-attachments/assets/50f7a253-5048-4346-8eb0-5bb4b10688f8" /> <br/>
Figure 4. World cloud of new site. <br/>

<img width="630" alt="image" src="https://github.com/user-attachments/assets/7f8e8888-7391-4470-99c1-b658609b7ad5" /> <br/>
Figure 5. Bar chart of previous site. <br/>

<img width="630" alt="image" src="https://github.com/user-attachments/assets/034214af-bfc8-48aa-92ea-12ff75b37627" /> <br/>
Figure 6. Bar chart of new site. <br/>


## Technical Implementation
Key Technologies
Frontend: React.js, Google Sign-In
Backend: .NET, MySQL
Transcript Analysis: Python, LangChain, Chroma, OpenRouter API (Mistral LLM Model)
Visualizations: MATLAB chart outputs
Database: MySQL database hosted through Aiven

## Architecture Overview
This project is split up into multiple components, each with its own functionality and purpose. 

#### React Frontend UI 
Serves the content of the website, where users can view the different visualizations, narratives (interviews), purpose, and Recommendations. If a whitelisted user (which is verified via Google Sign-in) tries to post an interview, it sends a request to the backend controller with all of the required parameters. The same logic is applied if one of these users tries to delete an interview as well

#### Backend Controller
Acts as the routing capability 

## Access and Usage
General users can visit the website to view the student interviews or look over the visualizations. If you are a whitelisted user working with the project, then you are allowed to submit new interviews to the archive. As it's a website, no download is needed.

Here is the link to the SESAP website [Insert link once deployed].

#### Front end

For the front end you would need to install react and its dependencies to run the front end. 

Run “npm install” in the terminal
Run  “npm install react”
Run  “npm install react-dom”
Run  “npm install react-router-dom”
Run  “npm install @emotion/react”
Run  “npm install @emotion/styled”
Run  “npm install axios”
To run the backend server you would need to run “npm install express multer cors axios”

#### Controller 

For the controller you will need to download the .NET SDK along with storing user-secrets to set the database connection string 

Go to the Microsoft .NET SDK download page and install version 6.
In a terminal, run “dotnet user-secrets init”
Run “dotnet user-secrets set “ConnectionStrings:AivenMySQL" "UserSecret"”
Run “dotnet build”
Run “dotnet run”



## Contact Information
If you have any questions, or want to provide feedback to the project, do not hesitate to reach out!

#### Project Manager:
Rachael Cate (rachael.cate@oregonstate.edu)

#### Team Members:

Daniel Morden - Transcript Analysis Developer (mordend@oregonstate.edu)

Leon Ong - Frontend developer (ongl@oregonstate.edu)

Neal Ornes - Microcontroller Developer (ornesn@oregonstate.edu)

Fernando Valle - Database designer (vallefe@oregonstate.edu) 


