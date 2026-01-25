# Solito Skill Documentation

The Solito skill provides comprehensive guidance for building universal applications (web + mobile) using Solito, which combines Expo (React Native) and Next.js with shared navigation and component libraries.

## What is Solito?

Solito enables developers to share navigation code between React Native (Expo) and Next.js. Instead of maintaining separate routing logic for web and mobile, Solito provides a unified navigation layer that works across both platforms while respecting platform-specific patterns.

## When to Use the Solito Skill

Invoke the Solito skill when:
- Building universal apps (web + mobile) with shared code
- Implementing cross-platform navigation
- Creating shared UI components that work on web and native
- Setting up monorepo structure for Solito projects
- Handling platform-specific code
- Implementing authentication across platforms
- Debugging navigation or routing issues

## Getting Started

### Create a New Solito Project

Use the `/new-fullstack` command and select the Solito option:

```
/new-fullstack my-universal-app
```

You'll be asked to choose from:
1. Next.js (App Router + API Routes + TypeScript)
2. T3 Stack (Next.js + tRPC + Prisma + Tailwind)
3. MERN (MongoDB + Express + React + Node)
4. Monorepo (React frontend + Express backend + shared types)
5. **Solito (Expo + Next.js + shared navigation - Universal app for web + mobile)** ← Select this

### Configuration Options

When you select Solito, you'll be asked:

1. **Package manager?** (pnpm recommended, yarn, npm)
2. **Include NativeWind?** (Tailwind CSS for React Native)
3. **Include authentication?** (Clerk, Supabase, custom, skip)
4. **Include API layer?** (tRPC, REST, skip)
5. **Include UI library?** (Tamagui, React Native Paper, custom, skip)

## Project Structure

The Solito skill sets up a monorepo with the following structure:

```
my-app/
  apps/
    expo/              # React Native mobile app
      app/             # Expo Router file-system routes
      package.json
      app.json
    next/              # Next.js web app
      app/             # Next.js App Router
      public/
      package.json
      next.config.js
  packages/
    app/               # Shared UI and navigation
      features/        # Feature screens
      components/      # Reusable components
      lib/            # Utilities
      provider/       # Navigation provider
    api/              # Shared API client (optional)
  package.json        # Root workspace config
  pnpm-workspace.yaml
  turbo.json
```

## Development Workflow

### Running the Project

**Web (Next.js):**
```bash
cd apps/next
pnpm dev
```

**Mobile (Expo):**
```bash
cd apps/expo
pnpm start
```
Then press `i` for iOS simulator, `a` for Android emulator, or scan QR code for physical device.

**Run both simultaneously:**
```bash
# From root
pnpm dev
```

### Creating Shared Components

1. Create components in `packages/app/components/`
2. Create screens in `packages/app/features/[feature]/screen.tsx`
3. Add routes in both `apps/next/app/` and `apps/expo/app/`
4. Test on both platforms

## Key Concepts

### 1. Shared by Default

**80% of your code should live in `packages/app`.** Only create platform-specific code when absolutely necessary.

```tsx
// packages/app/features/home/screen.tsx
import { View, Text } from 'react-native'
import { Link } from 'solito/link'

export function HomeScreen() {
  return (
    <View>
      <Text>Welcome!</Text>
      <Link href="/profile">
        <Text>Go to Profile</Text>
      </Link>
    </View>
  )
}
```

### 2. Unified Navigation

Use Solito's navigation components instead of platform-specific ones:

```tsx
// ✅ CORRECT: Works on both platforms
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'

// ❌ WRONG: Platform-specific
import Link from 'next/link'  // Next.js only
import { Link } from '@react-navigation/native'  // RN only
```

### 3. Platform-Specific Code

When you need platform-specific implementations, use file extensions:

```
components/
  video-player.tsx         # Shared interface
  video-player.web.tsx     # Web implementation
  video-player.native.tsx  # Native implementation
```

The bundler automatically resolves the correct file for each platform.

## Reference Documentation

The Solito skill includes detailed reference files:

### Navigation Patterns
Location: `.claude/skills/solito/references/navigation-patterns.md`

Covers:
- Link component usage
- Router hooks
- Route parameters (static, dynamic, catch-all)
- Query parameters
- Navigation guards
- Deep linking
- Type-safe routing

### Monorepo Setup
Location: `.claude/skills/solito/references/monorepo-setup.md`

Covers:
- Workspace configuration (pnpm, yarn, npm)
- Package structure
- Dependency management
- TypeScript configuration
- NativeWind setup
- Turborepo configuration
- Build scripts

### Platform-Specific Code
Location: `.claude/skills/solito/references/platform-specific.md`

Covers:
- Platform detection
- File extension resolution
- Conditional rendering
- Platform-specific components
- Styling differences
- API differences
- Testing platform-specific code

### Common Pitfalls
Location: `.claude/skills/solito/references/common-pitfalls.md`

Documents 23 common mistakes including:
- Using platform-specific navigation libraries
- Hardcoding absolute URLs
- Incorrect param access
- Import issues
- Styling problems
- Monorepo configuration errors
- TypeScript path mapping
- Environment variables

## Invoking the Skill

### Automatic Invocation

When you create a Solito project using `/new-fullstack`, the skill is automatically invoked to provide guidance.

### Manual Invocation

You can manually invoke the skill when working on Solito projects:

```
Use the solito skill for [your specific task]
```

For example:
- "Use the solito skill to help me implement cross-platform navigation"
- "Use the solito skill to debug this routing issue"
- "Use the solito skill to set up authentication"

## Best Practices

1. **Default to shared code** - Only use platform-specific when necessary
2. **Use file extensions** - Cleaner than Platform.select() for components
3. **Share interfaces** - Define types in base file, implement in platform files
4. **Test both platforms** - Don't assume code works everywhere
5. **Use NativeWind** - Consistent styling API across platforms
6. **Type your routes** - Create type definitions for all routes
7. **Keep business logic shared** - Platform differences should be UI/API only
8. **Use Solito navigation** - Never import from next/router or @react-navigation
9. **Configure monorepo correctly** - Follow workspace best practices
10. **Check bundle sizes** - Optimize for both web and native

## Deployment

### Web (Next.js)
```bash
cd apps/next
vercel deploy
```

### Mobile (Expo)
```bash
cd apps/expo
eas build --platform ios
eas build --platform android
eas submit
```

### Over-the-Air Updates
```bash
eas update --branch production
```

## Example Use Cases

### Building a Social Media App
- Shared feed components
- Cross-platform authentication (Clerk)
- Unified navigation between posts
- Platform-specific camera integration
- Shared API client with tRPC

### E-commerce Platform
- Product listings (shared)
- Shopping cart (global state with Zustand)
- Checkout flow (shared screens)
- Platform-specific payment integration
- Image optimization (Next.js Image on web, Expo Image on native)

### SaaS Dashboard
- Shared data tables
- Cross-platform charts
- Unified routing
- Platform-specific file uploads
- Shared authentication state

## Additional Resources

- **Solito Official Docs**: https://solito.dev/
- **Solito Starter Template**: https://github.com/nandorojo/solito
- **Expo Router Docs**: https://docs.expo.dev/router/introduction/
- **Next.js App Router**: https://nextjs.org/docs/app
- **NativeWind Docs**: https://www.nativewind.dev/

## Troubleshooting

### Common Issues

**Metro bundler not picking up changes:**
```bash
cd apps/expo
pnpm start --clear
```

**TypeScript can't resolve imports:**
Check `tsconfig.json` path mappings and ensure workspace packages are correctly referenced.

**Navigation not working:**
Ensure you're using `solito/link` and `solito/router`, not platform-specific imports.

**Styling differences:**
Use NativeWind with platform modifiers (`web:` and `native:`) or create platform-specific style files.

For more detailed troubleshooting, refer to the Common Pitfalls reference file.

---

**Need help?** Invoke the Solito skill for guidance on any Solito-related task or consult the reference documentation in `.claude/skills/solito/references/`.
