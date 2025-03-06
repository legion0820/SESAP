import json
import re
import os
from dotenv import load_dotenv
from queryLLM import query_rag

RESULTS_PATH = "./results/"
RESULTS_FILE = os.path.join(RESULTS_PATH, " .json")  

def main():
    load_dotenv()
    transcriptFileNames = [
        "alvarez_bryan_20230406[3]",
        "yirenya_tawiah_daniel_20230523[1].docx",
        "rodriguez_estrada_fernando_20230622[16].docx",
        "yeasmin_sanjida_20230706[99].docx",
        "corona_javier_20230601[31].docx",
    ]
    queryAll(transcriptFileNames)

def saveResults(filename, results):
    if not os.path.exists(RESULTS_PATH):
        os.makedirs(RESULTS_PATH)

    resultsFile = os.path.join(RESULTS_PATH, f"{filename}_results.json")
    
    with open(resultsFile, "w") as file:
        json.dump(results, file, indent=4)


def formatJSON(responseLLM):
    topics = {}
    
    #using regex to find numbers and separate text
    matches = re.findall(r"(\d+)\.\s([^:]+):\s(.+)", responseLLM)

    for num, topic, description in matches:
        topics[int(num)] = {
            "topic": topic.strip(),
            "description": description.strip()
        }

    return topics

def queryAll(transcriptFileNames):
    for filename in transcriptFileNames:
        resultsFile = os.path.join(RESULTS_PATH, f"{filename}_results.json")
        
        if os.path.exists(resultsFile):
            print(f"Skipping {filename} [results already exist.]")
            continue

        print(f"Processing: {filename}")
        responseLLM = query_rag(filename) 
        
        formattedResponse = formatJSON(responseLLM)
        saveResults(filename, formattedResponse)

if __name__ == "__main__":
    main()
