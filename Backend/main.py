# Standard Libraries
import json
import shutil
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
import nest_asyncio
import uvicorn

# Custom Libraries
from open_memory import setup_memory

app = FastAPI(title="Ask Chacha", description="with FastAPI and ColabCode", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

query_engine, _, _ = setup_memory()

class RequestItem(BaseModel):
    body: str

@app.get("/")
async def read_root():
    return {"message": "Hello !!! Welcome to Ask Chacha API "}

@app.post("/chatbot")
async def get_predictions(item: RequestItem):
    try:
        message = json.loads(item.body)["messageResponse"]
        response = query_engine.query(message)
        return {"messageResponse": response}
    except Exception as e:
        return {"prediction": f"error: {str(e)}"}

@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    global query_engine
    with open(f"./Data/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    query_engine, _, _ = setup_memory()
    return {"filename": file.filename}

if __name__ == "__main__":
    ngrok_tunnel = ngrok.connect(8000)
    print('Public URL:', ngrok_tunnel.public_url)
    nest_asyncio.apply()
    uvicorn.run(app, port=8000)
