import json

resume = {
  "personal": {
    "name": "Joe Tao",
    "location": "London, UK",
    "summary": "Product designer trained at UCL (MSc HCI, Distinction), with 3 years shipping research-led, mobile-first product across UK and China. Full lifecycle from discovery to delivery, 2x checkout CVR, design systems adopted across cross-functional teams. Research presented at ACM CHIWORK '25; fluent in AI-accelerated design practice. WCAG-grounded inclusive design, usability testing, and stakeholder presentation as defaults.",
    "title": "Product Designer",
    "contact": {
      "email": "joe.tianchen.tao@gmail.com",
      "phone": "+44 7404 641 570",
      "linkedin": "www.linkedin.com/in/joetao",
      "github": "github.com/GLJ-JT",
      "acm": "dl.acm.org/profile/99661638444"
    }
  },
  "experience": [
    {
      "role": "Product Designer, Cross-Border Platforms",
      "company": "TUTU VIEW",
      "logos": ["assets/employer_logos/TUTU.png", "assets/employer_logos/WOR.png", "assets/employer_logos/NIHAOSERICA.png"],
      "period": "Jul 2025 - Present",
      "description": "Sino-British business consultancy with two live consumer ventures across UK and China.",
      "bullets": [
        "Owned end-to-end design and launch of 3 cross-border digital platforms, delivering 3 live brand systems and websites without external agency support across travel and education verticals.",
        "Built a shared multi-brand design system in Figma, Framer, and Webflow with 30+ reusable components and design tokens, cutting per-feature production time by 40% across 3 brands simultaneously.",
        "Built AI-assisted content and production workflows (Cursor, v0, Midjourney), reducing recurring design and brochure labour by 70% through documented operational systems.",
        "Designed the social-to-conversion funnel for Nihao Serica; contributed to 1,500 followers and 220,000 likes in the first month through UX-aligned creative and landing page strategy.",
        "Ran A/B tests across 14 Meta and TikTok ad and landing page variants; improved blended ROAS by approximately 22% and reduced cost per acquisition by 18% over 3 months.",
        "Conducted customer research and behavioural analysis to define IA and product structures used across both venture platforms, presenting findings directly to founders to shape roadmap.",
        "Directed digital touchpoints and live technical production for high-profile UK-China private receptions, delivering event UX and brand presence without incident."
      ]
    },
    {
      "role": "Product Designer, Conversion & Research",
      "company": "Depology",
      "logos": ["assets/employer_logos/DEP.png"],
      "period": "Dec 2024 - Jun 2025",
      "description": "Seoul-founded Korean skincare DTC brand; Shenzhen branch driving digital product and conversion.",
      "bullets": [
        "Built a modular Figma design system with tokens, component documentation, and handoff SOPs; reduced design and build time by 30% and scaled across a 5-person cross-functional team.",
        "Created a Research-UI-Ads usability testing and A/B framework that cut testing cycles from 2 weeks to 4 days, contributing to a 50% reduction in cart abandonment and faster iteration across the team.",
        "Doubled checkout CVR (+100%) across two product rollouts through a full funnel redesign, using heatmaps, session recordings, and cohort data to remove the highest-impact drop-off points.",
        "Led UX prioritisation aligning design, media buying, and technical implementation around conversion goals; aligned landing-page UX with ad promise and user behaviour data throughout."
      ]
    },
    {
      "role": "User Experience Designer",
      "company": "Travel to Qin",
      "logos": ["assets/employer_logos/TRAVELTOQIN.png"],
      "period": "Aug 2024 - Dec 2024",
      "description": "CITS-backed travel-tech startup; CITS is China's largest state-owned travel enterprise.",
      "bullets": [
        "Led research via interviews, focus groups, and field studies; produced 50-page IA wireframe informing global expansion strategy; owned full web UI across Shopify and WordPress from zero.",
        "Built a reusable product-uploading system reducing launch cycle by 50% and content labour by 50%; grew the social account from 0 to 20,000+ followers in 3 months as on-camera representative."
      ]
    },
    {
      "role": "Digital Product Designer (Part-time)",
      "company": "DAUH UK / manila.design",
      "logos": ["assets/employer_logos/DAUH.png"],
      "period": "Oct 2022 - Sep 2023",
      "description": "Independent industrial and brand design studio; co-venture of manila.design (UK) and Cover (China).",
      "bullets": [
        "Led UX research for a B2C e-commerce platform using interviews and Google Analytics; built a design system that standardised UI across the product and reduced developer build time.",
        "Analysed behaviour with Google Analytics and SEMrush to identify conversion blockers, redesigned key flows, and delivered pixel-perfect handoff ensuring design intent translated without quality loss."
      ]
    },
    {
      "role": "UI Design Intern",
      "company": "Quadtalent Technology",
      "logos": ["assets/employer_logos/QT.png"],
      "period": "Apr 2021 - Sep 2021",
      "description": "Sequoia-backed Shenzhen big-data firm (200–500 staff); enterprise clients included Malaysian government agencies, Chinese manufacturing plants, and insurance enterprises. Founded by ex-Alibaba and Huawei leadership; Bytedance partner.",
      "bullets": [
        "Stepped into the sole UI role mid-project; learned Figma, CSS/HTML, JavaScript in 3 days and shipped the full enterprise website from concept to live with minimal engineering revision, operating inside multi-layer approval cycles across government and enterprise clients.",
        "Applied Python data visualisation to company analytics for executive presentations; built direct trust with C-suite leadership (former Alibaba Cloud and Huawei execs) through reliable delivery."
      ]
    }
  ],
  "education": [
    {
      "degree": "MSc Human-Computer Interaction (Distinction, 76/100)",
      "school": "University College London (UCL)",
      "period": "2022 - 2023",
      "bullets": [
        "Modules: Interaction Design (83), Perception and Interfaces (82.9), User-Centred Data Visualisation, Interaction Science.",
        "Research contributed to ACM CHIWORK '25 paper presented in Amsterdam; pitched findings to Google via UCL Interaction Centre."
      ]
    },
    {
      "degree": "BSc (Hons) Product Design (First Class, 71/100)",
      "school": "University of Leeds",
      "period": "2019 - 2022",
      "bullets": [
        "Modules: Advanced Electronics (92), Understanding Data in Social Sciences (80), Interface Design, Service Design, Human Factors.",
        "Thesis: StairAid, ergonomic crutch with novel stair-climbing mechanism, full manufacturing and IP analysis (72/100)."
      ]
    }
  ],
  "skills": {
    "Design and UX": "End-to-End Product Design / Interaction Design / Mobile UX (iOS / Android) / Design Systems and Tokens / High-Fidelity Prototyping / Accessibility (WCAG) / Inclusive Design / Design QA",
    "Research and Growth": "User Research (Interviews, Focus Groups, Field Studies) / Journey Mapping / A/B Testing / CRO / Heatmapping (Hotjar) / GA4 / Amplitude / Meta Ads Manager",
    "Tools and Build": "Figma / Framer / Webflow / Shopify / AI Design (Cursor, v0, Midjourney, Runway) / HTML / CSS / JavaScript / Python / SEMrush / Miro / Adobe Creative Suite / Pagefly / Elementor",
    "Collaboration": "China-UK Cross-market Operations / Cross-functional Team Leadership / Stakeholder Alignment / Design Mentorship / SOP Authoring / Sprint Facilitation / English and Mandarin (Fluent)"
  }
}

with open('data/resume.json', 'w') as f:
    json.dump(resume, f, indent=2)

print("done")
