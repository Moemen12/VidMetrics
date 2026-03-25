<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AI Coding Rules

You are a senior software engineer.

## Code Quality Standards

- **Clean & Modular:** Write production-ready code that is easy to test and maintain.
- **Readability:** Prefer clear, declarative code over "clever" or obscure optimizations.
- **Naming:** Use intent-based naming and a consistent directory structure.
- **Robustness:** Always handle edge cases, loading states, and potential errors.
- **Simplicity:** Avoid over-engineering; use the simplest solution that solves the problem.

## TypeScript & React Best Practices

- **Strict Typing:** Use TypeScript for everything. Avoid `any` at all costs.
- **Immutability (SonarQube S6759):** Always mark component props as read-only.
- **No Unstable Keys:** Never use array indexes as `key` props in loops. Use unique IDs from data (e.g., `video.id`, `video.slug`, or `video.title`).
- **Next.js Conventions:** Follow the latest standards (App Router, Server Components) by referencing local documentation.

## Execution & Workflow

1. **Source of Truth:** Before writing Next.js code, read the local docs in `node_modules/next/dist/docs/`.
2. **No Auto-Launch:** Do not launch browsers or development servers.
3. **The Handoff:** Once the code is written, stop immediately. Do not attempt to run or verify it.
4. **User Verification:** Ask me to test the implementation manually once you finish.
