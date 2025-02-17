import argparse
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
import requests
from dotenv import load_dotenv
import os
from getEmbeddings import getEmbeddings
from collections import defaultdict

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""


def main():
    configure()
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)

def configure():
    load_dotenv()

def openrouterEndpoint(prompt):
    headers = {
        "Authorization": f"Bearer {os.getenv('apiKey')}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "deepseek/deepseek-r1-distill-llama-70b:free",
        "messages": [{"role": "system", "content": "You are an AI assistant."},
                     {"role": "user", "content": prompt}],
        "max_tokens": 500,
        "temperature": 0.7
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error {response.status_code}: {response.text}"
    
def query_rag(query_text: str):
    # Prepare the DB.
    embeddings = getEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)

    # Search the DB.
    results = db.get(include=["documents", "metadatas"])

    transcript_chunks = defaultdict(list)
    for doc, metadata in zip(results["documents"], results["metadatas"]):
        transcript_id = metadata.get("source", "unknown_transcript")
        transcript_chunks[transcript_id].append(doc)
    
    for transcript_id, chunks in transcript_chunks.items():
        contextChunks = "\n\n---\n\n".join(chunks)  #combine all chunks from the same transcript
        promptTemplate = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = promptTemplate.format(context=contextChunks, question=query_text)
        # print(prompt)

        responseLLM = openrouterEndpoint(prompt)

        # sources = [doc.metadata.get("id", None) for doc, _score in results]
        # responseFormatted = f"Response: {responseLLM}\nSources: {sources}"
        # print(responseFormatted)
        print(responseLLM)
    return responseLLM


if __name__ == "__main__":
    main()