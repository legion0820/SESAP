# Student Experience Story Archive Project (SESAP)

## What is the SESAP Project?
The SESAP Project aims to create a sustainable platform that can be used to maintain, analyze, and present data related to underserved and marginalized students' experiences in the EECS program.
Automatic analysis is done on interviews from these students with the findings used to highlight areas of improvement. 

## Core Features
The SESAP system’s main features are its interview archiving ability and automatic chart generation. Whitelisted users are allowed to submit new student interviews to the archive as is shown in the video below.
[Embed youtube video demonstrating process]

Once the interview is submitted, the transcript file is automatically analyzed and the findings are then sent to the chart generator and the charts on the visualization page are updated in real time.
[Insert images of graphs]

## Previous site
The previous SESAP website also served as an archive and provided visualizations, but everything had to be manually embedded in the code. We also aimed to make the site design a little cleaner and specifically declutter the narratives page.

![CS463 Project Landing 1](https://github.com/user-attachments/assets/cebed398-db62-430d-8415-b44c07bbefb0)
![CS463 Project Landing 2](https://github.com/user-attachments/assets/07288bbe-6021-47aa-993b-7fb8ee9152f8)
![CS463 Project Landing 3](https://github.com/user-attachments/assets/7f8e8888-7391-4470-99c1-b658609b7ad5)





[Show comparison of before and after screenshots]

## Technical Implementation
Key Technologies
Frontend: React.js, Google Sign-In
Backend: .NET, MySQL
Transcript Analysis: Python, LangChain, Chroma, OpenRouter API (Mistral LLM Model)
Visualizations: MATLAB chart outputs
Database: MySQL database hosted through Aiven

