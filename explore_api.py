import thrember
import inspect

print("--- THREMBER API ---")
for name, obj in inspect.getmembers(thrember):
    if inspect.isfunction(obj) or inspect.isclass(obj):
        print(f"{name}: {type(obj)}")

print("\n--- ARGUMENTS FOR download_dataset ---")
if hasattr(thrember, 'download_dataset'):
    print(inspect.signature(thrember.download_dataset))

print("\n--- ARGUMENTS FOR read_vectorized_features ---")
if hasattr(thrember, 'read_vectorized_features'):
    print(inspect.signature(thrember.read_vectorized_features))
