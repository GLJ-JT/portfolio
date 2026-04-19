import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

for p in d:
    if p['id'] in ['nihaoserica', 'worldover']:
        p['hero_image'] = 'assets/placeholder.png'

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
