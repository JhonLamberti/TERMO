import sys

def main():
    with open('src/App.tsx', 'r') as f:
        lines = f.readlines()

    idx = -1
    for i, line in enumerate(lines):
        if "<span>Imprimir PDF</span>" in line:
            idx = i
            break
            
    if idx != -1:
        # insert after the button closure (i.e. idx+2)
        btn = """              <button
                onClick={handleExportWord}
                className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs cursor-pointer shadow-sm shadow-blue-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Word</span>
              </button>
"""
        new_lines = lines[:idx+2] + [btn] + lines[idx+2:]
        with open('src/App.tsx', 'w') as f:
            f.writelines(new_lines)
        print("Success")

if __name__ == '__main__':
    main()
