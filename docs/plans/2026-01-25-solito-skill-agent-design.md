# Solito Skill & Agent Design

**Date:** 2026-01-25
**Purpose:** Add Solito (Expo + Next.js) support to the jarrod-claude repository with a specialized skill, agent, and integration into the `/new-fullstack` command.

## Overview

Solito is a React Native + Next.js navigation framework that enables code sharing between web (Next.js) and mobile (Expo). This design adds comprehensive Solito support as a standalone full-stack option.

## Problem Statement

Developers building universal applications (web + mobile) need:
- Shared navigation code across platforms
- Unified component libraries
- Cross-platform routing patterns
- Best practices for monorepo structure
- Guidance on platform-specific code

Currently, the `/new-fullstack` command doesn't support universal app scaffolding.

## Design Decisions

### 1. Standalone Stack Option
Solito will be added as option #5 in `/new-fullstack`, alongside Next.js, T3, MERN, and Monorepo. This keeps concerns separated and makes the choice explicit.

### 2. Skill Structure
Location: `.claude/skills/solito/`

**Main file: `SKILL.md`**
- When to use this skill
- Project structure overview
- Navigation patterns (solito/link, solito/router)
- Shared component patterns
- Platform-specific code handling
- Authentication patterns
- Common pitfalls
- Development workflow

**Reference files:**
- `references/navigation-patterns.md` - Routing, links, params
- `references/monorepo-setup.md` - Workspace config, package structure
- `references/platform-specific.md` - Platform detection, conditional rendering
- `references/common-pitfalls.md` - Import issues, navigation bugs, platform quirks

### 3. Agent Configuration
Location: `~/.claude/agents/solito-builder.json`

**Capabilities:**
- Project scaffolding (monorepo setup)
- Component generation (cross-platform)
- Navigation implementation
- Platform-specific code handling
- Debugging support

**Tools:**
- Read, Write, Edit (code generation)
- Bash (npm/pnpm/expo/next commands)
- Grep, Glob (pattern finding)
- WebFetch (docs lookup)

**Auto-invocation:**
- Detects `solito` in package.json
- Manual invocation for Solito tasks

### 4. Integration with `/new-fullstack`

**Updated option list:**
```
1. Next.js (App Router + API Routes + TypeScript)
2. T3 Stack (Next.js + tRPC + Prisma + Tailwind)
3. MERN (MongoDB + Express + React + Node)
4. Monorepo (React frontend + Express backend + shared types)
5. Solito (Expo + Next.js + shared navigation) ← NEW
```

**Solito setup process:**

1. **Create monorepo structure:**
   ```
   {project-name}/
     apps/
       expo/          # React Native mobile app
       next/          # Next.js web app
     packages/
       app/           # Shared UI components & navigation
       api/           # Shared API client (optional)
     package.json     # Workspace configuration
   ```

2. **Initialize projects:**
   - Use Solito starter template OR
   - Manual setup with create-expo-app + create-next-app
   - Configure pnpm/yarn workspaces

3. **Configure shared navigation:**
   - Set up navigation structure in packages/app
   - Create example screens
   - Configure routing in both platforms

4. **Styling setup:**
   - NativeWind (Tailwind for React Native)
   - Shared design tokens
   - Platform-specific overrides

5. **Optional features:**
   - Authentication (Clerk, Supabase, custom)
   - API layer (tRPC, REST, GraphQL)
   - State management (Zustand, Jotai)
   - UI library (Tamagui, React Native Paper)

6. **Documentation:**
   - README with platform-specific run commands
   - Development workflow guide
   - Deployment instructions (Vercel + EAS)

**Follow-up questions:**
- Package manager? (pnpm recommended, yarn, npm)
- Include NativeWind? (Tailwind for React Native)
- Include authentication? (Clerk, Supabase, custom)
- Include API layer? (tRPC, REST, GraphQL)
- Include UI library? (Tamagui, React Native Paper, custom)

## File Structure

```
.claude/
  skills/
    solito/
      SKILL.md
      references/
        navigation-patterns.md
        monorepo-setup.md
        platform-specific.md
        common-pitfalls.md
  commands/
    new-fullstack.md (updated)

~/.claude/
  agents/
    solito-builder.json
```

## Implementation Phases

### Phase 1: Skill Creation
- Create SKILL.md with core guidance
- Write reference documentation files
- Include code examples and patterns

### Phase 2: Agent Configuration
- Create solito-builder.json agent
- Configure tools and permissions
- Test agent invocation

### Phase 3: Command Integration
- Update new-fullstack.md
- Add Solito option (#5)
- Implement setup flow with questions
- Test scaffolding process

### Phase 4: Testing & Documentation
- Test full workflow end-to-end
- Verify generated projects work
- Update main README
- Add examples

## Success Criteria

- [ ] User can run `/new-fullstack my-app` and select Solito option
- [ ] Generated project has correct monorepo structure
- [ ] Both Expo and Next.js apps run successfully
- [ ] Shared navigation works across platforms
- [ ] Skill provides helpful guidance during development
- [ ] Agent auto-invokes in Solito projects
- [ ] Documentation is clear and complete

## Technical Considerations

**Package Manager:**
- Recommend pnpm (best monorepo support)
- Support yarn workspaces
- npm workspaces as fallback

**Navigation Library:**
- Solito (core)
- Expo Router for native
- Next.js App Router for web

**Styling Approach:**
- NativeWind (Tailwind CSS for React Native)
- Shared design tokens
- Platform-specific styles when needed

**State Management:**
- Keep optional, let user choose
- Suggest Zustand for simplicity
- Support Redux Toolkit, Jotai

**API Integration:**
- tRPC for type-safety across platforms
- REST with shared fetch client
- GraphQL with Apollo/urql

## Open Questions (Resolved)

- ✅ Should Solito be standalone option? **YES** (Option A)
- ✅ Include state management in setup? **YES** (as optional follow-up)
- ✅ Include UI library selection? **YES** (Tamagui, React Native Paper, custom)
- ✅ Handle deployment setup? **YES** (Vercel for web, EAS for mobile)

## References

- Solito Docs: https://solito.dev/
- Solito Starter: https://github.com/nandorojo/solito
- NativeWind: https://www.nativewind.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
- Next.js App Router: https://nextjs.org/docs/app

## Next Steps

After design approval:
1. Use superpowers:writing-plans to create implementation plan
2. Use superpowers:using-git-worktrees to create isolated workspace
3. Implement Phase 1 (Skill creation)
4. Implement Phase 2 (Agent configuration)
5. Implement Phase 3 (Command integration)
6. Implement Phase 4 (Testing & Documentation)
