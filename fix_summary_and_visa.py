import json

# Update original resume.json summary
with open('data/resume.json', 'r') as f:
    d = json.load(f)

d['summary'] = "Product designer based in London, with 3 years shipping research-led, mobile-first product across the UK and China. I work across the full design lifecycle, with particular strength in design systems and conversion UX. UCL MSc in Human-Computer Interaction (Distinction); research presented at <a href=\"https://dl.acm.org/doi/10.1145/3729176.3729187\" target=\"_blank\" class=\"playful-link\">ACM CHIWORK '25</a>. Available for UK roles, on-site or hybrid."

with open('data/resume.json', 'w') as f:
    json.dump(d, f, indent=2)

# Update HTML files
for file in ['index.html', 'new/index.html']:
    with open(file, 'r') as f:
        content = f.read()
    
    content = content.replace("Visa Sponsorship Required", "Available to Start Immediately")
    
    with open(file, 'w') as f:
        f.write(content)

print("done")
