# MalScan: Zero-Day Threat Detection

MalScan is an advanced, static machine learning malware analysis engine. It extracts 2,568 deep structural features from Windows Portable Executables (.exe, .dll) without executing them, and uses a trained LightGBM model to predict whether the file is benign or malicious.

## Project Architecture
* **Dataset:** EMBER 2018 (Balanced subset of 100,000 files)
* **Model:** LightGBM (Accuracy: 96.8%, Recall: 96.03%)
* **Backend:** FastAPI & Uvicorn (Python)
* **Frontend:** React & Vite (JavaScript)

## How to Run the Project

### 1. Start the Backend API (Terminal 1)
\\powershell
# Ensure you are in the project root
venv\Scripts\python -m uvicorn src.api:app --reload
\*(The backend runs on http://127.0.0.1:8000)*

### 2. Start the Frontend UI (Terminal 2)
\\powershell
cd frontend
npm run dev
\*(The frontend runs on http://localhost:5173)*

## Customizing the UI/UX
If you need to change the UI or UX design in the future (e.g., for a university presentation):
1. **Colors & Styling:** Open \rontend/src/index.css\. All primary colors, dark mode backgrounds, and glassmorphism panel CSS are defined here at the top in the \:root\ block.
2. **Layouts:** To change where buttons are or how the page looks, modify the React components in \rontend/src/ScanPage.jsx\, \DashboardPage.jsx\, and \ChartsPage.jsx\.
