import sys

def main():
    with open('src/App.tsx', 'r') as f:
        lines = f.readlines()

    idx = -1
    for i, line in enumerate(lines):
        if "<span>Imprimir / Salvar PDF</span>" in line:
            idx = i
            break
            
    if idx != -1:
        # insert after the button closure (i.e. idx+2)
        btn = """          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-blue-600/30 cursor-pointer ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Word</span>
          </button>
"""
        new_lines = lines[:idx+2] + [btn] + lines[idx+2:]
        with open('src/App.tsx', 'w') as f:
            f.writelines(new_lines)
        print("Success")

if __name__ == '__main__':
    main()
