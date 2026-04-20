for file in ['index.html', 'new/index.html']:
    with open(file, 'r') as f:
        content = f.read()
    
    content = content.replace('href="assets/joetao_cv.docx"', 'href="assets/Joe_Tao_Resume.pdf"')
    # or handle the path change for new/index.html
    content = content.replace('href="../assets/joetao_cv.docx"', 'href="../assets/Joe_Tao_Resume.pdf"')

    with open(file, 'w') as f:
        f.write(content)

print("done")
