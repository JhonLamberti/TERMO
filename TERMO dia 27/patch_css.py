import sys

def main():
    with open('src/index.css', 'r') as f:
        content = f.read()
    
    if '@page' not in content:
        content += "\n@page {\n  margin: 0;\n  size: A4;\n}\n"
        
    with open('src/index.css', 'w') as f:
        f.write(content)
    print("CSS Patched")

if __name__ == '__main__':
    main()
