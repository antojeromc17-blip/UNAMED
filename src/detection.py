"""
detection.py - Core ML Detection Engine
Supports scanning and classifying PE files using any trained model
(LightGBM, Random Forest, Decision Tree, Logistic Regression, Gaussian Naive Bayes, or Ensemble Consensus).
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
        self.extractor = thrember.PEFeatureExtractor()
        self.scaler = None
        scaler_path = os.path.join(MODELS_DIR, "scaler.joblib")
        if os.path.exists(scaler_path):
            try:
                self.scaler = joblib.load(scaler_path)
            except Exception as e:
                print(f"Warning: Could not load scaler: {e}")

        # In-memory model cache
        self.models_cache = {}

        # Pre-load ALL available models into memory at startup for zero-latency inference
        print("Pre-loading models into RAM for instant inference...")
        for m_name in self.get_available_models():
            try:
                self.load_model(m_name)
                print(f"  ✓ Cached in RAM: {m_name}")
            except Exception as e:
                print(f"  Warning: Could not cache {m_name}: {e}")

    def get_available_models(self):
        """Returns list of models available in the models directory."""
        models = []
        if os.path.exists(MODELS_DIR):
            for f in os.listdir(MODELS_DIR):
                if f.endswith(".joblib") and f not in ["scaler.joblib", "best_model.joblib"]:
                    models.append(f[:-7]) # remove .joblib
        if "LightGBM" not in models and os.path.exists(os.path.join(MODELS_DIR, "best_model.joblib")):
            models.append("LightGBM")
        return sorted(list(set(models)))

    def load_model(self, model_name):
        if model_name in self.models_cache:
            return self.models_cache[model_name]

        possible_files = [
            os.path.join(MODELS_DIR, f"{model_name}.joblib"),
            os.path.join(MODELS_DIR, f"{model_name.replace(' ', '_')}.joblib"),
        ]
        if model_name.lower() in ["lightgbm", "best", "default"]:
            possible_files.append(os.path.join(MODELS_DIR, "best_model.joblib"))

        for p in possible_files:
            if os.path.exists(p):
                model = joblib.load(p)
                self.models_cache[model_name] = model
                return model

        # Fallback to default
        if "LightGBM" in self.models_cache:
            return self.models_cache["LightGBM"]

        best_path = os.path.join(MODELS_DIR, "best_model.joblib")
        if os.path.exists(best_path):
            model = joblib.load(best_path)
            self.models_cache["LightGBM"] = model
            return model

        raise FileNotFoundError(f"Model '{model_name}' not found.")

    def scan_file(self, file_path, model_name="LightGBM"):
        """Scans a single file using the specified model or Ensemble."""
        if not os.path.exists(file_path):
            return {"error": "File not found"}
        
        try:
            with open(file_path, "rb") as f:
                file_data = f.read()
        except Exception as e:
            return {"error": f"Failed to read file: {str(e)}"}

        try:
            features_raw = np.array(self.extractor.feature_vector(file_data), dtype=np.float32).reshape(1, -1)

            # If ensemble requested
            if model_name.lower() in ["ensemble", "all", "all models", "ensemble (consensus)"]:
                available = self.get_available_models()
                breakdown = {}
                probs = []
                for m_name in available:
                    try:
                        m = self.load_model(m_name)
                        feats = features_raw
                        if m_name == "Logistic Regression" and self.scaler:
                            feats = self.scaler.transform(feats)
                        p = float(m.predict_proba(feats)[0][1])
                        probs.append(p)
                        breakdown[m_name] = {
                            "is_malware": bool(p >= 0.5),
                            "probability": round(p, 4),
                            "confidence": round(p if p >= 0.5 else 1.0 - p, 4)
                        }
                    except Exception as err:
                        print(f"Error predicting with {m_name}: {err}")

                if not probs:
                    return {"error": "No models available for ensemble."}

                avg_prob = float(np.mean(probs))
                is_malware = bool(avg_prob >= 0.5)
                return {
                    "file": os.path.basename(file_path),
                    "is_malware": is_malware,
                    "confidence": float(avg_prob) if is_malware else float(1.0 - avg_prob),
                    "malware_probability": float(avg_prob),
                    "model_used": "Ensemble (Consensus)",
                    "models_breakdown": breakdown
                }

            # Single model
            model = self.load_model(model_name)
            features = features_raw
            if model_name == "Logistic Regression" and self.scaler:
                features = self.scaler.transform(features)

            prob = float(model.predict_proba(features)[0][1])
            is_malware = bool(prob >= 0.5)

            return {
                "file": os.path.basename(file_path),
                "is_malware": is_malware,
                "confidence": float(prob) if is_malware else float(1.0 - prob),
                "malware_probability": float(prob),
                "model_used": model_name
            }

        except Exception as e:
            return {"error": f"Failed to parse PE file. Is it a valid Windows executable? Details: {str(e)}"}


def main():
    parser = argparse.ArgumentParser(description="Scan a Windows executable for malware.")
    parser.add_argument("filepath", help="Path to the .exe file to scan")
    parser.add_argument("--model", default="LightGBM", help="Model to use (or 'Ensemble')")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    args = parser.parse_args()

    detector = MalwareDetector()
    result = detector.scan_file(args.filepath, model_name=args.model)

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
