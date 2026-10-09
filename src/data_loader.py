"""
data_loader.py - Load and prepare the EMBER2024 dataset.

This module downloads the vectorized features for Win32 files,
removes unlabeled samples, and creates balanced subsets for training.
"""
import os
import numpy as np
import thrember

# ---- CONFIGURATION ----
PROJECT_ROOT = os.path.join(os.path.dirname(__file__), "..")
DATA_DIR = os.path.join(PROJECT_ROOT, "data", "ember2024")
TRAIN_SUBSET_SIZE = 100_000   # Total balanced training samples
RANDOM_SEED = 42

os.makedirs(DATA_DIR, exist_ok=True)

def download_and_load_data():
    """
    Download EMBER2024 Win32 features and load them.
    We use only 'Win32' to save download time and disk space.
    """
    print("Creating vectorized features from raw JSONL files...")
    if not os.path.exists(os.path.join(DATA_DIR, "X_train.dat")):
        thrember.create_vectorized_features(DATA_DIR)
    else:
        print("Vectorized .dat files already exist, skipping vectorization.")

    import numpy as np
    
    ndim = 2568
    print("Manually loading training features via memmap to save RAM...")
    
    x_path = os.path.join(DATA_DIR, 'X_train.dat')
    y_path = os.path.join(DATA_DIR, 'y_train.dat')
    
    # Calculate number of samples based on file size
    train_size = os.path.getsize(x_path) // (ndim * 4) # float32 = 4 bytes
    
    # Load as memory map
    X_train_memmap = np.memmap(x_path, dtype=np.float32, mode='r', shape=(train_size, ndim))
    y_train_memmap = np.memmap(y_path, dtype=np.int32, mode='r', shape=(train_size,))
    
    # Instead of returning 3 million rows (30 GB), we sample 100k right now
    print(f"Total training samples available: {train_size:,}. Randomly selecting 100,000...")
    np.random.seed(42)
    indices = np.random.choice(train_size, 100000, replace=False)
    
    X_train = np.array(X_train_memmap[indices])
    y_train = np.array(y_train_memmap[indices])
    
    # Do the same for test set (25k)
    print("Manually loading test features via memmap...")
    x_test_path = os.path.join(DATA_DIR, 'X_test.dat')
    y_test_path = os.path.join(DATA_DIR, 'y_test.dat')
    
    if os.path.exists(x_test_path):
        test_size = os.path.getsize(x_test_path) // (ndim * 4)
        X_test_memmap = np.memmap(x_test_path, dtype=np.float32, mode='r', shape=(test_size, ndim))
        y_test_memmap = np.memmap(y_test_path, dtype=np.int32, mode='r', shape=(test_size,))
        
        print(f"Total test samples available: {test_size:,}. Randomly selecting 25,000...")
        test_indices = np.random.choice(test_size, min(25000, test_size), replace=False)
        X_test = np.array(X_test_memmap[test_indices])
        y_test = np.array(y_test_memmap[test_indices])
    else:
        X_test, y_test = None, None
        
    return X_train, y_train, X_test, y_test


def remove_unlabeled(X, y):
    """Remove samples with label = -1 (unlabeled)."""
    if X is None or y is None:
        return None, None
    mask = y != -1
    X_clean = X[mask]
    y_clean = y[mask]
    removed = (~mask).sum()
    print(f"Removed {removed:,} unlabeled samples (label=-1)")
    return X_clean, y_clean


def create_balanced_subset(X, y, total_size=TRAIN_SUBSET_SIZE, seed=RANDOM_SEED):
    """Create a balanced subset with equal malicious and benign samples."""
    half = total_size // 2
    
    # Separate indices by class
    benign_idx = np.where(y == 0)[0]
    malicious_idx = np.where(y == 1)[0]
    
    print(f"Available: {len(benign_idx):,} benign, {len(malicious_idx):,} malicious")
    
    # Randomly sample 'half' from each class
    np.random.seed(seed)
    benign_sample = np.random.choice(benign_idx, size=min(half, len(benign_idx)), replace=False)
    malicious_sample = np.random.choice(malicious_idx, size=min(half, len(malicious_idx)), replace=False)
    
    # Combine and shuffle
    selected = np.concatenate([benign_sample, malicious_sample])
    np.random.shuffle(selected)
    
    X_balanced = X[selected]
    y_balanced = y[selected]
    
    actual_benign = (y_balanced == 0).sum()
    actual_malicious = (y_balanced == 1).sum()
    print(f"Balanced subset: {actual_benign:,} benign + {actual_malicious:,} malicious = {len(y_balanced):,} total")
    
    return X_balanced, y_balanced


def get_data_summary(X_train, y_train, X_test, y_test):
    """Print a summary of the dataset."""
    print("\n" + "="*60)
    print("DATASET SUMMARY")
    print("="*60)
    print(f"Training samples:     {X_train.shape[0]:,}")
    print(f"  - Benign (0):       {(y_train == 0).sum():,}")
    print(f"  - Malicious (1):    {(y_train == 1).sum():,}")
    if X_test is not None:
        print(f"Test samples:         {X_test.shape[0]:,}")
        print(f"  - Benign (0):       {(y_test == 0).sum():,}")
        print(f"  - Malicious (1):    {(y_test == 1).sum():,}")
    print(f"Feature dimensions:   {X_train.shape[1]}")
    print("="*60)


if __name__ == "__main__":
    X_train, y_train, X_test, y_test = download_and_load_data()
    X_train, y_train = remove_unlabeled(X_train, y_train)
    X_test, y_test = remove_unlabeled(X_test, y_test)
    
    # Fallback if test set isn't available
    if X_test is None:
        print("\nCreating synthetic test split from training data...")
        from sklearn.model_selection import train_test_split
        X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, test_size=0.2, random_state=42)
        
    get_data_summary(X_train, y_train, X_test, y_test)
    
    # Create balanced subsets
    X_train_bal, y_train_bal = create_balanced_subset(X_train, y_train, total_size=TRAIN_SUBSET_SIZE)
    X_test_bal, y_test_bal = create_balanced_subset(X_test, y_test, total_size=TRAIN_SUBSET_SIZE // 4)
    
    # Save balanced subset for fast loading
    SUBSET_DIR = os.path.join(DATA_DIR, "subset")
    os.makedirs(SUBSET_DIR, exist_ok=True)
    np.save(os.path.join(SUBSET_DIR, "X_train.npy"), X_train_bal)
    np.save(os.path.join(SUBSET_DIR, "y_train.npy"), y_train_bal)
    np.save(os.path.join(SUBSET_DIR, "X_test.npy"), X_test_bal)
    np.save(os.path.join(SUBSET_DIR, "y_test.npy"), y_test_bal)
    print(f"\nBalanced subsets saved to: {SUBSET_DIR}")
