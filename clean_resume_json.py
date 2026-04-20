import json

for file in ['data/resume.json', 'data/resume_telegraph.json']:
    with open(file, 'r') as f:
        d = json.load(f)
    
    # In resume.json, the summary might be inside 'personal'
    if 'personal' in d and 'summary' in d['personal']:
        if file == 'data/resume.json':
            d['personal']['summary'] = "Product designer based in London, with 3 years shipping research-led, mobile-first product across the UK and China. I work across the full design lifecycle, with particular strength in design systems and conversion UX. UCL MSc in Human-Computer Interaction (Distinction); research presented at <a href=\"https://dl.acm.org/doi/10.1145/3729176.3729187\" target=\"_blank\" class=\"playful-link\">ACM CHIWORK '25</a>. Available for UK roles, on-site or hybrid."
        elif file == 'data/resume_telegraph.json':
            d['personal']['summary'] = d['personal']['summary'].replace("Senior Product Designer", "Digital Designer")

    # Remove the broken top-level summary key if I accidentally made one
    if 'summary' in d:
        del d['summary']

    with open(file, 'w') as f:
        json.dump(d, f, indent=2)

print("done")
