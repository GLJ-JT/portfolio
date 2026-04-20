import json

with open('data/resume.json', 'r') as f:
    d = json.load(f)

d['personal']['title'] = d['personal'].pop('role', 'Product Designer')
d['personal']['contact'] = {
    "email": d['personal'].pop('email', "joe.tianchen.tao@gmail.com"),
    "phone": d['personal'].pop('phone', "+44 7404 641 570"),
    "linkedin": d['personal'].pop('linkedin', "www.linkedin.com/in/joetao"),
    "github": d['personal'].pop('github', "github.com/GLJ-JT"),
    "acm": d['personal'].pop('acm', "dl.acm.org/profile/99661638444")
}

with open('data/resume.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
