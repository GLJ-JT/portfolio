# Case Study Copy Audit: AI-Slop Identification

## Benchmark

Copy benchmark supplied by Joe:

> "The diagnosis moved from “which screen is underperforming?” to “which repeated decisions are users struggling to make?” I looked at how users arrived, where they paused, what they tapped, and which parts of the journey created uncertainty."

This works because it moves from a generic design problem to a concrete design investigation. It names what changed in the diagnosis, what behaviour was inspected, and what kind of uncertainty the design had to resolve. The language is plain, specific, and observable.

For this audit, "AI slop" means copy that sounds smooth but could belong to almost any case study. It usually relies on abstract nouns, oversized claims, and vague outcomes instead of user behaviour, constraints, tradeoffs, test evidence, or concrete design decisions.

## Global Patterns Found

1. Abstract nouns replacing evidence: "strategic transformation", "conversion potential", "immersive storytelling", "scalable system", "premium feel", "execution capabilities".
2. Founder or stakeholder praise used as proof: "founder was thrilled", "shareholders praised", "results validated every decision".
3. Outcome claims without measurement: "high engagement", "strong NPS", "immediate and profound", "dramatically reducing friction".
4. Grand narrative openings: "pivotal moment", "golden opportunity", "timing is everything", "challenge was one of evolution".
5. Design intent presented as user reality: "users were clicking, engaging, and discovering", "guided naturally", "experience resonated".
6. Portfolio positioning instead of case-study evidence: "end-to-end framework delivery", "production-facing interaction design", "structural GTM rollout".

The strongest passages in the portfolio behave more like Depology: they name a repeated hesitation, a user decision, a measurable constraint, or a working prototype mechanic.

## Severity Key

- P0: Damages credibility. Sounds invented, inflated, or unsupported.
- P1: Generic portfolio language. Needs rewriting into evidence and decisions.
- P2: Usable idea, but the wording needs tightening or a stronger observed anchor.
- Keep: Human enough. Retain or use as a pattern.

## Depology

Overall status: benchmark case. The standalone Depology design-system page is the closest existing copy to the target voice.

### Keep

- "The problem was not cosmetic. Customers were losing confidence across navigation, buybox, cart, and checkout."
- "The buybox was buried below decision-heavy content, while navigation attracted attention but did not give users a clear next step."
- "Users were not simply choosing a product. They were comparing variants, bundles, incentives, claims, delivery confidence, and perceived risk."

Why it works: the copy names hesitation, user decisions, and interface evidence. It avoids pretending that better UI alone equals business success.

### Watch

| Severity | Copy | Why it slips |
| --- | --- | --- |
| P2 | "aggressive product launches" | Slightly hype-led. Better to name product launch volume, ad channel, or testing cadence. |
| P2 | "conversion bottleneck into a growth engine" | Good as a headline, but too packaged for a case ending unless supported by actual before/after conversion numbers. |
| P2 | "validated every hypothesis" | Too total. Real tests usually validate some hypotheses and expose others. |

### Diagnosis

Depology should be the voice model: problem first, evidence second, design decision third. Keep the hard-edged sentences and reduce the growth-marketing sheen in the older `data/projects.json` version.

## Explainable Property Search

Sources reviewed:

- Portfolio entry in `data/projects.json`
- Local prop-tech project docs in `/Users/taotianchen/Downloads/Codex PropTech/docs/case-study.md`
- Local prop-tech README in `/Users/taotianchen/Downloads/Codex PropTech/README.md`

Overall status: strong concept, mostly human in the local docs, but the portfolio subtitle is over-compressed and jargon-heavy.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P1 | "A technical UX case study translating ambiguous renter language into editable intent, ranked recommendations, and inspectable Python + JSON search logic." | Accurate, but compressed into portfolio jargon. A hirer has to unpack "editable intent" and "inspectable logic". |
| P1 | "Property seekers often describe intent in natural language, but standard filters split that intent across separate controls..." | True, but still abstract. Better with a renter query example. |
| P1 | "A mobile-first NLP search flow that turns renter language into editable chips..." | Sounds like feature inventory, not case narrative. |
| P2 | "relocation-heavy and high-net-worth users" | Potentially useful segment, but needs evidence: why them, what behaviour, which channel leakage. |
| P2 | "trust at the moment of intent" | A good idea, but a little slogan-like. Needs an example of the moment. |
| P2 | "stickier search session, fewer early handoffs to agents, more saves and shares" | These are modeled outcomes. The docs already admit that, but the rewrite should keep that caveat visible. |

### Stronger Existing Copy

- "The user can still search normally, but the system also parses messy natural language into structured intent, shows that intent back as editable chips, and explains why each result ranked where it did."
- "Trust drops quickly when the system returns obvious false positives."
- "The same intent can appear as a positive request, a negative constraint, or a soft preference."

Why it works: this language describes the product mechanic and the user risk in plain terms.

### Diagnosis

The property NLP project has enough real material to become a strong case study. The weak copy is mostly the outward-facing packaging. It should open with a messy renter query, then show how the prototype parsed budget, location, exclusions, commute, and soft preference into visible chips and ranked explanations.

## Worldschooling

Overall status: highest AI-slop risk among the fuller case studies. The case has a real strategic decision inside it, but the copy keeps inflating the story instead of showing the decision.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P0 | "timing is everything" | Cliche opening. It tells the reader how to feel instead of showing the launch constraint. |
| P0 | "empowering students through unique, transformative experiences around the world" | Generic education-travel mission language. Could be copied from any brochure. |
| P0 | "match the sophistication of established players while launching in a fraction of the time" | Inflated competitor framing without evidence of which pages, flows, or features mattered. |
| P1 | "The challenge wasn't just building a website; it was building the right website" | Stock case-study phrasing. Adds no new information. |
| P1 | "strategically simplify the user journey without sacrificing conversion potential" | Abstract. Needs the actual simplification: no custom booking portal, deposit link, eligibility form. |
| P1 | "felt seamless but was technically straightforward" | Smooth but vague. What did users see? What did operators avoid building? |
| P1 | "The real innovation came in the upsell strategy" | Overclaims. It was likely a good interaction/content hierarchy decision, not necessarily innovation. |
| P1 | "transformed passive browsing into active exploration" | Classic AI-marketing phrase. Needs click behaviour or interaction evidence. |
| P0 | "The results validated every decision" | Overconfident and not credible. Real work rarely validates every decision. |
| P0 | "founder was thrilled" | Weak proof. Founder reaction is useful context, not a user outcome. |
| P0 | "high engagement rates and strong Net Promoter Scores" | Serious claim with no values, sample size, or method. |
| P0 | "proof that the company could deliver on its promise" | Investor-deck language. Too grand for a UX case study. |

### Human Core Hidden Inside

The strongest human idea is this: the scope was too large for the startup timeline, so the work replaced a full booking portal with a simpler path that still let parents and students compare programmes, submit eligibility details, and pay a deposit.

### Diagnosis

Rewrite the case around scope pressure and decision simplification. Use the Depology pattern:

- From "which pages do we need?" to "which decisions must a parent make before paying a deposit?"
- Look at how visitors compare programme tiers, where they hesitate before committing, and what information the team needs before confirming eligibility.

## Worldover.io

Overall status: recently improved and structurally useful, but still too fond of abstract product language. The multi-tab "separate mindspace" rule is good; it needs more operator behaviour and fewer command-centre nouns.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P1 | "high-consequence compliance space" | Accurate mood, generic wording. Better to name the specific risk: threshold breach, legal entity, missing evidence. |
| P1 | "different kinds of thinking" | Helpful concept, but needs concrete modes: checking production contribution is different from clearing report blockers. |
| P1 | "blurred those mindspaces" | User's intent is valid, but the wording sounds internal. Better: "the old dashboard made users keep risk, evidence, and reporting status in their head at the same time." |
| P1 | "more operational lens" | Consultancy phrase. Replace with what the new demo lets the user do. |
| P1 | "scannable decision workflow" | Good product goal, but generic as a subtitle. Needs action verbs. |
| P2 | "production-facing interaction design" | Vague. Use "browser-tested responsive states, clearer labels, and entity-aware dummy data" instead. |
| P2 | "Sharper compliance storytelling" | Storytelling is less convincing here than "clearer compliance reasoning". |

### Stronger Existing Copy

- "Risk Command is for deciding what to do. Production is for factory contribution and threshold consumption. Alerts are for rules and escalation. Reporting is for blockers and draft gates. Evidence is for imports and audit trail."
- "Entity selection is no longer a label-only filter; it changes the full display context."

Why it works: it names the job of each tab and describes actual system behaviour.

### Diagnosis

This case should frame the core problem as cognitive load under compliance pressure. The rewrite should show what an operator sees after selecting an entity, what changed in severity/readiness, what blocked report generation, and which evidence item had to be fixed.

## Travel to Qin

Overall status: polished but too promotional. It reads like a brand launch write-up, not a designer explaining a business and user problem.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P1 | "faced a significant barrier" | Generic. Name the barrier: a Shopify checkout page could not answer trust, itinerary, service, or cultural context questions. |
| P1 | "prestigious China International Travel Service" | Prestige cue, but not a UX problem. Use only if it changes trust requirements. |
| P0 | "complete digital transformation" | Inflated transformation language. Needs exact surfaces: identity, landing page, CMS, itinerary pages, brochure. |
| P0 | "captures the magic and scale of China" | Travel-marketing gloss. Not design evidence. |
| P1 | "narrative-driven information architecture" | Potentially true, but too abstract without section logic. |
| P0 | "golden opportunity" | Cliche. |
| P0 | "authentic, immersive experiences" | Generic travel language. |
| P1 | "felt both timeless and contemporary" | Common design cliche. Needs concrete visual decisions. |
| P0 | "The impact was immediate and profound" | Unsupported and overdramatic. |
| P0 | "digital gateway that makes the dream of visiting China feel not just possible, but irresistible" | Beautiful-sounding, but too ad-like for a hiring case study. |

### Human Core Hidden Inside

The real story: after the September 2024 visa policy change, the business needed to move from a transaction-first Shopify page to a trust-building travel surface for international visitors arriving from social channels.

### Diagnosis

Rewrite around trust, itinerary clarity, and source channel behaviour. Strong opening:

"The diagnosis moved from 'how do we make the site look more premium?' to 'what does a foreign visitor need to believe before they ask about a China itinerary?'"

## Nihao Serica

Overall status: not yet a case study. The current entry is almost entirely AI-slop because it has no case-study body and the subtitle is abstract.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P0 | "End-to-end framework delivery encompassing core user experience, digital identity, and structural GTM rollout." | This is the clearest slop phrase in the portfolio. It says everything and nothing. No user, no decision, no surface, no outcome. |

### Missing Evidence

- What user or buyer was Nihao Serica serving?
- What was confusing or incomplete before the work?
- Which surfaces were delivered: landing site, content system, social funnel, brand identity, booking/contact flow?
- What screenshots can prove before/after or product depth?
- What behaviour or business constraint shaped the UX?

### Diagnosis

Do not expand this with more generic copy. Build the case around screenshots and a clear product/customer journey first. Until then, the entry should use a modest factual subtitle.

## TUTU FUTURE

Overall status: credible project, but the copy is too polished and metaphor-heavy. It needs more evidence from audience, programme categories, and asset usage.

### Problematic Copy

| Severity | Copy | Why it reads non-human |
| --- | --- | --- |
| P1 | "challenge was one of evolution" | Grand opening. Replace with the actual mismatch: hiking identity no longer covered academic/art/STEM programmes. |
| P1 | "ambitions had grown beyond hiking trails" | Nice phrase, but too writerly. |
| P1 | "academic credibility with youthful energy" | Common branding phrase. Needs specific type, colour, mascot, and bilingual usage choices. |
| P1 | "dynamic shapes suggested possibility and growth" | Design-school language. Hard to verify. |
| P1 | "Color became a critical tool for differentiation" | Fine as a section thesis, but should be grounded in programme categories and template reuse. |
| P0 | "The impact was immediate" | Unsupported. |
| P1 | "speak to art students, language learners, and STEM enthusiasts with equal authenticity" | Good intention, but reads as a claim unless supported by example assets or campaign usage. |
| P1 | "grown up without losing its spirit" | Polished slogan. Could be a closing line only if the rest is concrete. |

### Human Core Hidden Inside

The strongest idea: the old hiking identity was too narrow for the new programme mix. A flexible visual system let each programme category look distinct without creating separate mini-brands.

### Diagnosis

Rewrite around the operational brand problem: the team needed to produce posters, social posts, brochures, and bilingual materials for different programme types without redesigning from scratch each time.

## Stair Aid

Overall status: strongest non-digital case in the portfolio. It has concrete testing, timing, mechanism, and material choices. Needs only tone tightening.

### Problematic Copy

| Severity | Copy | Why it slips |
| --- | --- | --- |
| P2 | "fundamentally different way" | True enough, but can be more direct: stair gait needs different crutch lengths. |
| P2 | "improved stability dramatically" | Needs the observation behind "dramatically", or reduce to "felt more stable during tests". |
| P2 | "every detail was optimized" | Over-totalizing. Better to name the details: curved tip, forearm brace, Nylon-66 30-GF. |
| P2 | "doesn't just accommodate stair navigation - it's designed for it" | Strong closer, but a little slogan-like. Keep only after evidence. |

### Stronger Existing Copy

- "Using standard crutches, real-world stair tests revealed that uneven crutch lengths reduced stair descent time from 8 seconds to 6 seconds."
- "Early prototypes used an external locking system mounted around the crutch tube, but user feedback revealed aesthetic concerns and mechanical complexity."
- "The locking system uses a lever for linear motion input, a bike cable for motion transfer, and a wedge mechanism."

### Diagnosis

Keep this case close to its current structure. It already reads like a maker explaining what changed through tests.

## X Star Production

Overall status: not enough case-study copy to audit. The portfolio subtitle is acceptable but slightly promotional.

### Problematic Copy

| Severity | Copy | Why it slips |
| --- | --- | --- |
| P2 | "story-led theatrical platform" | Nice but broad. What did the platform need to make clear: cast, tickets, production identity, venue, schedule? |
| P2 | "Delivered from concept to live production in just two weeks" | Strong if true. Needs one supporting detail if expanded into a case. |

## Ranking Of Rewrite Urgency

1. Nihao Serica: highest risk because it has no concrete case copy and the subtitle is pure abstraction.
2. Worldschooling: full case exists but reads too much like a pitch deck.
3. Travel to Qin: visually strong project, but copy sounds like tourism marketing.
4. Worldover.io: good structure, needs more operator-level behaviour.
5. TUTU FUTURE: good content, needs less brand-agency language.
6. Explainable Property Search: good local docs, needs outward-facing rewrite.
7. Stair Aid: mostly keep, trim a few claims.
8. Depology: keep as benchmark, lightly tighten older JSON copy.

## Portfolio-Wide Copy Ban List

Avoid or justify these phrases with evidence:

- end-to-end
- transformative
- seamless
- sophisticated
- strategic UX interventions
- conversion potential
- immersive
- magic and scale
- compelling vision
- validated every decision
- immediate and profound
- empowered the team
- scalable system
- premium feel
- structural GTM rollout
- execution capabilities
- resonated with users
- elevated brand positioning

These words are not always wrong, but in the current cases they often appear where a concrete user decision should be.
