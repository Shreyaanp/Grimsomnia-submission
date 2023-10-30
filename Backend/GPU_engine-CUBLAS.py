import subprocess

# Define the shell command to run
command = 'CMAKE_ARGS="-DLLAMA_CUBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python --no-cache-dir'

# Execute the shell command
try:
    subprocess.run(command, shell=True, check=True)
    print("Successfully installed llama-cpp-python.")
except subprocess.CalledProcessError as e:
    print(f"An error occurred: {e}")
