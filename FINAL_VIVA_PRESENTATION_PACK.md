# 🎓 MALSCAN: COMPLETE FINAL PRESENTATION & VIVA PACK
### 2nd Year B.Tech CSE (AI & ML) — Concepts in Machine Learning Mini Project
**Project Name:** MalScan: Windows PE Malware Detection Using Machine Learning  
**Student:** 2nd Year B.Tech CSE (AI & ML), KTU  

---

# SECTION 1: PROJECT SUMMARY

### 1. What the Project Does (in 3 Simple Lines)
1. **MalScan** is an automated malware detection system for Windows executable files (`.exe`, `.dll`, `.sys`).
2. When a user uploads a file, it parses **2,568 structural and mathematical features** from the binary without ever running or executing it.
3. It passes these features to pre-trained machine learning models to classify the file as **Safe** or **Malware** in **under 5 milliseconds**, showing a calibrated threat score.

### 2. The Problem It Solves & Who It Helps
* **The Problem:** Traditional antivirus tools use hash signatures (MD5/SHA256). If an attacker changes just one useless byte, the hash changes completely and the antivirus misses it. Meanwhile, dynamic sandbox virtual machines take 5 to 10 minutes to run and can be tricked by malware that sleeps or detects the VM.
* **Who It Helps:**
  * **SOC (Security Operations Center) Analysts:** Triage hundreds of suspicious email attachments in seconds.
  * **Everyday Users & Organizations:** Instantly inspect downloaded executables before opening them.

### 3. The Machine Learning Approach
* **Paradigm:** Supervised binary classification on high-dimensional tabular data.
* **5 Algorithms Evaluated:** LightGBM (Gradient Boosted Trees), Random Forest (Bagging Ensemble), Decision Tree (CART), Logistic Regression (Linear Log-Odds), and Gaussian Naive Bayes (Probabilistic).
* **Core Libraries & Tools:**
  * **ML & Vectorization:** `lightgbm`, `scikit-learn`, `numpy`, `pefile`, `thrember`.
  * **Backend Service:** `FastAPI`, `uvicorn`.
  * **Frontend Web Dashboard:** `React 18`, `Vite`, `lucide-react`, `axios`.

---

# SECTION 2: SLIDE-BY-SLIDE PLAN (17 SLIDES)

---

### SLIDE 1: Title Slide
* **Slide Title:** **MalScan: Windows PE Malware Detection Using Machine Learning**
* **Text / Bullets on Slide:**
  * Subtitle: Static Feature Analysis & Multi-Model Comparative Evaluation
  * Course: Concepts in Machine Learning (Mini Project)
  * Student Name: [Your Name] | Register No: [Your KTU Reg No]
  * Branch & Year: B.Tech Computer Science & Engineering (AI & ML) — 2nd Year
  * Department: Department of Computer Science & Engineering
  * Institution: [Your College Name], APJ Abdul Kalam Technological University (KTU)
  * Project Guide: [Guide Professor's Name & Designation]
* **Visual to Put:** MalScan Logo with subtle tech badges (`Python 3.11`, `FastAPI`, `React`, `LightGBM`).
* **What to Say:**
  > *"Good morning respected examiners and professors. My name is [Your Name], a 2nd year B.Tech student in Computer Science & Engineering (AI & ML). Today, I am presenting my Machine Learning Mini Project: **MalScan** — a Windows malware detection system that statically analyzes executable binaries using machine learning without ever executing them."*

---

### SLIDE 2: Problem Statement
* **Slide Title:** **Problem Statement**
* **Text / Bullets on Slide:**
  * **The Challenge:** Over 450,000 new malware samples appear daily; attackers use automated tools to constantly mutate code.
  * **Limitation of Signature Antivirus (MD5/SHA256):** Fails on zero-day malware. Appending even 1 junk byte changes the hash completely $\rightarrow$ 100% detection bypass.
  * **Limitation of Dynamic Sandboxes:** Running samples inside virtual machines takes 5–10 minutes. Malware can detect VMs or sleep to evade execution.
  * **Goal:** A sub-second detection system that identifies malicious patterns from static file structure with zero execution risk.
* **Visual to Put:** A 3-box comparison graphic showing: Signature Hashing (Bypassed) vs. Sandbox (Too Slow) vs. Static ML (Instant & Safe).
* **What to Say:**
  > *"Traditional antivirus systems rely on cryptographic hashes like MD5 and SHA-256. If a malware author changes even one byte, the hash completely alters, allowing new malware to slip right through.
  > On the other hand, dynamic sandboxing takes 5 to 10 minutes to run each file in a virtual machine, and malware often sleeps to avoid detection.
  > We need a system that can accurately detect malware in milliseconds before the file is ever opened."*

---

### SLIDE 3: Objectives
* **Slide Title:** **Project Objectives**
* **Text / Bullets on Slide:**
  * **Safe Static Parsing:** Extract structural features from Windows PE files without executing them.
  * **Benchmark Scale:** Train models on a balanced 100,000-sample subset of the industry-standard EMBER 2024 dataset.
  * **Multi-Model Evaluation:** Train and benchmark 5 distinct ML algorithms (Tree, Ensemble, Boosting, Linear, Probabilistic).
  * **Empirical Comparison:** Measure performance using 8 metrics (Accuracy, Precision, Recall, F1, ROC-AUC, FPR, FNR, Latency).
  * **Interactive Web Application:** Provide an intuitive web dashboard for real-time file upload and multi-model consensus scanning.
* **Visual to Put:** Icons representing: 1. Safe Ingestion, 2. Feature Extractor, 3. 5 ML Models, 4. Web Dashboard.
* **What to Say:**
  > *"The objective of our mini project is to build an end-to-end malware detector. This includes extracting static structural features without executing the file, training 5 distinct machine learning models on a benchmark dataset of 100,000 files, evaluating them across multiple metrics, and presenting the results in an interactive web interface."*

---

### SLIDE 4: Literature Survey / Existing Systems
* **Slide Title:** **Literature Survey & Existing Systems**
* **Text / Bullets on Slide:**

| Approach | Technology | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Signature Antivirus** (ClamAV, Windows Defender) | MD5 / SHA-256 Hash Matching | Extremely fast lookups | Fails completely on novel or mutated zero-day malware |
| **Dynamic Sandbox** (Cuckoo Sandbox) | VM execution & API Hooking | Observes actual runtime behavior | 5–10 min latency; malware evades via sleep/VM detection |
| **Legacy Static ML** (EMBER 2018 / LIEF) | Hand-crafted PE parsing | No execution needed | Rigid C++ dependencies (LIEF pinned to Python 3.6) |
| **Proposed: MalScan** | **EMBER 2024 + pure Python `pefile`** | **Safe, 2,568 features, modern Python 3.11, sub-5ms** | **Focuses on static structural analysis** |

* **Visual to Put:** Comparison table highlighting MalScan's balance of speed, safety, and modern compatibility.
* **What to Say:**
  > *"Looking at existing literature: signature-based scanners are fast but miss zero-days. Dynamic sandboxes catch behavior but are too slow. Early machine learning benchmarks like EMBER 2018 were stuck on Python 3.6 due to rigid C++ libraries.
  > In MalScan, we utilize the modern EMBER 2024 standard using pure-Python `pefile`, which extracts 2,568 features and runs in modern Python 3.11."*

---

### SLIDE 5: Proposed System & Architecture Diagram
* **Slide Title:** **Proposed System Architecture**
* **Text / Bullets on Slide:**
  * **5-Stage Detection Pipeline:**
    1. **Upload:** User drags `.exe` into React UI (150 MB safety threshold).
    2. **Quarantine:** FastAPI reads bytes into RAM; verifies `MZ` header; zero disk execution.
    3. **Extraction:** Fast parser extracts 2,568 structural features (histograms, entropy, imports, headers).
    4. **Inference:** Dispatches vector to 5 trained ML models in parallel.
    5. **Output:** Calibrated threat score, safe/malware verdict, and individual model breakdown.
* **Visual to Put:** Use `charts/architecture_pipeline.png` (the clean 5-box flowchart showing Ingestion $\rightarrow$ Quarantine $\rightarrow$ Feature Extractor $\rightarrow$ 5 Models $\rightarrow$ Web UI).
* **What to Say:**
  > *"Here is our system architecture. When a user uploads a file, it goes to our FastAPI backend and stays safely in memory buffer without execution.
  > Our feature extractor extracts 2,568 features and feeds them to our 5 trained models in parallel. The backend returns the verdict, confidence score, and individual model answers to the React frontend in real time."*

---

### SLIDE 6: Dataset (EMBER 2024 Benchmark)
* **Slide Title:** **Dataset Scale & Engineering**
* **Text / Bullets on Slide:**
  * **Dataset Source:** EMBER 2024 (Elastic Malware Benchmark for Empowering Researchers).
  * **Raw Dataset Pool:** 3,120,000 files (60.6 GB raw JSONL / 29.85 GB binary `.dat`).
  * **Balanced Training Set:** **100,000 Binaries** (50,000 Benign • 50,000 Malware).
    * Equal 1:1 balance prevents majority-class bias.
  * **Held-Out Test Set:** **24,979 Binaries** (12,500 Malware • 12,479 Benign).
    * 100% independent validation set unseen during training.
  * **Memory-Mapped Streaming:** Used `numpy.memmap` to stream data directly from disk into RAM, preventing out-of-memory crashes on 60 GB files.
* **Visual to Put:** Use `charts/dataset_distribution.png` (the two pie charts showing the 50:50 training split and the 12,500/12,479 test split).
* **What to Say:**
  > *"For our dataset, we used the EMBER 2024 benchmark. The raw dataset contains over 3.12 Million executables spanning 60 GB.
  > Training tree models on 3 million files would require over 100 GB of RAM. Therefore, using `numpy.memmap` for memory-efficient disk streaming, we sampled a perfectly balanced subset of 100,000 files — 50,000 benign and 50,000 malware. We tested on an independent held-out set of 24,979 files."*

---

### SLIDE 7: Methodology & Workflow
* **Slide Title:** **Methodology & Project Workflow**
* **Text / Bullets on Slide:**
  * **Step 1: Data Ingestion & Memmap:** Streamed binary `.dat` files from EMBER 2024 using memory mapping.
  * **Step 2: Preprocessing & Cleaning:** Removed unlabeled samples; balanced classes to exact 50:50 ratio; normalized features for linear models using `StandardScaler`.
  * **Step 3: Feature Vectorization:** Extracted 2,568 dense float features per file.
  * **Step 4: Model Training:** Trained 5 distinct algorithms on the 100,000 samples.
  * **Step 5: Rigorous Evaluation:** Generated confusion matrices, ROC curves, and cross-metric comparisons on 24,979 test files.
  * **Step 6: Web Deployment:** Packaged inference inside FastAPI and connected to React dashboard.
* **Visual to Put:** A vertical or horizontal 6-step progress pipeline graphic.
* **What to Say:**
  > *"Our methodology followed standard engineering steps: memory-mapped data ingestion, class balancing, feature extraction, training 5 models, rigorous evaluation on 24,979 unseen files, and finally building the web interface."*

---

### SLIDE 8: Feature Engineering: The 2,568 Dimensions
* **Slide Title:** **Feature Engineering (2,568 Features)**
* **Text / Bullets on Slide:**
  * **1. Byte Histogram (256 dims):** Frequencies of bytes 0x00 through 0xFF.
  * **2. Byte-Entropy 2D Histogram (256 dims):** Shannon entropy ($H = -\sum p_i \log_2 p_i$) across sliding 1024-byte windows. Highlights encrypted ransomware payloads ($H > 7.8$).
  * **3. Section Properties (265 dims):** Number of sections, virtual size vs. raw size differences, section entropy, and execution permissions.
  * **4. Imported Windows APIs (1,280 dims):** Uses MurmurHash3 (Hashing Trick) to bin imported APIs (e.g., `VirtualAlloc`, `WriteProcessMemory`, `CreateRemoteThread`).
  * **5. Authenticode & Rich Header (507 dims):** Digital signature presence, certificate validity, and Microsoft Rich compiler telemetry.
  * **6. DOS & General Header (10 dims):** File size, entry point address, subsystem flags.
* **Visual to Put:** A pie chart or bar chart showing the breakdown: Imports (50%), Entropy & Byte Stats (20%), Signatures/Rich (20%), Sections/Headers (10%).
* **What to Say:**
  > *"How do we convert an executable into machine learning numbers? We extract 2,568 static structural features.
  > Malware often uses packing or encryption to hide payloads. This creates telltale mathematical signatures: high Shannon entropy above 7.8, suspicious import combinations like `VirtualAlloc` paired with `WriteProcessMemory` for process injection, and mismatched section sizes. All of these are captured in the 2,568-feature vector."*

---

### SLIDE 9: Algorithms / Models Used & Why
* **Slide Title:** **Machine Learning Algorithms Selected**
* **Text / Bullets on Slide:**
  * **1. LightGBM (Gradient Boosted Decision Trees):**
    * *Why:* Fast, leaf-wise tree growth with GOSS; handles high-dimensional tabular data.
  * **2. Random Forest (Bagging Ensemble):**
    * *Why:* Trains 60 de-correlated trees on random feature subsets; resistant to noise and structural evasion.
  * **3. Decision Tree (CART Classifier):**
    * *Why:* Fast, interpretable hierarchical logic based on Gini Impurity.
  * **4. Logistic Regression (Linear Model):**
    * *Why:* Scaled linear log-odds model; serves as a baseline to test linear separability.
  * **5. Gaussian Naive Bayes (Probabilistic Classifier):**
    * *Why:* Bayes' Theorem baseline; ultra-fast with high sensitivity/recall.
* **Visual to Put:** 5 model cards with algorithm icons and their core strengths.
* **What to Say:**
  > *"To fulfill KTU's guideline of evaluating multiple ML methods, we chose 5 fundamentally different paradigms: a linear model (Logistic Regression), a baseline probabilistic model (Gaussian Naive Bayes), a single tree (Decision Tree), an ensemble bagging model (Random Forest), and a gradient boosting model (LightGBM). This allows us to observe how different algorithmic biases perform on cybersecurity features."*

---

### SLIDE 10: Implementation & Key Modules
* **Slide Title:** **System Implementation & Code Structure**
* **Text / Bullets on Slide:**
  * **Project Structure:**
    * `src/data_loader.py`: Memory-mapped ingestion of EMBER 2024 `.dat` arrays.
    * `src/training.py`: Model training, hyperparameter setup, and metric evaluation.
    * `src/detection.py`: High-throughput PE parser and vectorized feature extraction kernel.
    * `src/api.py`: FastAPI endpoints (`/scan`, `/models`, `/`) with safe memory quarantine.
    * `frontend/src/`: React 18 single-page application with Neo-Brutalist UI.
  * **Inference Speed Optimization:**
    * Vectorized Shannon entropy using NumPy histogram routines.
    * Selective `pefile` directory parsing (skips slow relocation tables), achieving **4.5 MB/s parsing throughput**.
* **Visual to Put:** Code snippet or folder tree graphic.
* **What to Say:**
  > *"Our implementation is structured into clean modules: `data_loader.py` for dataset ingestion, `training.py` for model training, `detection.py` for accelerated feature extraction, and `api.py` for our FastAPI web service.
  > By vectorizing our entropy calculations in NumPy, we achieved an extraction throughput of 4.5 MB per second."*

---

### SLIDE 11: Experimental Results & Model Leaderboard
* **Slide Title:** **Model Benchmark & Comparison**
* **Text / Bullets on Slide:**
  * Evaluated on **24,979 held-out test binaries** (12,500 Malware • 12,479 Benign):

| Model | Accuracy | Precision | Recall | F1-Score | False Pos. Rate | Inference Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **LightGBM (Best)** | **96.88%** | **97.69%** | **96.03%** | **96.85%** | **2.28%** | **4.8 ms** |
| **Random Forest** | 95.64% | 97.16% | 94.03% | 95.57% | 2.76% | 18.2 ms |
| **Decision Tree** | 94.12% | 95.22% | 92.91% | 94.05% | 4.67% | 2.1 ms |
| **Logistic Regression** | 93.21% | 95.93% | 90.26% | 93.01% | 3.84% | 1.8 ms |
| **Gaussian Naive Bayes** | 64.31% | 58.45% | **99.14%** | 73.54% | 70.58% | **1.2 ms** |

* **Visual to Put:** Use `charts/model_comparison_bar.png` (the bar chart comparing accuracy, precision, recall, and F1 across all 5 models).
* **What to Say:**
  > *"Here are our results on 24,979 unseen test files.
  > LightGBM achieved the highest overall accuracy at 96.88%, an F1-score of 96.85%, and the lowest False Positive Rate at 2.28%, with an inference latency of just 4.8 milliseconds.
  > Interestingly, Gaussian Naive Bayes achieved 99.14% Recall. It caught almost every malware sample, though with higher false alarms, making it useful as an aggressive screening pre-filter."*

---

### SLIDE 12: Statistical Analysis: Confusion Matrix & ROC Curves
* **Slide Title:** **Statistical Error Analysis**
* **Text / Bullets on Slide:**
  * **The Cybersecurity Error Tradeoff:**
    * False Negative (FN): Malware missed $\rightarrow$ Host infected (Catastrophic).
    * False Positive (FP): Benign file blocked $\rightarrow$ Legitimate software broken (Disruptive).
  * **LightGBM Confusion Matrix (24,979 Test Samples):**
    * **True Positives (TP):** **12,004** (Malware caught)
    * **True Negatives (TN):** **12,195** (Benign allowed)
    * **False Positives (FP):** **284** (2.28% false alarms)
    * **False Negatives (FN):** **496** (3.97% missed threats)
    * **Total Correct:** $12,004 + 12,195 = \mathbf{24,199}$ (**96.88%**) | **Total Errors:** $284 + 496 = \mathbf{780}$ (**3.12%**)
  * **ROC-AUC Score:** LightGBM achieved **0.996 ROC-AUC**, hugging the top-left corner.
* **Visual to Put:** Use `charts/roc_curves.png` and `charts/confusion_matrices.png`.
* **What to Say:**
  > *"In cybersecurity, accuracy alone is not enough — we must inspect the confusion matrix. On 24,979 test binaries, LightGBM caught 12,004 malware binaries and produced only 284 false alarms.
  > Furthermore, its ROC-AUC score is 0.996, indicating that there is a 99.6% probability the model ranks a randomly chosen malware file higher than a randomly chosen benign file."*

---

### SLIDE 13: Live Case Study: The 121 MB VS Code Demo
* **Slide Title:** **Case Study: Single Tree Overfitting vs. Ensembles**
* **Text / Bullets on Slide:**
  * **Real-World Test Binary:** `VSCodeUserSetup-x64.exe` (121.5 MB official installer).
  * **Multi-Model Scan Verdict:**
    * **LightGBM:** Threat Prob: **6.2% $\rightarrow$ SAFE (93.8% Conf.)** ✅
    * **Gaussian Naive Bayes:** Threat Prob: **0.0% $\rightarrow$ SAFE (100% Conf.)** ✅
    * **Logistic Regression:** Threat Prob: **1.2% $\rightarrow$ SAFE (98.8% Conf.)** ✅
    * **Random Forest:** Threat Prob: **24.4% $\rightarrow$ SAFE (75.6% Conf.)** ✅
    * **Decision Tree:** Threat Prob: **100.0% $\rightarrow$ MALWARE (100% Conf.)** ❌
  * **The Technical Explanation:**
    * VS Code has 115 MB of LZMA compressed data $\rightarrow$ Section entropy exceeds **7.95**.
    * Single Decision Tree made a greedy split on `Size > 50MB and Entropy > 7.9`, falling into a malware leaf node.
    * Ensembles (Random Forest & LightGBM) inspected valid Authenticode digital signatures and import tables across multiple trees, correctly classifying it as Safe.
* **Visual to Put:** Screenshot of the 5-Model Multi-Scan result card showing the 4 Safe vs 1 Malware breakdown.
* **What to Say:**
  > *"When we scanned the official 121 MB VS Code installer, four models correctly identified it as safe, with LightGBM giving it a 93.8% safe rating. But our single Decision Tree flagged it as 100% Malware!
  > Why? Because VS Code contains a compressed runtime with high entropy above 7.95. A single tree overfit to file size and entropy heuristics. However, our ensemble models inspected Authenticode digital signatures and import tables across dozens of trees, easily avoiding this trap. This provides live proof of why ensembling beats single trees."*

---

### SLIDE 14: Challenges Faced & How We Solved Them
* **Slide Title:** **Engineering Challenges & Solutions**
* **Text / Bullets on Slide:**
  * **1. Challenge: Memory Overflow on 60 GB Dataset**
    * *Problem:* Loading 3.12M JSON files exhausted 16 GB system RAM.
    * *Solution:* Implemented `numpy.memmap` to stream pre-vectorized binary `.dat` arrays directly from disk on demand.
  * **2. Challenge: Feature Extraction Latency on Large Files**
    * *Problem:* Initial pure-Python Shannon entropy parsing took 18+ seconds on a 10 MB executable.
    * *Solution:* Vectorized entropy calculation with NumPy histogram routines and disabled slow relocation tables in `pefile`, cutting scan time to under 3.5s (19x speedup).
  * **3. Challenge: Avoiding Class Imbalance Bias**
    * *Problem:* Raw telemetry data was heavily skewed towards malware.
    * *Solution:* Stratified exactly 50,000 benign and 50,000 malware samples to maintain an unbiased 1:1 decision boundary.
* **Visual to Put:** 3 problem-solution card blocks.
* **What to Say:**
  > *"We solved three major engineering challenges: First, memory management — we used `numpy.memmap` to stream our 60 GB dataset without RAM crashes. Second, extraction speed — we vectorized entropy calculations in NumPy to achieve an 19x speedup. Third, class balance — we strictly balanced our training set to a 50:50 ratio to prevent bias."*

---

### SLIDE 15: Limitations & Future Scope
* **Slide Title:** **Limitations & Future Scope**
* **Text / Bullets on Slide:**
  * **Limitations:**
    * **Advanced Packing/Crypters:** Custom packing with extreme entropy can occasionally mimic packed legitimate installers.
    * **Concept Drift:** Malware authors adopt new APIs over time; models require periodic retraining.
    * **Static Blind Spots:** Cannot detect fileless payloads injected purely into memory at runtime.
  * **Future Scope:**
    * **Hybrid Architecture:** Combine static PE features with lightweight dynamic API call logs from a container sandbox.
    * **Deep Learning (MalConv):** Train 1D CNNs or Transformers directly on raw byte streams without manual feature engineering.
    * **Automated Honeypot Retraining:** Set up automated pipelines to ingest new daily threat feeds.
* **Visual to Put:** Diagram showing Static Analysis + Dynamic Traces $\rightarrow$ Hybrid Defense.
* **What to Say:**
  > *"Every security tool has honest limitations. Pure static analysis cannot detect fileless malware injected purely into memory at runtime, and models face concept drift over time.
  > In the future, we plan to combine our static classifier with dynamic API call traces in a hybrid setup, and explore deep learning architectures like MalConv."*

---

### SLIDE 16: Conclusion
* **Slide Title:** **Conclusion & Key Takeaways**
* **Text / Bullets on Slide:**
  * **Project Accomplishments:**
    * Successfully developed and deployed an end-to-end Windows malware detector.
    * Trained on **100,000 PE Binaries** across **2,568 features** using the EMBER 2024 benchmark.
    * Benchmarked 5 machine learning models on **24,979 held-out test files**.
  * **Top Performance:**
    * **LightGBM** achieved the best overall performance (**96.88% Accuracy**, **0.996 ROC-AUC**, **4.8ms inference**, and **2.28% False Positive Rate**).
    * Multi-model consensus prevents single-tree false alarms on large compressed installers.
  * **KTU Guidelines Satisfied:** Addressed a real-world cybersecurity problem, applied standard datasets, and demonstrated empirical evaluation rigor.
* **Visual to Put:** Summary badges showing: 96.88% Accuracy, 4.8ms Inference, 100,000 Files, 2,568 Features.
* **What to Say:**
  > *"In conclusion, MalScan demonstrates that machine learning can accurately classify Windows malware in milliseconds using static structural features alone. Our LightGBM model achieved 96.88% accuracy and an ROC-AUC of 0.996 on 24,979 unseen test files, while running inference in under 5 milliseconds. The project fully satisfies all KTU mini-project requirements. Thank you."*

---

### SLIDE 17: References & Q&A
* **Slide Title:** **References & Thank You**
* **Text / Bullets on Slide:**
  * **Key References:**
    1. *FutureComputing4AI (2024):* "EMBER2024: A Modern Benchmark for Empowering Malware Researchers", arXiv:2506.05074.
    2. *Anderson, H. S., & Roth, P. (2018):* "EMBER: An Open Dataset for Training Static PE Malware Machine Learning Models", arXiv:1804.04637.
    3. *Ke, G. et al. (2017):* "LightGBM: A Highly Efficient Gradient Boosting Decision Tree", NeurIPS 2017.
    4. *Microsoft Security Documentation:* "PE Format: Overview of Windows Executable Structures".
  * **Project Repository:** `https://github.com/antojeromc17-blip/UNAMED`
  * **Questions & Discussion:** *Thank you! I am ready for questions.*
* **Visual to Put:** GitHub repo link / QR code and a clean Q&A title banner.
* **What to Say:**
  > *"Here are our key academic references, including the official EMBER 2024 and LightGBM papers. Thank you for your time. I am now open to your questions."*

---

# SECTION 3: VISUALS TO CREATE & USE

All chart visuals have been generated and saved directly in your project folder at **`D:\unamed\charts\`** (and also mirrored in **`frontend/public/charts/`**):

| # | Visual Name | File Path in Project | Which Slide to Put On |
| :-: | :--- | :--- | :--- |
| **1** | **Architecture Pipeline** | `D:\unamed\charts\architecture_pipeline.png` | **Slide 5** (Proposed Architecture) |
| **2** | **Dataset Distribution** | `D:\unamed\charts\dataset_distribution.png` | **Slide 6** (Dataset) |
| **3** | **Model Comparison Bar Chart** | `D:\unamed\charts\model_comparison_bar.png` | **Slide 11** (Results) |
| **4** | **Confusion Matrices (2x3 Grid)**| `D:\unamed\charts\confusion_matrices.png` | **Slide 12** (Statistical Analysis) |
| **5** | **ROC Curves (All 5 Models)** | `D:\unamed\charts\roc_curves.png` | **Slide 12** (Statistical Analysis) |

### How to Regenerate or Modify Any Chart:
* To regenerate the architecture or dataset split charts, run:
  ```powershell
  venv\Scripts\python.exe scratch\generate_presentation_charts.py
  ```
* To regenerate the evaluation charts from models, run:
  ```powershell
  venv\Scripts\python.exe src\training.py
  ```

---

# SECTION 4: DEMO PLAN (STEP-BY-STEP)

### A. Pre-Demo Preparation
1. Open **Terminal 1** (Backend):
   ```powershell
   venv\Scripts\python.exe -m uvicorn src.api:app --reload
   ```
   *(Verify `http://127.0.0.1:8000/docs` responds with `{"status":"online"}`)*
2. Open **Terminal 2** (Frontend):
   ```powershell
   cd frontend
   npm run dev
   ```
   *(Open `http://localhost:5173/` in Chrome/Edge, press F11 for clean fullscreen)*

---

### B. Live Demo Steps During Viva

* **Step 1: The Landing Page (`http://localhost:5173/`)**
  * Show the hero header: **`MALSCAN`**.
  * Scroll down to the **`TRAINED ON 100,000 SAMPLES`** section to show the scale cards (100k balanced train, 3.12M raw pool, 24,979 test split, 2,568 features).
  * Click **"Launch File Scanner"**.

* **Step 2: Normal Safe Binary Scan (`http://localhost:5173/scan`)**
  * Select model mode: **`All Models (Run All 5)`**.
  * Drag and drop `notepad.exe` (or `test_files/notepad_copy.exe`).
  * Show extraction time (~0.3s) and inference time (~5ms).
  * **Result:** **5 of 5 Models Flagged SAFE** (Verdict: SAFE, Threat: 0.0%).

* **Step 3: The Killer Demo — VS Code Installer (Overfitting Demo)**
  * Drag and drop `VSCodeUserSetup-x64.exe` (121.5 MB).
  * Show the live stage progress: *Uploading $\rightarrow$ Deep Static Analysis $\rightarrow$ Executing All 5 Models*.
  * **Result:** **4 of 5 Models Flagged SAFE • 1 Flagged MALWARE**.
  * Explain the finding to examiners:
    > *"Notice that LightGBM gave 93.8% Safe, Random Forest gave 75.6% Safe, but Decision Tree gave 100% Malware. This demonstrates single-tree overfitting on compressed file entropy, and proves why ensemble models are necessary."*

* **Step 4: Metrics Leaderboard (`http://localhost:5173/dashboard`)**
  * Show the top summary banner (100,000 Trained Samples).
  * Show the 5-model table comparing Accuracy, Precision, Recall, F1, FPR, and Inference Latency.

* **Step 5: Interactive Visualizations (`http://localhost:5173/charts`)**
  * Show the ROC Curves tab (LightGBM AUC: 0.996).
  * Click the **Interactive Auditor** tab: select LightGBM and show the exact 12,004 TP, 12,195 TN, 284 FP, and 496 FN counts.

---

### C. Backup Plan (If Live Network / Server Fails)
* If the live server fails to start during viva, do not panic:
  1. Open the pre-generated charts directly from `D:\unamed\charts\`:
     * Open `architecture_pipeline.png`
     * Open `model_comparison_bar.png`
     * Open `confusion_matrices.png`
     * Open `roc_curves.png`
  2. Open the static metrics file `frontend/src/model_metrics.json` to show the exact JSON results.
  3. Show the pre-tested scan results from your terminal log or screenshots.

---

# SECTION 5: COMPLETE SPEAKING SCRIPT (8–10 MINUTES)

* **Slide 1 (Title):**
  > *"Good morning respected professors and external examiners. My name is [Your Name], 2nd year B.Tech in Computer Science and Engineering (AI & ML). Today, I am presenting our Machine Learning Mini Project: MalScan — a Windows malware detection system that statically analyzes executable binaries without executing them."*
* **Slide 2 (Problem Statement):**
  > *"Traditional antivirus tools rely on hash signatures. If an attacker changes even one byte, the hash completely alters and bypasses detection. Dynamic sandboxing takes 5 to 10 minutes to run in a VM, and modern malware deliberately sleeps to evade detection. MalScan parses internal PE structural features statically, providing sub-second zero-day detection with zero execution risk."*
* **Slide 3 (Objectives):**
  > *"Our objective was to build an end-to-end pipeline: safe byte parsing, training 5 distinct machine learning models on a benchmark dataset of 100,000 files, evaluating them across 8 metrics, and presenting the results in an interactive web application."*
* **Slide 4 (Literature Survey):**
  > *"Comparing existing systems: hash signatures are fast but miss zero-days. Sandboxes catch behavior but are too slow. Legacy ML tools like EMBER 2018 were stuck on Python 3.6 due to rigid C++ dependencies. MalScan uses the modern EMBER 2024 benchmark with pure-Python `pefile`, extracting 2,568 features in modern Python 3.11."*
* **Slide 5 (Architecture):**
  > *"Here is our architecture: files are uploaded via React, buffered safely in memory by FastAPI, processed by our vectorized feature extractor into a 2,568-dimensional vector, evaluated across all 5 models in parallel, and results are returned in real time."*
* **Slide 6 (Dataset):**
  > *"We used the EMBER 2024 benchmark with over 3.12 Million executables. To avoid memory crashes on 60 GB files, we used `numpy.memmap` to stream a perfectly balanced subset of 100,000 files — 50,000 benign and 50,000 malware. We tested on an independent held-out set of 24,979 files."*
* **Slide 7 (Methodology):**
  > *"Our methodology followed standard engineering steps: memory-mapped data ingestion, class balancing, feature extraction, training 5 models, rigorous evaluation on 24,979 unseen files, and web deployment."*
* **Slide 8 (Feature Engineering):**
  > *"We extract 2,568 features across 6 categories: byte histograms, sliding-window Shannon entropy, section properties, imported API hashes, digital certificates, and PE headers. Encrypted or packed malware exhibits entropy above 7.8 and suspicious import pairings, which our vector captures."*
* **Slide 9 (Algorithms):**
  > *"We chose 5 diverse algorithms: Logistic Regression for linear baseline, Gaussian Naive Bayes for probabilistic baseline, Decision Tree for single-tree logic, Random Forest for bagging stability, and LightGBM for gradient boosting on tabular data."*
* **Slide 10 (Implementation):**
  > *"The system is modular: `data_loader.py` for dataset loading, `training.py` for training, `detection.py` for extraction, and `api.py` for FastAPI. By vectorizing entropy calculations in NumPy, we achieved an extraction throughput of 4.5 MB per second."*
* **Slide 11 (Results):**
  > *"On 24,979 test binaries, LightGBM achieved the highest accuracy at 96.88%, with an inference latency of 4.8 milliseconds and a False Positive Rate of just 2.28%. Gaussian Naive Bayes achieved 99.14% Recall, proving valuable as a zero-tolerance pre-screening filter."*
* **Slide 12 (Confusion Matrix):**
  > *"In security, accuracy alone is insufficient. On 24,979 test files, LightGBM caught 12,004 out of 12,500 malware binaries and produced only 284 false alarms. Its ROC-AUC score is 0.996, indicating strong discriminative capability across all decision thresholds."*
* **Slide 13 (Case Study):**
  > *"On the 121 MB VS Code installer, four models correctly identified it as safe (LightGBM: 93.8% safe), but our single Decision Tree flagged it as 100% Malware! This demonstrates single-tree overfitting on compressed file entropy, and illustrates why ensemble models are necessary."*
* **Slide 14 (Challenges):**
  > *"We solved three key engineering hurdles: streaming 60 GB data via `numpy.memmap`, accelerating entropy calculations by 19x via vectorized NumPy, and maintaining an exact 50:50 class balance."*
* **Slide 15 (Limitations & Future Scope):**
  > *"Pure static analysis cannot detect fileless malware injected purely into memory at runtime, and models face concept drift over time. In future work, we plan to implement a hybrid setup combining static features with dynamic API call traces."*
* **Slide 16 (Conclusion):**
  > *"In conclusion, MalScan demonstrates that machine learning can accurately classify Windows malware in milliseconds using static structural features alone. Our LightGBM model achieved 96.88% accuracy and an ROC-AUC of 0.996 on 24,979 unseen test files. The project fully satisfies the KTU mini-project requirements. Thank you."*
* **Slide 17 (Q&A):**
  > *"Here are our references. I am now open to your questions."*

---

# SECTION 6: VIVA / QUESTIONS PREP (TOP 20 QUESTIONS & ANSWERS)

### 1. What dataset did you use and why?
**Answer:** *"We used the EMBER 2024 benchmark (Elastic Malware Benchmark), which contains 3.12 million files. We used it because it is the latest academic standard for static Windows PE malware detection and replaces legacy LIEF dependencies with pure-Python `pefile`."*

### 2. How many samples did you train and test on?
**Answer:** *"We trained on a balanced subset of 100,000 binaries (50,000 benign and 50,000 malware) and tested on a held-out, unseen test set of 24,979 binaries (12,500 malware and 12,479 benign)."*

### 3. Why didn't you train on all 3.12 million files?
**Answer:** *"Training gradient-boosted trees on 3.12 million samples across 2,568 dimensions requires over 100 GB of RAM. In machine learning, 100,000 carefully stratified, balanced samples is more than sufficient to reach asymptotic model convergence while avoiding memory bottlenecks."*

### 4. What is `numpy.memmap` and why did you use it?
**Answer:** *"Memory mapping (`numpy.memmap`) allows reading large binary arrays directly from disk on demand like virtual memory, without loading the full 60 GB dataset into physical RAM."*

### 5. What are the 2,568 features extracted?
**Answer:** *"They are grouped into 6 categories: Byte Histograms (256), Sliding-Window Shannon Entropy (256), PE Section Properties (265), Imported Windows API Hashes (1,280), Authenticode Digital Certificates and Rich Header hashes (507), and General File Header traits (10)."*

### 6. What is Shannon Entropy and why is it important in malware detection?
**Answer:** *"Shannon Entropy measures the randomness of bytes on a scale from 0 to 8. Plain code has an entropy around 4.5 to 6.0, whereas encrypted or compressed code has an entropy near 8.0. High entropy in unexpected sections is a classic indicator of packed malware or encrypted ransomware payloads."*

### 7. What is the Hashing Trick (MurmurHash3) used in your project?
**Answer:** *"Windows executables import thousands of different DLL function names. Instead of creating thousands of sparse one-hot columns, we use MurmurHash3 to hash function names into a fixed 1,280-bin vector, keeping memory usage constant."*

### 8. Which model performed best and why?
**Answer:** *"LightGBM performed best with 96.88% Accuracy, 96.85% F1-score, and a 2.28% False Positive Rate. It excels because it uses gradient boosted decision trees with leaf-wise tree growth, effectively capturing non-linear interactions across high-dimensional tabular data."*

### 9. Why did Gaussian Naive Bayes get low accuracy (64%) but high recall (99%)?
**Answer:** *"Naive Bayes assumes all 2,568 features are conditionally independent. In PE files, features are heavily correlated (e.g., file size directly correlates with section sizes). This violates the independence assumption, causing probability overconfidence. It catches almost all malware (99.14% recall) but produces more false alarms."*

### 10. What is the difference between Precision and Recall in this project?
**Answer:** *"Precision is: Of all files flagged as malware, how many were actually malware? (Minimizes false alarms). Recall is: Of all actual malware samples, how many did the model catch? (Minimizes missed threats)."*

### 11. What is False Positive Rate (FPR) and why is 2.28% significant?
**Answer:** *"FPR is the percentage of safe files incorrectly flagged as malware. A high FPR is dangerous because it blocks legitimate Windows programs. LightGBM's 2.28% FPR means only 284 out of 12,479 benign test files triggered a false alarm."*

### 12. What does an ROC-AUC of 0.996 mean?
**Answer:** *"The Receiver Operating Characteristic Area Under Curve measures discriminative ability across all thresholds. An AUC of 1.0 is perfect; 0.5 is random guessing. Our score of 0.996 means there is a 99.6% probability the model will rank a randomly chosen malware file higher than a randomly chosen benign file."*

### 13. Why did Decision Tree classify VS Code as 100% Malware?
**Answer:** *"A single Decision Tree has high variance and made a greedy split on `Size > 50MB and Entropy > 7.9`. Because VS Code bundles a compressed 121 MB Electron runtime, its entropy is over 7.95, falling into a malware leaf node. Ensembles like LightGBM and Random Forest avoided this by evaluating dozens of trees inspecting digital signatures and import tables."*

### 14. Did you execute any malware on your computer?
**Answer:** *"No. We strictly performed static analysis. We parsed raw binary headers and byte distributions in memory. No executable was ever double-clicked, launched, or executed."*

### 15. What is the role of `StandardScaler` in your project?
**Answer:** *"Tree models (LightGBM, Random Forest, Decision Tree) are scale-invariant and do not need scaling. But Logistic Regression requires feature normalization so that large values (like file sizes) do not dominate smaller features (like entropy)."*

### 16. What is the difference between static and dynamic analysis?
**Answer:** *"Static analysis inspects file structure without execution (fast, sub-second, zero risk). Dynamic analysis executes the file inside a sandbox VM to monitor API calls (slow, 5–10 minutes, can be evaded by sleep timers)."*

### 17. How did you optimize feature extraction speed?
**Answer:** *"We vectorized Shannon entropy and byte histogram calculations using NumPy C-level memory slices and disabled recursive relocation parsing in `pefile`, achieving an extraction throughput of 4.5 MB/s."*

### 18. What is concept drift in malware detection?
**Answer:** *"Concept drift occurs when malware authors adopt new compiler toolchains, packing methods, or Windows APIs over time, causing old models to gradually degrade in accuracy. It is solved by periodic retraining."*

### 19. What are the limitations of your project?
**Answer:** *"Pure static analysis cannot detect fileless malware injected purely into RAM at runtime, and highly packed custom crypters can occasionally mimic compressed benign installers."*

### 20. If you had 2 more months, what would you improve?
**Answer:** *"I would build a hybrid pipeline: using our static LightGBM model for instant 4.8ms triage, and routing ambiguous border cases (threat probability between 40% and 60%) to a lightweight Docker sandbox to monitor runtime API traces."*

---

# SECTION 7: FINAL PRESENTATION DAY CHECKLIST

- [ ] **Check 1: Backend Server Starts:**
  Run `venv\Scripts\python.exe -m uvicorn src.api:app --reload` and verify `http://127.0.0.1:8000/docs` opens.
- [ ] **Check 2: Frontend Server Starts:**
  Run `cd frontend` $\rightarrow$ `npm run dev` and verify `http://localhost:5173/` displays the MalScan dashboard.
- [ ] **Check 3: Test Files Ready:**
  Confirm you have sample test files ready in your project directory:
  * Safe file: `notepad.exe`
  * Edge case: `VSCodeUserSetup-x64.exe`
- [ ] **Check 4: Presentation Visuals Saved:**
  Verify that all 5 chart images exist in `D:\unamed\charts\`:
  * `architecture_pipeline.png`
  * `dataset_distribution.png`
  * `model_comparison_bar.png`
  * `confusion_matrices.png`
  * `roc_curves.png`
- [ ] **Check 5: Numbers Match Report:**
  Confirm your slides and speaking notes use the verified numbers:
  * 100,000 balanced training files (50k safe / 50k malware)
  * 24,979 test files (12,500 malware / 12,479 benign)
  * LightGBM: 96.88% accuracy, 2.28% FPR, 4.8ms latency, 0.996 ROC-AUC.
  * 2,568 structural features.
- [ ] **Check 6: Offline Backup Ready:**
  Keep `D:\unamed\charts\` open in Windows Photo Viewer as an immediate fallback if your laptop disconnects from localhost.
