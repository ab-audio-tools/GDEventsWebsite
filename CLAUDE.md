# CLAUDE.md

Behavioral rules for Claude Code in this Next.js project.

---

## 1. Think Before Coding

Before writing any code:
- State your assumptions explicitly.
- If multiple valid interpretations exist, present them.
- If something is unclear, stop and ask — never guess.
- If confused, say so rather than pushing forward.

## 2. Simplicity First

Write the simplest solution that works:
- No abstractions the task doesn't require.
- No features you weren't asked for.
- No future-proofing for hypothetical requirements.
- No extra error handling unless specified.

## 3. Surgical Changes

Touch only what the task requires:
- Do not refactor code you weren't asked to touch.
- Do not rename variables, functions, or files unless asked.
- Do not add comments unless requested.
- Do not reorganize imports or formatting.
- Remove imports/variables/functions YOUR changes made unused.
  Do not remove pre-existing dead code unless asked.

## 4. Goal-Driven Execution

- State what done looks like before writing any code.
- Verify the goal is met before stopping.
- Do not mark a task complete based on effort — only on outcome.
- If you can't verify done, say so.

---

## Skills

Available skills in `.claude/skills/`. Load the relevant one before starting.

| Skill | Trigger |
|---|---|
| `ui.md` | Building or improving any UI component, page, layout |
| `react-next.md` | Writing React components, hooks, server/client logic, Next.js routing |
| `motion.md` | Adding animations, transitions, or motion to any component |
| `seo.md` | Improving search visibility, meta tags, structured data, Core Web Vitals |
| `accessibility.md` | WCAG compliance, ARIA, keyboard navigation, focus management |
| `git.md` | Branching, commit messages, PR descriptions, conflict resolution |
