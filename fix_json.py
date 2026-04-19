import json

with open('data/projects.json', 'r') as f:
    data = json.load(f)

for proj in data:
    body = proj.get('body', [])
    images = proj.get('images', [])
    content = []
    
    # We will build content by looking at how they map in standard UX case studies.
    # We will just put all paragraphs first, or interleave depending on the case.
    
    if proj['title'] == 'Worldschooling':
        # HTML: 
        # IMG 0 (no caption)
        # TEXT The design process... (para 1)
        # IMG 1 (cap 0: The simplified user journey...)
        # IMG 2 (cap 1: The homepage category selector...)
        # IMG 3 (cap 2: Strategic upsell...)
        # TEXT The real innovation... (para 2)
        # TEXT The results validated... (para 3)
        # IMG 4...
        content.append({"type": "paragraph", "value": body[0]})
        content.append({"type": "image", "src": images[0]['src'], "caption": images[0].get('caption', '')})
        content.append({"type": "paragraph", "value": body[1]})
        content.append({"type": "image", "src": images[1]['src'], "caption": images[1].get('caption', '')})
        content.append({"type": "paragraph", "value": body[2]})
        content.append({"type": "image", "src": images[2]['src'], "caption": images[2].get('caption', '')})
        content.append({"type": "paragraph", "value": body[3]})
        for img in images[3:]:
            content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})

    elif proj['title'] == 'Travel to Qin':
        content.append({"type": "paragraph", "value": body[0]})
        content.append({"type": "image", "src": images[0]['src'], "caption": images[0].get('caption', '')})
        content.append({"type": "paragraph", "value": body[1]})
        content.append({"type": "image", "src": images[1]['src'], "caption": images[1].get('caption', '')})
        content.append({"type": "paragraph", "value": body[2]})
        content.append({"type": "image", "src": images[2]['src'], "caption": images[2].get('caption', '')})
        content.append({"type": "paragraph", "value": body[3]})
        for img in images[3:]:
             content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})

    elif proj['title'] == 'Dēpology':
        content.append({"type": "paragraph", "value": body[0]})
        content.append({"type": "image", "src": images[0]['src'], "caption": images[0].get('caption', '')})
        content.append({"type": "paragraph", "value": body[1]})
        content.append({"type": "image", "src": images[1]['src'], "caption": images[1].get('caption', '')})
        content.append({"type": "paragraph", "value": body[2]})
        content.append({"type": "image", "src": images[2]['src'], "caption": images[2].get('caption', '')})
        content.append({"type": "paragraph", "value": body[3]})
        for img in images[3:]:
             content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})

    elif proj['title'] == 'TUTU FUTURE':
        content.append({"type": "paragraph", "value": body[0]})
        content.append({"type": "image", "src": images[0]['src'], "caption": images[0].get('caption', '')})
        content.append({"type": "paragraph", "value": body[1]})
        content.append({"type": "image", "src": images[1]['src'], "caption": images[1].get('caption', '')})
        content.append({"type": "paragraph", "value": body[2]})
        content.append({"type": "image", "src": images[2]['src'], "caption": images[2].get('caption', '')})
        content.append({"type": "paragraph", "value": body[3]})
        for img in images[3:]:
             content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})

    elif proj['title'] == 'Stair. Aid':
        # Stairaid had many images. We will interleave roughly.
        content.append({"type": "paragraph", "value": body[0]})
        content.append({"type": "image", "src": images[0]['src'], "caption": images[0].get('caption', '')})
        content.append({"type": "paragraph", "value": body[1]})
        content.append({"type": "image", "src": images[1]['src'], "caption": images[1].get('caption', '')})
        content.append({"type": "paragraph", "value": body[2]})
        content.append({"type": "image", "src": images[2]['src'], "caption": images[2].get('caption', '')})
        content.append({"type": "image", "src": images[3]['src'], "caption": images[3].get('caption', '')})
        content.append({"type": "paragraph", "value": body[3]})
        for img in images[4:]:
             content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})
             
    else:
        # Fallback
        for index, b in enumerate(body):
            content.append({"type": "paragraph", "value": b})
            if index < len(images):
                content.append({"type": "image", "src": images[index]['src'], "caption": images[index].get('caption', '')})
        for img in images[len(body):]:
             content.append({"type": "image", "src": img['src'], "caption": img.get('caption', '')})
             
    proj['content'] = content
    # We DO NOT delete body and images yet, we will just start using content in main.js.

with open('data/projects_new.json', 'w') as f:
    json.dump(data, f, indent=2)

