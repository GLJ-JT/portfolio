import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

for p in d:
    if p['id'] == 'xstar':
        p['subtitle'] = "A story-led theatrical platform built natively in Framer. Delivered from concept to live production in just two weeks."

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
