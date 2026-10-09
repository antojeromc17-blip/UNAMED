"""
PHASE 0 — Feasibility Check
Prove that thrember's PEFeatureExtractor can extract features from a benign .exe.

SAFETY: We ONLY read bytes from a COPY of a system file. We never execute it.
"""
import os
import shutil
import thrember
import numpy as np

# Step 1: Copy a benign .exe from System32 into our test folder
# (We never touch the original)
TEST_DIR = os.path.join(os.path.dirname(__file__), "test_files")
os.makedirs(TEST_DIR, exist_ok=True)

SOURCE_EXE = r"C:\Windows\System32\notepad.exe"
TEST_EXE = os.path.join(TEST_DIR, "notepad_copy.exe")

if not os.path.exists(TEST_EXE):
    shutil.copy2(SOURCE_EXE, TEST_EXE)
    print(f"Copied {SOURCE_EXE} -> {TEST_EXE}")

# Step 2: Read the raw bytes (NEVER execute the file)
with open(TEST_EXE, "rb") as f:
    file_bytes = f.read()

print(f"File size: {len(file_bytes):,} bytes")

# Step 3: Check MZ header (first 2 bytes of any valid PE file)
assert file_bytes[:2] == b"MZ", "Not a valid PE file!"
print("MZ header check: PASSED OK")

# Step 4: Extract features using thrember
extractor = thrember.PEFeatureExtractor()
raw_features = extractor.raw_features(file_bytes)
feature_vector = extractor.process_raw_features(raw_features)

print(f"Feature vector shape: {feature_vector.shape}")
print(f"Feature vector length: {len(feature_vector)}")
print(f"Feature vector dtype: {feature_vector.dtype}")
print(f"Non-zero features: {np.count_nonzero(feature_vector)}")
print(f"Sample values (first 10): {feature_vector[:10]}")

# Step 5: Verify expected length
# thrember (EMBER feature v3) produces 2568-dimensional vectors for PE files
EXPECTED_LENGTH = 2568
if len(feature_vector) == EXPECTED_LENGTH:
    print(f"\nSUCCESS: Feature vector has {EXPECTED_LENGTH} dimensions as expected!")
else:
    print(f"\nWARNING: Feature vector has {len(feature_vector)} dimensions (expected {EXPECTED_LENGTH})")
    print("This is OK — just note the actual dimension for later phases.")

# Record the actual length for later use
ACTUAL_FEATURE_DIM = len(feature_vector)
print(f"\nACTUAL_FEATURE_DIM = {ACTUAL_FEATURE_DIM}")
print("\nPhase 0 PASSED - thrember feature extraction works!")
