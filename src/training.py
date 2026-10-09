"""
training.py — Train and compare ML models for malware detection.

Models trained:
1. Logistic Regression (with feature scaling)
2. Decision Tree
3. Random Forest  
4. LightGBM (gradient boosting)
5. Naive Bayes (Gaussian)

Each model is evaluated with:
- Accuracy, Precision, Recall, F1-score
- ROC-AUC
- Confusion Matrix
- False Positive Rate (FPR) and False Negative Rate (FNR)
- Training time and prediction time

Viva Q: "Why is recall important in malware detection?"
A: Because a False Negative means we MISSED a piece of malware, which could 
   infect the system. Missing malware is more dangerous than falsely flagging 
   a safe file (false positive).

Viva Q: "Why do false positives also matter?"
A: Because if we flag too many safe programs as malware, users will stop 
   trusting the system and might ignore real warnings (like the boy who 
   cried wolf). Also, blocking legitimate software hurts productivity.
"""
import os
import json
import time
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, roc_curve, confusion_matrix, classification_report
)
from sklearn.model_selection import cross_val_score
import lightgbm as lgb
import joblib
from tqdm import tqdm

# ---- CONFIGURATION ----
PROJECT_ROOT = os.path.join(os.path.dirname(__file__), "..")
DATA_DIR = os.path.join(PROJECT_ROOT, "data", "ember2024", "subset")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")
CHARTS_DIR = os.path.join(PROJECT_ROOT, "charts")

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(CHARTS_DIR, exist_ok=True)


def load_prepared_data():
    """Load the balanced training subset and full test set."""
    X_train = np.load(os.path.join(DATA_DIR, "X_train.npy"))
    y_train = np.load(os.path.join(DATA_DIR, "y_train.npy"))
    X_test = np.load(os.path.join(DATA_DIR, "X_test.npy"))
    y_test = np.load(os.path.join(DATA_DIR, "y_test.npy"))
    print(f"Training: {X_train.shape}, Test: {X_test.shape}")
    return X_train, y_train, X_test, y_test


def get_models(X_train_scaled=None):
    """
    Define all models to train. Returns a dictionary of model_name -> model.
    """
    models = {
        "Logistic Regression": LogisticRegression(
            max_iter=1000, random_state=42, n_jobs=-1, solver='saga'
        ),
        "Decision Tree": DecisionTreeClassifier(
            max_depth=20, random_state=42
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=100, max_depth=20, random_state=42, n_jobs=-1
        ),
        "LightGBM": lgb.LGBMClassifier(
            n_estimators=200, max_depth=15, learning_rate=0.1,
            num_leaves=63, random_state=42, n_jobs=-1, verbose=-1
        ),
        "Gaussian Naive Bayes": GaussianNB(),
    }
    return models


def evaluate_model(model, X_test, y_test, model_name):
    start = time.time()
    y_pred = model.predict(X_test)
    pred_time = time.time() - start
    
    # Get probability scores if the model supports it
    if hasattr(model, "predict_proba"):
        y_prob = model.predict_proba(X_test)[:, 1]
        auc = roc_auc_score(y_test, y_prob)
        fpr_curve, tpr_curve, _ = roc_curve(y_test, y_prob)
    else:
        y_prob = y_pred.astype(float)
        auc = roc_auc_score(y_test, y_prob)
        fpr_curve, tpr_curve = None, None
    
    # Confusion matrix
    tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()
    
    metrics = {
        "model": model_name,
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1_score": f1_score(y_test, y_pred),
        "roc_auc": auc,
        "true_positives": int(tp),
        "true_negatives": int(tn),
        "false_positives": int(fp),
        "false_negatives": int(fn),
        "fpr": fp / (fp + tn),
        "fnr": fn / (fn + tp),
        "prediction_time_seconds": pred_time,
    }
    
    return metrics, fpr_curve, tpr_curve


def train_all_models(X_train, y_train, X_test, y_test):
    print("Scaling features for Logistic Regression...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    joblib.dump(scaler, os.path.join(MODELS_DIR, "scaler.joblib"))
    
    models = get_models()
    all_metrics = []
    roc_data = {}
    trained_models = {}
    
    for name, model in tqdm(models.items(), desc="Training Models", total=len(models)):
        tqdm.write(f"\n{'='*50}")
        tqdm.write(f"Training: {name}")
        tqdm.write(f"{'='*50}")
        
        if name == "Logistic Regression":
            X_tr, X_te = X_train_scaled, X_test_scaled
        else:
            X_tr, X_te = X_train, X_test
        
        start = time.time()
        model.fit(X_tr, y_train)
        train_time = time.time() - start
        
        metrics, fpr_curve, tpr_curve = evaluate_model(model, X_te, y_test, name)
        metrics["training_time_seconds"] = train_time
        
        if fpr_curve is not None:
            roc_data[name] = (fpr_curve, tpr_curve, metrics["roc_auc"])
        
        all_metrics.append(metrics)
        trained_models[name] = model
        
        tqdm.write(f"  Accuracy:  {metrics['accuracy']:.4f}")
        tqdm.write(f"  Precision: {metrics['precision']:.4f}")
        tqdm.write(f"  Recall:    {metrics['recall']:.4f}")
        tqdm.write(f"  F1-Score:  {metrics['f1_score']:.4f}")
        tqdm.write(f"  ROC-AUC:   {metrics['roc_auc']:.4f}")
        tqdm.write(f"  FPR:       {metrics['fpr']:.4f}")
        tqdm.write(f"  FNR:       {metrics['fnr']:.4f}")
        tqdm.write(f"  Train time: {train_time:.1f}s, Predict time: {metrics['prediction_time_seconds']:.3f}s")
    
    return all_metrics, roc_data, trained_models


def plot_comparison_bar_chart(all_metrics):
    df = pd.DataFrame(all_metrics)
    metrics_to_plot = ["accuracy", "precision", "recall", "f1_score", "roc_auc"]
    
    fig, ax = plt.subplots(figsize=(14, 6))
    x = np.arange(len(df))
    width = 0.15
    
    for i, metric in enumerate(metrics_to_plot):
        ax.bar(x + i * width, df[metric], width, label=metric.replace("_", " ").title())
    
    ax.set_xlabel("Model")
    ax.set_ylabel("Score")
    ax.set_title("Model Comparison — Key Metrics")
    ax.set_xticks(x + width * 2)
    ax.set_xticklabels(df["model"], rotation=15, ha="right")
    ax.legend()
    ax.set_ylim(0.5, 1.05)
    ax.grid(axis="y", alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(CHARTS_DIR, "model_comparison_bar.png"), dpi=150)
    plt.close()
    print("Saved: charts/model_comparison_bar.png")


def plot_roc_curves(roc_data):
    fig, ax = plt.subplots(figsize=(8, 8))
    
    for name, (fpr, tpr, auc) in roc_data.items():
        ax.plot(fpr, tpr, label=f"{name} (AUC={auc:.4f})")
    
    ax.plot([0, 1], [0, 1], "k--", label="Random Classifier")
    ax.set_xlabel("False Positive Rate")
    ax.set_ylabel("True Positive Rate")
    ax.set_title("ROC Curves — All Models")
    ax.legend(loc="lower right")
    ax.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(CHARTS_DIR, "roc_curves.png"), dpi=150)
    plt.close()
    print("Saved: charts/roc_curves.png")


def plot_confusion_matrices(all_metrics):
    n_models = len(all_metrics)
    fig, axes = plt.subplots(1, n_models, figsize=(4 * n_models, 4))
    if n_models == 1:
        axes = [axes]
    
    for ax, m in zip(axes, all_metrics):
        cm = np.array([[m["true_negatives"], m["false_positives"]],
                       [m["false_negatives"], m["true_positives"]]])
        ax.imshow(cm, cmap="Blues")
        for i in range(2):
            for j in range(2):
                ax.text(j, i, f"{cm[i, j]:,}", ha="center", va="center", fontsize=10)
        ax.set_xlabel("Predicted")
        ax.set_ylabel("Actual")
        ax.set_title(m["model"], fontsize=9)
        ax.set_xticks([0, 1])
        ax.set_yticks([0, 1])
        ax.set_xticklabels(["Benign", "Malware"])
        ax.set_yticklabels(["Benign", "Malware"])
    
    plt.suptitle("Confusion Matrices", fontsize=14)
    plt.tight_layout()
    plt.savefig(os.path.join(CHARTS_DIR, "confusion_matrices.png"), dpi=150)
    plt.close()
    print("Saved: charts/confusion_matrices.png")


def save_best_model(all_metrics, trained_models, X_train, y_train):
    best = max(all_metrics, key=lambda m: m["f1_score"])
    best_name = best["model"]
    best_model = trained_models[best_name]
    
    print(f"\nBest model: {best_name} (F1={best['f1_score']:.4f})")
    
    model_path = os.path.join(MODELS_DIR, "best_model.joblib")
    joblib.dump(best_model, model_path)
    print(f"Saved model to: {model_path}")
    
    model_info = {
        "model_name": best_name,
        "needs_scaling": best_name == "Logistic Regression",
        "feature_dim": X_train.shape[1],
    }
    with open(os.path.join(MODELS_DIR, "model_info.json"), "w") as f:
        json.dump(model_info, f, indent=2)
    
    metrics_path = os.path.join(MODELS_DIR, "model_metrics.json")
    with open(metrics_path, "w") as f:
        json.dump(all_metrics, f, indent=2)
    print(f"Saved metrics to: {metrics_path}")
    
    df = pd.DataFrame(all_metrics)
    cols = ["model", "accuracy", "precision", "recall", "f1_score", "roc_auc", "fpr", "fnr", 
            "training_time_seconds", "prediction_time_seconds"]
    print("\n" + df[cols].to_string(index=False))
    
    return best_name, best_model


def run_cross_validation(best_name, X_train, y_train, trained_models):
    print(f"\nRunning 5-fold cross-validation on {best_name}...")
    model = trained_models[best_name]
    
    subset_size = min(50000, len(y_train))
    idx = np.random.choice(len(y_train), subset_size, replace=False)
    X_cv = X_train[idx]
    y_cv = y_train[idx]
    
    cv_scores = cross_val_score(model, X_cv, y_cv, cv=5, scoring='f1', n_jobs=-1)
    print(f"CV F1 scores: {cv_scores}")
    print(f"CV F1 mean: {cv_scores.mean():.4f} +- {cv_scores.std():.4f}")
    
    return cv_scores


if __name__ == "__main__":
    X_train, y_train, X_test, y_test = load_prepared_data()
    all_metrics, roc_data, trained_models = train_all_models(X_train, y_train, X_test, y_test)
    
    plot_comparison_bar_chart(all_metrics)
    plot_roc_curves(roc_data)
    plot_confusion_matrices(all_metrics)
    
    best_name, best_model = save_best_model(all_metrics, trained_models, X_train, y_train)
    cv_scores = run_cross_validation(best_name, X_train, y_train, trained_models)
    
    print("\nPhase 2 complete! Check the charts/ folder for visualizations.")
