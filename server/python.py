from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# Enable CORS for React frontend
origins = ["http://localhost:3000"]  # React app runs on port 3000

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hugging Face conversational model
chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    response = chatbot(req.message)
    return {"content": response[0]["generated_text"]}
