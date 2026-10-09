"""
detection.py - Core ML Detection Engine
Uses the trained LightGBM model to scan and classify unseen PE files.

Viva Q: "How does the engine actually scan a file without executing it?"
A: We do Static Analysis. We parse the file's structure (headers, imports, 
   exports, sections) into a 2,568-dimension mathematical vector, and feed 
   that into the LightGBM model to calculate the probability of it being malware.
"""
import os
import sys
import json
import argparse
import numpy as np
import joblib
import thrember

PROJECT_ROOT = os.path.join(os.path.dirname(__file__), "..")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")

class MalwareDetector:
    def __init__(self):
        model_path = os.path.join(MODELS_DIR, "best_model.joblib")
        info_path = os.path.join(MODELS_DIR, "model_info.json")
        scaler_path = os.path.join(MODELS_DIR, "scaler.joblib")

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}. Please run training.py first.")

        self.model = joblib.load(model_path)
        
        with open(info_path, "r") as f:
            self.model_info = json.load(f)
            
        self.scaler = None
        if self.model_info.get("needs_scaling"):
            self.scaler = joblib.load(scaler_path)

        self.extractor = thrember.PEFeatureExtractor()

    def scan_file(self, file_path):
        """Scans a single file and returns the result dictionary."""
        if not os.path.exists(file_path):
            return {"error": "File not found"}
        
        try:
            with open(file_path, "rb") as f:
                file_data = f.read()
        except Exception as e:
            return {"error": f"Failed to read file: {str(e)}"}

        try:
            # Extract features
            features = np.array(self.extractor.feature_vector(file_data), dtype=np.float32)
            features = features.reshape(1, -1)
            
            if self.scaler:
                features = self.scaler.transform(features)
                
            prob = self.model.predict_proba(features)[0][1]
            is_malware = bool(prob >= 0.5)
            
            return {
                "file": os.path.basename(file_path),
                "is_malware": is_malware,
                "confidence": float(prob) if is_malware else float(1.0 - prob),
                "malware_probability": float(prob),
                "model_used": self.model_info["model_name"]
            }
            
        except Exception as e:
            return {"error": f"Failed to parse PE file. Is it a valid Windows executable? Details: {str(e)}"}


def main():
    parser = argparse.ArgumentParser(description="Scan a Windows executable for malware.")
    parser.add_argument("filepath", help="Path to the .exe file to scan")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    args = parser.parse_args()

    detector = MalwareDetector()
    result = detector.scan_file(args.filepath)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    if "error" in result:
        print(f"[!] Error: {result['error']}")
        sys.exit(1)

    print("\n" + "="*50)
    print(f" SCAN RESULT: {result['file']}")
    print("="*50)
    
    if result["is_malware"]:
        print(f" [!!!] DANGER: MALWARE DETECTED [!!!]")
        print(f" Confidence: {result['confidence']*100:.2f}%")
        print(f" Model:      {result['model_used']}")
    else:
        print(f" [OK] File appears BENIGN (Safe).")
        print(f" Confidence: {result['confidence']*100:.2f}%")
        print(f" Model:      {result['model_used']}")
    print("="*50 + "\n")


if __name__ == "__main__":
    main()
