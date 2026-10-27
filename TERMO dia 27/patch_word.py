import sys

def main():
    with open('src/App.tsx', 'r') as f:
        lines = f.readlines()

    idx = -1
    for i, line in enumerate(lines):
        if "const handlePrint = () => {" in line:
            idx = i
            break
            
    if idx != -1:
        export_fn = """  const handleExportWord = () => {
    const printableContent = document.getElementById('printable-content');
    if (!printableContent) return;

    const htmlContent = printableContent.innerHTML;
    
    const documentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${state.codigo || 'Documento'}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            td, th { border: 1px solid #ccc; padding: 6px; text-align: left; }
            .font-bold { font-weight: bold; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .w-full { width: 100%; }
            h2 { font-size: 16px; text-align: center; margin-top: 20px; margin-bottom: 20px; }
            h3 { font-size: 14px; margin-top: 15px; margin-bottom: 10px; }
            ul { margin: 0; padding-left: 20px; }
            p { margin-bottom: 10px; line-height: 1.5; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const blob = new Blob(['\\ufeff', documentHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Documento_FTA_${state.codigo || 'Termo'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

"""
        new_lines = lines[:idx] + [export_fn] + lines[idx:]
        with open('src/App.tsx', 'w') as f:
            f.writelines(new_lines)
        print("Success")

if __name__ == '__main__':
    main()
