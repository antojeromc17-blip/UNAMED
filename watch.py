
import sys, time

log_file = r"C:\Users\antoj\.gemini\antigravity-ide\brain\e58d91ad-5379-45ee-a449-f744883e83d2\.system_generated\tasks\task-562.log"

with open(log_file, "r", encoding="utf-8", errors="ignore") as f:
    buffer = ""
    while True:
        char = f.read(1)
        if not char:
            time.sleep(0.1)
            continue
            
        if char == "\r" or char == "\n":
            if "%|" in buffer:
                sys.stdout.write("\r" + buffer.ljust(80))
                sys.stdout.flush()
            elif buffer.strip() != "":
                sys.stdout.write("\n" + buffer)
                sys.stdout.flush()
            buffer = ""
        else:
            buffer += char

