import json
with open('data/resume.json', 'r') as f:
    r = json.load(f)

r['personal']['summary'] = "Right to Work: Skilled Worker visa sponsorship required\n\nUCL MSc Human-Computer Interaction (Distinction) with 5 years delivering product design across growth, conversion, and UX for digital businesses in the UK and China. Track record: 2x CVR, 70% operational cost reduction via AI systems, platforms shipped from zero without agency support. Research at <a href=\"https://dl.acm.org/doi/10.1145/3729176.3729187\" target=\"_blank\" class=\"playful-link\">ACM CHIWORK '25</a>; pitched to <a href=\"https://www.linkedin.com/posts/joetao_ucl-google-ux-activity-7078363639639875584-g6hx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC3a6GwBTCX46eFYB9FZpsobBCNbKSxzjj4\" target=\"_blank\" class=\"playful-link\">Google</a>. Fluent in AI-accelerated design."

with open('data/resume.json', 'w') as f:
    json.dump(r, f, indent=2)
