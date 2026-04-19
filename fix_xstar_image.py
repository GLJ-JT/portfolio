import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

for p in d:
    if p['id'] == 'xstar':
        p['hero_image'] = 'assets/case_study_images_xstar/cover_image.png'

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
