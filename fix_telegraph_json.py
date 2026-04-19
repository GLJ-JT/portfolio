import json

with open('data/resume_telegraph.json', 'r') as f:
    d = json.load(f)

d['summary'] = "Digital Product Designer with 5 years building story-led platforms and high-conversion campaign experiences across the UK and China. Proven track record of leveraging Framer to ship interactive interfaces end-to-end, multiplying engagement and scaling commercial workflows without agency support. Academic methodologies presented at <a href=\"https://dl.acm.org/doi/10.1145/3729176.3729187\" target=\"_blank\" class=\"playful-link\">ACM CHIWORK '25</a>."

with open('data/resume_telegraph.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
