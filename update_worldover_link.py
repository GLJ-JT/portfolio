import json

with open('data/projects.json', 'r') as f:
    d = json.load(f)

for p in d:
    if p['id'] == 'worldover':
        p['links']['live'] = 'https://www.figma.com/proto/FNUMo16VJtQ8QJnnUhjG34/Worldover-Dashboard?node-id=87-390&p=f&viewport=347%2C265%2C0.12&t=FED1wQE35a0fpkB1-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=87%3A390&page-id=87%3A364'

with open('data/projects.json', 'w') as f:
    json.dump(d, f, indent=2)

print("done")
