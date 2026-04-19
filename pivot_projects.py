import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

# Update existing projects
for p in d:
    if p['id'] == 'worldschooling':
        p['category'] = '0-to-1 Product Framework & GTM Execution'
        p.setdefault('links', {})['live'] = 'https://worldschooling.co.uk'
    if p['id'] == 'traveltoqin':
        p.setdefault('links', {})['live'] = 'https://traveltoqin.com'
    if p['id'] == 'depology':
        p.setdefault('links', {})['live'] = 'https://depology.com'

# Add newly requested non-clickable cards
nihao = {
    "id": "nihaoserica",
    "title": "Nihao Serica",
    "subtitle": "End-to-end framework delivery encompassing core user experience, digital identity, and structural GTM rollout.",
    "year": "2024",
    "timeframe": "12 weeks",
    "tools": ["Framer", "Figma", "React"],
    "category": "0-to-1 Product Framework & GTM Execution",
    "links": {
        "live": "https://nihaoserica.com"
    },
    "hero_image": "assets/case_study_images_traveltoqin/brand_identity_system.png", 
    "problem": "",
    "solution": "",
    "content": []
}

worldover = {
    "id": "worldover",
    "title": "Worldover.io",
    "subtitle": "Advanced architectural UI assignments mapping compliance metrics into scalable, scannable data visualization dashboards.",
    "year": "2024",
    "timeframe": "1 week",
    "tools": ["Figma", "Design Systems"],
    "category": "Compliance SaaS Architecture & UI Systems",
    "links": {
        "live": "https://worldover.io"
    },
    "hero_image": "assets/case_study_images_depology/desktop_mega_menu_layout.png", 
    "problem": "",
    "solution": "",
    "content": []
}

# Ensure no duplicates if running twice
d = [p for p in d if p['id'] not in ['nihaoserica', 'worldover']]

d.insert(1, worldover)
d.insert(3, nihao)

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
