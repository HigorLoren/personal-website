<!-- dgc-policy-v11 -->
# Dual-Graph Context Policy

This project uses a local dual-graph MCP server for efficient context retrieval.

## MANDATORY: Always follow this order

1. **Call `graph_continue` first** — before any file exploration, grep, or code reading.

2. **If `graph_continue` returns `needs_project=true`**: call `graph_scan` with the
   current project directory (`pwd`). Do NOT ask the user.

3. **If `graph_continue` returns `skip=true`**: project has fewer than 5 files.
   Do NOT do broad or recursive exploration. Read only specific files if their names
   are mentioned, or ask the user what to work on.

4. **Read `recommended_files`** using `graph_read` — **one call per file**.
   - `graph_read` accepts a single `file` parameter (string). Call it separately for each
     recommended file. Do NOT pass an array or batch multiple files into one call.
   - `recommended_files` may contain `file::symbol` entries (e.g. `src/auth.ts::handleLogin`).
     Pass them verbatim to `graph_read(file: "src/auth.ts::handleLogin")` — it reads only
     that symbol's lines, not the full file.
   - Example: if `recommended_files` is `["src/auth.ts::handleLogin", "src/db.ts"]`,
     call `graph_read(file: "src/auth.ts::handleLogin")` and `graph_read(file: "src/db.ts")`
     as two separate calls (they can be parallel).

5. **Check `confidence` and obey the caps strictly:**
   - `confidence=high` -> Stop. Do NOT grep or explore further.
   - `confidence=medium` -> If recommended files are insufficient, call `fallback_rg`
     at most `max_supplementary_greps` time(s) with specific terms, then `graph_read`
     at most `max_supplementary_files` additional file(s). Then stop.
   - `confidence=low` -> Call `fallback_rg` at most `max_supplementary_greps` time(s),
     then `graph_read` at most `max_supplementary_files` file(s). Then stop.

## Token Usage

A `token-counter` MCP is available for tracking live token usage.

- To check how many tokens a large file or text will cost **before** reading it:
  `count_tokens({text: "<content>"})`
- To log actual usage after a task completes (if the user asks):
  `log_usage({input_tokens: <est>, output_tokens: <est>, description: "<task>"})`
- To show the user their running session cost:
  `get_session_stats()`

Live dashboard URL is printed at startup next to "Token usage".

## Rules

- Do NOT use `rg`, `grep`, or bash file exploration before calling `graph_continue`.
- Do NOT do broad/recursive exploration at any confidence level.
- `max_supplementary_greps` and `max_supplementary_files` are hard caps - never exceed them.
- Do NOT dump full chat history.
- Do NOT call `graph_retrieve` more than once per turn.
- After edits, call `graph_register_edit` with the changed files. Use `file::symbol` notation (e.g. `src/auth.ts::handleLogin`) when the edit targets a specific function, class, or hook.

## Context Store

Whenever you make a decision, identify a task, note a next step, fact, or blocker during a conversation, call `graph_add_memory`.

**To add an entry:**
```
graph_add_memory(type="decision|task|next|fact|blocker", content="one sentence max 15 words", tags=["topic"], files=["relevant/file.ts"])
```

**Do NOT write context-store.json directly** — always use `graph_add_memory`. It applies pruning and keeps the store healthy.

**Rules:**
- Only log things worth remembering across sessions (not every minor detail)
- `content` must be under 15 words
- `files` lists the files this decision/task relates to (can be empty)
- Log immediately when the item arises — not at session end

## Session End

When the user signals they are done (e.g. "bye", "done", "wrap up", "end session"), proactively update `CONTEXT.md` in the project root with:
- **Current Task**: one sentence on what was being worked on
- **Key Decisions**: bullet list, max 3 items
- **Next Steps**: bullet list, max 3 items

Keep `CONTEXT.md` under 20 lines total. Do NOT summarize the full conversation — only what's needed to resume next session.

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/` (gitignored — never published; this is a public portfolio repo). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

---

# Working on this repo

## Approach

- **Plan before touching code.** For anything larger than a one-line fix:
  diagnose first, then write a prioritized plan — P0 / P1 / P2, cheap and
  low-risk first, subjective or structural last. Show it, get a yes, execute in
  that order.
- **Ship in small reviewable slices.** One phase = one branch = one commit.
  After each: `npm run build` + `npm run lint` + a quick smoke test, then hand
  back for the user to eyeball before the next phase. Don't batch phases into
  one diff.
- **Recommend, don't enumerate.** On a judgment call, give one recommendation
  with a sentence of why. Offer 2–3 options only when they're genuinely
  different bets and the user's taste should decide.
- **Say what's still undone.** If a phase ships partial, note it in the commit
  body (`Falta do P1: ...`) and in the reply. Keep a running P2 list.

## Design & copy work

- Use the `frontend-design` skill for any visual change. Follow its two-pass
  method: draft a token plan, then review it against the brief and cut anything
  that is a generic default.
- Ground aesthetic choices in Higor's real work and this site's concept
  (`CONTEXT.md` — "rascunho de trabalho"). A choice that would fit any
  portfolio is not a choice.
- Copy is content, not decoration. Cut the AI tells: "transformo X em Y",
  tricolons, "não X, mas Y", em-dash asides, tracked ALL-CAPS labels, glyphs
  glued to link text (`→ ↗ ↓`), meta strings joined with `·`, self-important
  closers.
- **Margin-note and case-study copy must be literally true.** If a claim can't
  be verified, ask or pick a different one.

## Conventions (don't skip)

- All user-facing strings live in `src/i18n/pt.ts`. Components never hard-code
  copy; derive labels from config (`src/lib/site.ts`) where possible.
- Portuguese from Brazil, fully accented, everywhere.
- When something structural changes (fonts, design tokens, a new core
  component, a new concept), update `CONTEXT.md` (glossary + key decisions) and
  `README.md` in the same commit.
- `dev` is the integration branch; `main` is production (Vercel deploys it on
  push). Branch off `dev`, merge work back into `dev` (`--no-ff`). Merge
  `dev` → `main` only when the user explicitly wants a production deploy.
- Conventional Commits, imperative, in Portuguese, with the `Co-Authored-By`
  trailer. Push only when asked.
- Verify before reporting: build + lint, grep for leftover patterns, curl the
  affected routes under `npm run dev`. Report failures with their output; never
  claim done without checking.
