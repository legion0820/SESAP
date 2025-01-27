import sqlite3

con = sqlite3.connect("temp.db")

curr = con.cursor()

# Insert some sample data into the Interviews table
curr.execute('''
INSERT INTO Interviews (intervieweeName, interviewerName, interviewDate, duration)
VALUES ('Daniel Yirenya-Tawah', 'Rachael Cate', '2023-05-23 10:00:00', 968);
''')

# Get the interviewId for the inserted interview
interviewId = curr.lastrowid

speaker1 = "We are recording. Okay. Welcome. Thank you so much for being here today, Danielle, to give us your story and tell us about your experience. And I will just go ahead and read the prompt and then I will let you take it away with their what you had to say for us today. So the prompt was tell the story of your experience so far as an engineering student. You may want to start with your background. What brought you to pursue the program? And you may want to include your initial impression of the program, how you begin to understand how the program fits into your life or doesn't how you fit into the program or how you don't. And most important characteristics of the program for you or what impact you hope it will have on your life or community. And then I can read additional prompts as needed as we as we continue. But please, thank you for being here and you can take their."

speaker2 = "Thank you very much. So my name is Daniel. You're in that area from a West African country known as Ghana. I get Oregon State. This is my first year. I'm finishing up my first term. I am a graduate student. I'm pursuing my Ph.D. here at Oregon State and Microwave Engineering in the Department of Electrical Engineering and Computer Science. Well, brought me here to Oregon State was primarily I. I did my undergrad in Brigham Young University in Utah, and I did so many different engineering projects, which I found very fascinating, including research. And towards the end of my undergrad, I wrote a research paper for publication and I performed various research articles and research experiments, and I thought it would be a very good skill to do to pursue a graduate degree, to be able to help me just enhance my skill, to be like a good like design, a good engineer, very, very thoughtful, very, very analytical and be able to contribute greatly in the world. And I was looking at different options. And Oregon State stood out very closely to me. One, it was just when I was like research, and it had like a good close community that I really enjoyed. And that's something that links for. It's like an opportunity and like to man and like teachers and advisors who will help you land. Certainly that and also like push my decision to come here. What's my advice? Doctor Walla He was very, very instrumental in helping me understand. And even before I go into Oregon State, he went to help me just was, like I said, even like a teacher and like advisor even before I got, you know, just helping me through everything and has continued since I've been here. And so in the whole scheme of thing, I feel like I feel well here in Oregon State, I feel like I have my place here, I feel like I have, I have. And I'm trying to contribute a lot to board the research that I do here, meeting people in class and also meeting people outside of class. In terms of my whole life aspiration. My dream is to become a design engineer. And since I have come here, the first thing I've been doing has been design. Ever since my very friendly design and different antennas and simulation and comparing with different results. And that's exactly why I have needed and I have wanted. And I feel I feel very confident the skills that I am gained and will be able to translate. To. Translate to my professional career. Thank you."
# Insert some sample transcript data
curr.execute('''
INSERT INTO Transcripts (interviewId, speakerName, timestamp, text)
VALUES
    (?, 'Rachael Cate', '2023-05-23 10:05:00', ?),
    (?, 'Daniel Yirenya-Tawah', '2023-05-23 10:06:12', ?);
''', (interviewId, speaker1, interviewId, speaker2))




filepath = r'videos\SESAP_Interview_4_with_Daniel_Yirenya-Tawiah.mp4'
# Extract the filename from the file path
filename = filepath.split('\\')[-1]

# Insert the filename and file path into the database
curr.execute('''
INSERT INTO Videos (interviewId, videOName, filePath)
VALUES (?, ?, ?)
''', (interviewId, filename, filepath))


# Commit changes and close the connection
con.commit()

# Query the database to show the stored data
print("Interviews Table:")
curr.execute('SELECT * FROM Interviews')
for row in curr.fetchall():
    print(row)

print("\nTranscript Table:")
curr.execute('SELECT * FROM Transcripts')
for row in curr.fetchall():
    print(row)



# Fetch the video metadata (filename and file path) from the database
curr.execute('SELECT videoName, filePath FROM Videos WHERE interviewId = ?', (interviewId,))
result = curr.fetchone()

if result:
    filenameF, file_pathF = result
    print(f"Video filename: {filenameF}")
    print(f"Video file path: {file_pathF}")
else:
    print("Video not found!")


# Close the connection
con.close()



