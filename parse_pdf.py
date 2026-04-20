import PyPDF2
def extract_text():
    with open('assets/Worldover_prototype.pdf', 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        for page_num in range(len(reader.pages)):
            print(f"--- Page {page_num+1} ---")
            print(reader.pages[page_num].extract_text())
extract_text()
