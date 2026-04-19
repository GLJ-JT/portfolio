import json, re, os
from bs4 import BeautifulSoup

with open('data/projects.json', 'r') as f:
    projects = json.load(f)

html_map = {
    'Worldschooling': 'Worldschooling.html',
    'Travel to Qin': 'Traveltoqin.html',
    'Dēpology': 'Depology.html',
    'TUTU FUTURE': 'TUTUFUTURE.html',
    'Stair. Aid': 'STAIRAID.html'
}

for proj in projects:
    title = proj.get('title')
    html_file = html_map.get(title)
    if not html_file: continue
    
    html_path = os.path.join('assets/case_study_page_html', html_file)
    if not os.path.exists(html_path): continue
        
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        
    # Find all useful nodes sequentially:
    # A paragraph usually sits in a div or p. 
    # An image sits in an img tag.
    # Framer renders images as <img src="..."> usually.
    # We will traverse the DOM tree looking for text strings that match our body and captions, and images.
    
    # We can just extract text of all elements and src of all imgs in doc order.
    blocks = []
    for el in soup.find_all(lambda tag: tag.name == 'img' or (tag.name in ['div', 'span', 'p'] and not tag.find_all(recursive=False))):
        if el.name == 'img':
            src = el.get('src', '')
            filename = src.split('/')[-1]
            if filename and 'icon' not in filename and 'background' not in filename and 'data:image' not in filename and 'logo' not in filename.lower():
                blocks.append({'type': 'img', 'val': filename})
        else:
            text = el.get_text(strip=True)
            if len(text) > 40:
                blocks.append({'type': 'text', 'val': text})
    
    print(f"\n==== {title} ====")
    print("Blocks found:")
    for b in blocks:
        pass # we can process here

