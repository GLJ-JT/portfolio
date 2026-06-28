# Working Progress

Last updated: 2026-06-26

This folder is the local preview/workspace copy:

`/Users/taotianchen/Documents/Design Portfolio/design-portfolio-clean`

Important: `design-portfolio-clean/` is ignored by the parent git repo via `.gitignore`. Do not assume edits here are automatically tracked or pushed.

## Current State

- The tracked repo root is `/Users/taotianchen/Documents/Design Portfolio`.
- Local parent `main` has diverged heavily from remote and has many unrelated dirty files. Do not push local `main` directly.
- For narrow live changes, use a fresh worktree from remote `main` or a scoped GitHub API update instead of committing the whole parent working tree.
- The open browser often points at `file:///Users/taotianchen/Documents/Design Portfolio/design-portfolio-clean/...`, which is the preview copy, not necessarily the tracked file.

## Recent Live Changes

- `b46ab26` — Removed TripMi from the homepage.
- `674b5b3` — Added the Dēpology impact metric near the top of the case study.
- `1d4370b` — Restored Dēpology case-study dark/light theme response.

The Dēpology page should include:

- Theme boot script reading `joe-portfolio-theme`.
- `shared/page-transition.css` and `shared/page-transition.js`.
- `:root[data-theme="dark"]` variables.
- Impact line: `2x checkout conversion rate`.

## TripMi Notes

- TripMi was added, then removed from the homepage.
- The standalone `tripmi-case-study.html` may still exist on remote, but it is no longer linked from the homepage.
- In this clean preview folder, TripMi project text/card should be gone from `index.html`. There may still be orphan CSS selectors with `tripmi` names from earlier local experiments; verify before cleaning them.

## Profile Ticker Notes

- The desired profile ticker is the live `joetao.me` `.life-ticker` daily-life image strip, not the project-image ticker.
- Local missing images were restored under `assets/daily-life/`.
- If photos disappear locally, check that these exist:
  - `assets/daily-life/stairaid-exhibition.jpg`
  - `assets/daily-life/michelin-event.jpg`
  - `assets/daily-life/event-group.jpg`
  - `assets/daily-life/google-event.jpg`

## Suggested Skills

- `portfolio-case-study-writer` for case-study copy and metric placement.
- `web-design` for visual/layout changes.
- `browser:control-in-app-browser` for checking what the user sees in the in-app browser.

## Safe Workflow For Future Agents

1. Check whether the user is looking at the clean preview file or the tracked parent file.
2. If editing for local preview, edit inside `design-portfolio-clean/`.
3. If pushing live, apply the same change to the tracked parent repo or a fresh worktree based on remote `main`.
4. Stage only the intended files.
5. Avoid pushing the parent local `main` branch wholesale because it is diverged and dirty.
