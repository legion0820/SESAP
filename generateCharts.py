import os
import json
import numpy as np
from scipy.io import savemat
import subprocess

identities = [
    "First-Generation Student",
    "LGBTQ+",
    "Immigrant",
    "Veteran",
    "Parent",
    "Low-Income",
    "Student of Color",
    "Transfer Student",
    "Non-Traditional Age",
    "Religious",
    "Disabled",
    "International Student",
    "Rural",
    "Working Student",
    "STEM Minoritized"
]

themes = [
    "Academic Difficulty",
    "Faculty Support",
    "Peer Relationships",
    "Belonging",
    "Cultural Representation",
    "Financial Struggles",
    "Mental Health",
    "Family Pressure",
    "Work-Life Balance",
    "Identity & Discrimination",
    "Career Preparation",
    "Language Barriers",
    "Support Networks",
    "Personal Growth"
]

students = []
wordCount = np.zeros((len(themes), len(identities)), dtype=int)
resultsDir = "C:/Users/Daniel/SESAP/results"

for filename in os.listdir(resultsDir):
    if filename.endswith(".json"):
        with open(os.path.join(resultsDir, filename), "r", encoding="utf-8") as f:
            data = json.load(f)
            studentName = data.get("name", "").strip()
            themeList = [t.strip() for t in data.get("themes", "").split(",")]
            identityList = [i.strip() for i in data.get("identities", "").split(",")]

            if studentName not in students:
                students.append(studentName)

            for theme in themeList:
                if theme in themes:
                    themeIdx = themes.index(theme)
                    for identity in identityList:
                        if identity in identities:
                            identityIdx = identities.index(identity)
                            wordCount[themeIdx][identityIdx] += 1

savemat("barGraphData.mat", {
    "wordCount": wordCount,
    "themes": themes,
    "identities": identities,
    "interviewees": students
})

subprocess.run(f'matlab -batch "barGraph"', shell=True)