## Problem Statement

The current mobile homepage hero is a compressed version of the desktop tabbed hero. It preserves the same DOM and interaction model, but it does not match the supplied mobile wireframe direction: a black-first, editorial mobile hero where the fixed header, five prompt tabs, and oversized typographic panels are composed specifically for a tall portrait viewport.

The user needs a mobile hero layout that keeps the existing identity system, tab states, theme behavior, page-load mosaic, and hero content, while reshaping the mobile CSS and DOM layer behavior to match the wireframe set.

## Solution

Create a mobile-specific hero layout for small portrait viewports that treats the hero as a full-screen, vertically staged experience. The layout should keep the existing tablist and tabpanel semantics, but rearrange spacing, type scale, and panel-specific content so each selected tab resembles its reference wireframe.

The mobile hero should have:

- A fixed top header with `JOE TAO` on the left and `CONTACT` on the right.
- No desktop nav links or page dots on mobile.
- A centered five-item prompt tab cluster placed below the header with generous top whitespace.
- A visible rectangular active-tab frame that moves cleanly between prompt labels.
- Large, high-contrast hero content below the tab cluster.
- Dark-mode-first styling matching the wireframes, with light mode still supported through existing theme tokens.
- Existing hero tab interaction, hash updates, accessibility roles, theme toggle, text reveal, page-load mosaic, and reduced-motion behavior preserved.

## User Stories

1. As a mobile portfolio visitor, I want the first screen to feel intentionally designed for my phone, so that the portfolio does not look like a squeezed desktop page.
2. As a mobile portfolio visitor, I want to immediately see Joe Tao and Contact in the fixed header, so that identity and outreach are always available.
3. As a mobile portfolio visitor, I want the navigation prompts to be centered and readable, so that I can understand the five hero sections without horizontal scrolling.
4. As a mobile portfolio visitor, I want the active prompt to be clearly outlined, so that I know which hero state I am reading.
5. As a mobile portfolio visitor, I want the active outline to move between prompts smoothly, so that switching states feels polished.
6. As a mobile portfolio visitor, I want the “Who I am” state to show the large people-centric problem-solver lockup, so that Joe’s design identity is memorable.
7. As a mobile portfolio visitor, I want the “Who I am” lockup to include the avatar stack, script word, theme toggle, and solver mark, so that the existing brand details remain part of the hero.
8. As a mobile portfolio visitor, I want the “What I care about” state to use oversized stacked text, so that the message has the same visual force as the wireframe.
9. As a mobile portfolio visitor, I want the “What I care about” state to remain legible even when decorative inline face marks are present, so that the typography does not collapse or overflow.
10. As a mobile portfolio visitor, I want the “What I believe in” state to highlight certainty and trust with the existing orange and purple/blue accents, so that the concept reads quickly.
11. As a mobile portfolio visitor, I want the “What I’m good at” state to become a bold skill list with icons aligned to the line endings, so that the skills feel like a designed menu rather than a desktop list.
12. As a mobile portfolio visitor, I want the “What I’m doing” state to show the career statement in two strong blocks, so that the immediate professional ask is clear.
13. As a mobile portfolio visitor, I want LinkedIn and Resume actions in the “What I’m doing” state, so that I can act without scrolling.
14. As a mobile portfolio visitor, I want the hero content to fit within portrait screens without overlapping the header or tabs, so that the page feels composed on common phone sizes.
15. As a mobile portfolio visitor, I want the hero content to avoid clipping long words, so that the expressive type remains professional.
16. As a mobile portfolio visitor, I want the hero to support both dark and light modes, so that the theme toggle does not break the mobile composition.
17. As a mobile portfolio visitor, I want the load mosaic to remain compatible with the mobile hero, so that the first impression is cohesive.
18. As a mobile portfolio visitor with motion sensitivity, I want reduced-motion settings respected, so that the hero remains usable without animation.
19. As a keyboard or assistive-tech user, I want the prompt controls to retain tab semantics, so that I can understand and operate the hero sections.
20. As a keyboard user, I want arrow-key navigation between hero tabs to keep working, so that the mobile-specific layout does not regress existing accessibility behavior.
21. As a designer reviewing the portfolio, I want the mobile hero to match the supplied wireframe proportions, so that the visual direction is faithfully implemented.
22. As a developer maintaining the page, I want the mobile changes to reuse existing hero content and state logic, so that the implementation remains local and understandable.
23. As a developer maintaining the page, I want mobile-specific CSS to be isolated in the existing mobile breakpoint structure, so that desktop behavior is not accidentally changed.
24. As a developer maintaining the page, I want the tab frame calculation to work after mobile layout changes, so that the active outline stays aligned after resize, load, and tab activation.
25. As a developer maintaining the page, I want the hero asset reveal code to keep working with the reshaped mobile lockups, so that text and inline assets still animate together.
26. As a recruiter or hiring manager, I want the mobile hero to communicate identity, values, skills, and current search quickly, so that I can evaluate fit without digging through the page.
27. As Joe, I want the mobile hero to feel expressive and designed rather than generic, so that it reflects my product-design taste before the case studies begin.

## Implementation Decisions

- Modify the mobile hero layout through the existing homepage hero system instead of creating a separate mobile-only hero duplicate.
- Preserve the existing DOM layers: custom cursor layer, page-load wipe layer, fixed site header, page dots, hero stage, hero grid field, hero skill-shape layer, tablist, active tab frame, tabpanels, and hero metadata.
- Keep `page-dots` hidden on mobile, as the wireframes only show the top identity/contact header and the prompt cluster.
- Keep the primary mobile header as a two-column fixed layout: name link on the left and contact link on the right.
- Hide the desktop center nav links on mobile.
- Treat the tablist as a centered multi-row prompt cluster on mobile, not a scrollable horizontal strip.
- Preserve the five existing tab labels and state keys: Who I am, What I care about, What I believe in, What I’m good at, and What I’m doing.
- Keep the moving `.hero-tab-frame` as the active state indicator, but tune mobile padding, border thickness, border radius, and alignment to match the wireframes.
- Place the tab cluster below the header with a large portrait-specific top offset. The cluster should sit in the upper third of the viewport, leaving room for oversized content beneath it.
- Use `min-height`/`height` constraints that make the first hero screen feel full-screen on portrait mobile while avoiding forced overflow on shorter devices.
- Keep the hero grid field visually suppressed or extremely subtle on mobile; the wireframes read as clean black backgrounds, not visible grids.
- For the “Who I am” mobile state, preserve the existing semantic content but allow mobile-specific line breaks:
  - Line 1: “I’M A” plus avatar stack.
  - Line 2: large script “people-centric”.
  - Line 3: “PR [toggle] BLEM”.
  - Line 4: “SOLVER” plus solver mark.
- For the “Who I am” mobile state, keep the theme toggle inline inside “problem”, but size it for tap comfort and visual similarity to the wireframe.
- For the “What I care about” mobile state, simplify or constrain inline decorative face marks if needed so the text can follow the reference stack: “WHY USERS”, “LOVE, HATE,”, “AND”, “COMES BACK TO”, “A PRODUCT”.
- For the “What I believe in” mobile state, keep the existing orange and blue/purple tokens and make the phrase stack close to the wireframe: “A GOOD DESIGN”, “BUILDS”, “CERTAINTY &”, “TRUST.”
- For the “What I’m good at” mobile state, convert the skill project list into a large typographic list with small icon/asset marks near line endings. Existing skill links should remain clickable.
- For the “What I’m doing” mobile state, keep the existing text meaning, but stack it into two large blocks and keep LinkedIn/Resume buttons near the lower hero area.
- Keep all tabpanels in the existing accessible `role="tabpanel"` structure and continue toggling `hidden` for inactive panels.
- Keep the current hash behavior so each mobile state can still be linked directly.
- Keep the current hero text reveal behavior, but adjust selectors only if mobile-specific line wrappers require it.
- Keep the page-load mosaic overlay compatible with mobile. It should remain above all hero layers and be removed after completion.
- Respect `prefers-reduced-motion` by disabling the load wipe, cursor, text reveal movement, and other nonessential motion.
- Avoid changing case-study preview layout, support sections, or desktop hero behavior as part of this PRD.

## Testing Decisions

- Good tests should verify user-visible behavior: tab activation, header visibility, active frame placement, no horizontal overflow, no text overlap, and preserved links.
- Test the mobile layout at common portrait widths: 320px, 375px, 390px, 414px, and 430px.
- Test at short and tall viewport heights to ensure the tab cluster and hero content do not collide.
- Test dark mode and light mode because the wireframes are dark-first but the site supports both themes.
- Test reduced-motion mode to verify the hero remains readable and the load wipe is not shown.
- Test keyboard behavior for the tablist: Tab focus, ArrowLeft, ArrowRight, Home, and End.
- Test direct hash navigation for each hero state.
- Test tap behavior for the theme toggle, LinkedIn link, Resume link, skill links, and Contact link.
- Use browser screenshots as the main verification method because the feature is visual and layout-driven.
- Use DOM assertions only for stable behavior such as selected tab state, hidden panel state, and link targets.
- Prior art in the current codebase includes existing hero tab activation, tab frame measurement, text reveal setup, mobile breakpoint rules, and reduced-motion handling.

## Out of Scope

- Rewriting the desktop hero layout.
- Replacing the existing hero tab interaction model.
- Replacing the current fonts or adding a new type system.
- Redesigning the work/case-study sections below the hero.
- Building new case-study navigation.
- Changing resume content or LinkedIn destination.
- Creating new illustration assets beyond using the existing avatar, toggle, solver mark, face marks, and skill imagery.
- Publishing this PRD to an external issue tracker, because no issue-tracker configuration or label vocabulary is available in this session.

## Further Notes

Reference wireframes are stored in the local `mobile wireframe` folder as five portrait PNGs:

- `Mobile Hero 1.png`: Who I am
- `Mobile Hero 2.png`: What I care about
- `Mobile Hero 3.png`: What I believe in
- `Mobile Hero 4.png`: What I’m good at
- `Mobile Hero 5.png`: What I’m doing

Current mobile CSS is concentrated in the `max-width: 920px` and `max-width: 560px` breakpoint blocks. The existing mobile rules already hide desktop nav and page dots, wrap hero tabs, reduce hero type size, reshape care cards, and flatten case-study/support grids. The implementation should revise the hero-specific rules in those breakpoint blocks while leaving unrelated page sections alone.

Current hero DOM layers to account for:

- `custom-cursor`
- `load-wipe`
- `site-header`
- `page-dots`
- `site-shell`
- `hero-stage`
- `hero-grid-field`
- `hero-skill-shapes`
- `hero-tabs`
- `hero-tab-frame`
- `hero-tab`
- `hero-panel`
- `hero-state`
- `hero-type`
- panel-specific inline assets and action links

Open implementation question for the next build pass: decide whether the mobile-specific line breaks should be achieved purely with CSS and existing spans, or whether a small set of additional semantic wrappers should be added to make the wireframe states easier to control without fragile selector chains.
