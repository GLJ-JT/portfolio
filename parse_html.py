import json, re

with open('data/projects.json', 'r') as f:
    data = json.load(f)

html_map = {
    'Worldschooling': 'Worldschooling.html',
    'Travel to Qin': 'Traveltoqin.html',
    'Dēpology': 'Depology.html',
    'TUTU FUTURE': 'TUTUFUTURE.html',
    'Stair. Aid': 'STAIRAID.html'
}

for proj in data:
    title = proj.get('title')
    html_file = html_map.get(title)
    if not html_file: continue
    
    with open('assets/case_study_page_html/' + html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = re.sub(r'<script.*?</script>', '', html, flags=re.DOTALL|re.IGNORECASE)
    html = re.sub(r'<style.*?</style>', '', html, flags=re.DOTALL|re.IGNORECASE)
    html = re.sub(r'<svg.*?</svg>', '', html, flags=re.DOTALL|re.IGNORECASE)
    
    blocks = []
    parts = re.split(r'(<img[^>]+>)', html, flags=re.IGNORECASE)
    for part in parts:
        if part.lower().startswith('<img'):
            src = re.search(r'src=\"([^\"]+)\"', part)
            if src:
                s = src.group(1).split('/')[-1]
                if s and 'background' not in s and 'data:image' not in s and 'Tutu' not in s:
                    blocks.append({'type': 'img', 'val': s})
        else:
            text = re.sub(r'<[^>]+>', ' ', part)
            text = re.sub(r'\s+', ' ', text).strip()
            if len(text) > 40:
                blocks.append({'type': 'text', 'val': text})
                
    print(f"\n======== {title} ========")
    print(f"Body paras: {len(proj.get('body', []))} | Images: {len(proj.get('images', []))}")
    for b in blocks:
        if b['type'] == 'text':
            match_para = -1
            for i, p in enumerate(proj.get('body', [])):
                if p[:30].lower() in b['val'].lower():
                    match_para = i
            match_cap = -1
            for i, img in enumerate(proj.get('images', [])):
                if img.get('caption') and img['caption'][:30].lower() in b['val'].lower():
                    match_cap = i
            print(f"[TEXT] (para:{match_para}, cap:{match_cap}) {b['val'][:60]}...")
        else:
            print(f"[IMG] {b['val']}")

