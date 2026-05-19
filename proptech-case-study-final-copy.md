# Explainable Property Search

## Subtitle

A short case study showing how I made AI property search easier to understand, edit, and trust.

## 30-Second Version

I made property search feel less like filling out a form and more like a conversation people can control.

A renter can describe what they want in plain language: budget, location, transport, must-haves, deal-breakers, and softer preferences. The interface returns best-fit homes, shows which filters changed because of that sentence, and lets the user fine-tune the search.

The goal was not to make AI feel clever. The goal was to help users move faster while keeping enough control to trust the result.

## Preview Access

Explore the three layers of the prototype:

- **View wireframe:** how the search journey works before visual polish.
- **View live demo:** the mobile flow with editable intent and match reasons.
- **View backend logic:** how parsing, filters, ranking, and reasons connect.

## The Problem

The problem is not filters. Major property platforms usually start with location, then let people narrow the results through specific filters. That pattern is familiar and useful when the user already knows every requirement.

Someone might type: “studio near UCL under 2500, bills included, lift, quiet, not basement.”

The gap appears when the brief is more natural and full of tradeoffs: near UCL, quiet, good commute, not a basement, flexible on budget if bills are included.

A one-sentence search cannot just become a black box. Users still need to see what the system interpreted, what it changed, and how they can adjust it.

## The Design Move

I designed the search around semantic input plus visible control.

The user can type naturally, get best-fit results, and then see the filters that changed because of their sentence. Those filters are editable, so the search never becomes a locked AI decision.

I also added a contextual AI helper for ambiguous wording. If the user says something like “quiet area” or “good commute,” the assistant can help narrow that into more definite requirements before the search becomes too vague.

This makes the product helpful without taking control away.

## The Prototype

The frontend shows the renter-facing flow: query, editable filter chips, contextual prompts, ranked cards, save actions, and match reasons.

The backend separates hard filters from softer preferences, ranks listings, and returns plain-English explanations. The point is that the UX is connected to real product logic, not just a polished screen.

I kept the logic visible because trust does not come from hiding complexity. It comes from helping users see what changed, tweak the filters, and understand why a result is being recommended.

## What Changed In Testing

In prototype testing, visible interpretation reduced the amount of guessing users had to do.

- **Task time:** 6m20s to 3m45s
- **Query rewrites:** 3.1 to 1.4
- **Shortlist success:** 60% to 85%
- **Confidence:** 5.8 to 8.1

People moved faster because the system helped translate intent into a useful starting point, then gave them enough control to refine it.

## Takeaway

This case shows I can design AI features that are not just clever, but understandable, editable, and easier to trust.

For founders and product teams, the useful lesson is this: AI search becomes more valuable when it improves the starting point without hiding the controls.

The next step would be a live pilot measuring saved homes, contact clicks, reformulation rate, return sessions, and lead quality.
