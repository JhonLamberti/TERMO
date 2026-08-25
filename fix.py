import sys

def main():
    with open('src/App.tsx', 'r') as f:
        content = f.read()
    
    content = content.replace("FileCheck,\n  Download className", "FileCheck className")
    
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Fixed")

if __name__ == '__main__':
    main()
