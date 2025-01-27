import sqlite3

con = sqlite3.connect("temp.db")

curr = con.cursor()

# Do we want to store interviewer's name and the duration of the interview?
# Duration is in seconds
curr.execute('''
CREATE TABLE IF NOT EXISTS Interviews (
    interviewId INTEGER PRIMARY KEY AUTOINCREMENT,
    intervieweeName TEXT NOT NULL,
    interviewerName TEXT NOT NULL,
    interviewDate DATETIME NOT NULL,
    duration INTEGER NOT NULL
);
''')

# Store timestamps for when a new speaker begins?
curr.execute('''
CREATE TABLE IF NOT EXISTS Transcripts (
    transcriptId INTEGER PRIMARY KEY AUTOINCREMENT,
    interviewId INTEGER,
    speakerName TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (interviewId) REFERENCES Interviews (interviewId)
);
''')

# Not sure exactly how we should store found keywords yet
# curr.execute('''
# CREATE TABLE IF NOT EXISTS Keywords (
#     keywordId INTEGER PRIMARY KEY AUTOINCREMENT,
#     keywordName TEXT NOT NULL,
#     interviewId INTEGER,
#     FOREIGN KEY (interviewId) REFERENCES Interviews (interviewId)
# );
# ''')

curr.execute('''
CREATE TABLE IF NOT EXISTS Videos (
    videoId INTEGER PRIMARY KEY AUTOINCREMENT,
    interviewId INTEGER,
    videoName TEXT NOT NULL,
    filePath TEXT NOT NULL,
    FOREIGN KEY (interviewId) REFERENCES Interviews (interviewId)
);
''')

con.commit()
con.close()

