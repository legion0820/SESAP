import json
import docx
import textwrap
import re
import nltk
import spacy
from nltk.corpus import stopwords

def readWordDoc(filename):
    doc = docx.Document(filename)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

def loadStopWordsFromJson(json_filename):
    with open(json_filename, "r", encoding="utf-8") as f:
        stop_words = json.load(f)
        return set(stop_words)

# Uncomment nltk.download('stopwords') for the first time running, can comment out again after
#nltk.download('stopwords')
stopWordsNLTK = set(stopwords.words('english'))
en = spacy.load('en_core_web_sm')
stopWordsSpacy = en.Defaults.stop_words


manualStopWords = {"feel", "like", "think"}
stopWordsJson = loadStopWordsFromJson("stop_words_english.json")

combinedStopWords = stopWordsNLTK.union(stopWordsSpacy).union(manualStopWords).union(stopWordsJson)

def removePunctuation(text):
    return re.sub(r'[^\w\s]', '', text)

def removeNumbers(text):
    return re.sub(r'\d+', '', text)

def removeUrls(text):
    return re.sub(r'http\S+|www\S+|https\S+', '', text)

def removeEmails(text):
    return re.sub(r'\S+@\S+', '', text)

def removeStopwords(text):
    return ' '.join([word for word in text.split() if word not in combinedStopWords])

def lemmatizeText(text):
    doc = en(text)
    return ' '.join([token.lemma_ for token in doc])

def removeExtraSpaces(text):
    return re.sub(r'\s+', ' ', text).strip()

def cleanText(text):
    text = text.lower()
    text = removeUrls(text)
    text = removeEmails(text)
    text = removePunctuation(text)
    text = removeNumbers(text)
    text = removeStopwords(text)
    text = lemmatizeText(text) 
    text = removeExtraSpaces(text)
    return text


def main():
    text = readWordDoc("yirenya_tawiah_daniel_20230523[1].docx")

    cleanedText = cleanText(text)
    #formatted_text = textwrap.fill(cleaned_text, 150)

    # Split the cleaned text into a list of individual words
    wordList = cleanedText.split()

    # Create a dictionary with the list of words
    data = {"documents": wordList}

    # Write the dictionary to a JSON file
    with open("output.json", "w") as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == "__main__":
    main()
