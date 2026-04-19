import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

# Remove generic existing xstar if somehow added
d = [p for p in d if p['id'] != 'xstar']

xstar = {
    "id": "xstar",
    "title": "X Star Production",
    "subtitle": "A premium, story-led digital platform built entirely in Framer from concept to live production in just two weeks. Designed to amplify international theatrical exchange and showcase West End productions through engaging, interactive visual design.",
    "year": "2024",
    "timeframe": "2 weeks",
    "tools": ["Framer", "Digital Design", "End-to-End Build"],
    "category": "Story-Led Framer Experience",
    "links": {
        "live": "https://www.xstarproduction.com/"
    },
    "hero_image": "assets/placeholder.png", 
    "problem": "",
    "solution": "",
    "content": []
}

# Insert at top
d.insert(0, xstar)

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
