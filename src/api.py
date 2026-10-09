"""
api.py - FastAPI Backend
Exposes the Detection Engine as a REST API.

Run with: uvicorn src.api:app --reload
"""
import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.detection import MalwareDetector

app = FastAPI(title="Windows Malware Detector API")

# Allow frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the detector once when the server starts
try:
    detector = MalwareDetector()
except Exception as e:
    print(f"Warning: Could not load detector: {e}")
    detector = None

@app.get("/")
def root():
    return {"status": "online", "message": "Malware Detector API is running."}

@app.post("/scan")
async def scan_file_endpoint(file: UploadFile = File(...)):
    if not detector:
        raise HTTPException(status_code=500, detail="Detection engine not loaded. Is the model trained?")
        
    if not file.filename.lower().endswith(('.exe', '.dll', '.sys')):
        raise HTTPException(status_code=400, detail="Only PE files (.exe, .dll, .sys) are supported.")

    # Save uploaded file temporarily
    temp_dir = os.path.join(os.path.dirname(__file__), "..", "temp")
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, file.filename)
    
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Run detection
        result = detector.scan_file(temp_path)
        
        # Cleanup
        os.remove(temp_path)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
            
        return result
        
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))
