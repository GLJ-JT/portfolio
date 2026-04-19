import json

with open('data/resume.json', 'r') as f:
    r = json.load(f)

r['personal']['summary'] = "Senior Product Designer with 5 years driving end-to-end UX architecture and conversion growth across the UK and China. Proven track record of leveraging AI-accelerated frameworks to ship zero-to-one platforms, multiplying CVR by 2x, and slashing operational costs by 70%. Academic methodologies presented at <a href=\"https://dl.acm.org/doi/10.1145/3729176.3729187\" target=\"_blank\" class=\"playful-link\">ACM CHIWORK '25</a> and pitched to <a href=\"https://www.linkedin.com/posts/joetao_ucl-google-ux-activity-7078363639639875584-g6hx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC3a6GwBTCX46eFYB9FZpsobBCNbKSxzjj4\" target=\"_blank\" class=\"playful-link\">Google</a>."

with open('data/resume.json', 'w') as f:
    json.dump(r, f, indent=2)

print("Done")
