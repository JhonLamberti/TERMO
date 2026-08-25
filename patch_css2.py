import sys

def main():
    with open('src/index.css', 'r') as f:
        content = f.read()
    
    # Replace the @media print completely
    import re
    # We will just rewrite the print block
    new_print_css = """
@media print {
  /* Hide all interactive non-print elements */
  nav, aside, button, header, .no-print, .save-status, .zoom-controls {
    display: none !important;
  }
  
  body, html {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
  }
  
  #root, .min-h-screen, .app-layout {
    display: block !important;
    min-height: auto !important;
    height: auto !important;
    background: white !important;
  }
  
  .stage-area {
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    overflow: visible !important;
    display: block !important;
  }
  
  #printable-content {
    transform: none !important;
    width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    display: block !important;
  }
  
  .page-break-after-always {
    page-break-after: always !important;
    break-after: page !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    min-height: 100vh !important; /* ensures it takes the full page */
  }
}

@page {
  margin: 0;
  size: A4;
}
"""
    
    content = re.sub(r'@media print\s*\{.*?\n}\s*@page\s*\{.*?\}', new_print_css.strip(), content, flags=re.DOTALL)
    
    with open('src/index.css', 'w') as f:
        f.write(content)
    print("CSS replaced")

if __name__ == '__main__':
    main()
