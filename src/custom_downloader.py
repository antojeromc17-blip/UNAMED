import os
import time
import requests
from tqdm import tqdm
import zipfile

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "ember2024")
os.makedirs(DATA_DIR, exist_ok=True)

FILES = ["Win32_train.zip", "Win32_test.zip"]

def download_file_resumable(url, filepath):
    # Get total file size
    response = requests.head(url, allow_redirects=True)
    total_size = int(response.headers.get('content-length', 0))
    
    # Check current downloaded size
    initial_pos = 0
    if os.path.exists(filepath):
        initial_pos = os.path.getsize(filepath)
        
    if initial_pos >= total_size and total_size > 0:
        print(f"{os.path.basename(filepath)} is already fully downloaded.")
        return
        
    print(f"Resuming {os.path.basename(filepath)} from {initial_pos / (1024*1024):.1f} MB...")
    headers = {'Range': f'bytes={initial_pos}-'}
    
    with requests.get(url, headers=headers, stream=True, allow_redirects=True) as r:
        r.raise_for_status()
        
        # Determine whether to append or write new
        mode = 'ab' if initial_pos > 0 else 'wb'
        
        last_print = time.time()
        with open(filepath, mode) as f, tqdm(
            desc=os.path.basename(filepath),
            initial=initial_pos,
            total=total_size,
            unit='iB',
            unit_scale=True,
            unit_divisor=1024,
        ) as bar:
            for chunk in r.iter_content(chunk_size=1024*1024):
                if chunk:
                    size = f.write(chunk)
                    bar.update(size)
                    
                    # Throttle print output
                    current = time.time()
                    if current - last_print > 2.0:
                        print(f"Progress: {bar.n / (1024*1024):.1f} MB / {total_size / (1024*1024):.1f} MB", flush=True)
                        last_print = current

def main():
    for file in FILES:
        url = f"https://huggingface.co/datasets/joyce8/EMBER2024/resolve/main/{file}"
        zip_path = os.path.join(DATA_DIR, file)
        
        success = False
        while not success:
            try:
                download_file_resumable(url, zip_path)
                success = True
            except requests.exceptions.RequestException as e:
                print(f"\nNetwork error: {e}. Retrying in 5 seconds...")
                time.sleep(5)
            except Exception as e:
                print(f"\nUnexpected error: {e}. Retrying in 5 seconds...")
                time.sleep(5)
                
        print(f"Download complete: {file}")

if __name__ == "__main__":
    main()
