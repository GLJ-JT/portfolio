import json

# Fix JSON files
for file in ['data/resume.json', 'data/resume_telegraph.json']:
    with open(file, 'r') as f:
        content = f.read()
    
    content = content.replace("5 years", "3 years")
    
    with open(file, 'w') as f:
        f.write(content)

# Fix HTML files
for file in ['index.html', 'new/index.html']:
    with open(file, 'r') as f:
        content = f.read()
    
    content = content.replace("5 years", "3 years")
    content = content.replace("5+ years", "3+ years")
    
    with open(file, 'w') as f:
        f.write(content)

print("done")
