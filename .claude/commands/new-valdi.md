# New Valdi Project

**Trigger**: `/new-valdi [project-name]`

**Description**: Creates a new Valdi cross-platform application project

---

When this skill is invoked:

1. Extract project name from args, or ask if not provided

2. Ask what type of Valdi project:
   - Full Application (iOS + Android)
   - iOS Only
   - Android Only
   - Library/Module (for embedding in existing apps)

3. Ask for bundle identifiers:
   - iOS bundle ID (e.g., com.example.myapp)
   - Android package name (e.g., com.example.myapp)

4. Create project directory: `mkdir {project-name} && cd {project-name}`

5. Initialize with Valdi CLI:
   ```bash
   valdi bootstrap
   ```

6. If Valdi CLI is not installed, install it first:
   ```bash
   pnpm install -g @snap/valdi
   valdi dev_setup
   ```

7. Create the project structure:
   ```
   {project-name}/
   ├── BUILD.bazel
   ├── MODULE.bazel
   ├── WORKSPACE
   ├── .bazelrc
   ├── .bazelversion
   ├── package.json
   ├── .eslintrc.js
   ├── .gitignore
   ├── .prettierrc.json
   ├── app_assets/
   │   └── images/
   │       └── .gitkeep
   ├── src/
   │   ├── android/
   │   │   └── .gitkeep
   │   ├── cpp/
   │   │   └── .gitkeep
   │   ├── ios/
   │   │   └── .gitkeep
   │   └── valdi/
   │       ├── _configs/
   │       │   └── tsconfig.json
   │       ├── .terserrc.json
   │       └── {module_name}/
   │           ├── BUILD.bazel
   │           ├── tsconfig.json
   │           ├── res/
   │           │   └── .gitkeep
   │           └── src/
   │               ├── index.ts
   │               ├── App.tsx
   │               ├── CppModule.d.ts
   │               └── NativeModule.d.ts
   └── standalone_app/
       └── .gitkeep
   ```

8. Create the main BUILD.bazel with valdi_application:
   ```python
   load("//bzl:valdi.bzl", "valdi_application")

   valdi_application(
       name = "{project_name}",
       title = "{Project Title}",
       version = "1.0.0",
       ios_bundle_id = "{ios_bundle_id}",
       ios_device_families = ["iphone"],
       android_package = "{android_package}",
       android_theme = "Theme.{ProjectName}.Launch",
       android_app_icon = "app_icon",
       root_component = "App@{module_name}/src/App",
       assets = glob(["app_assets/**/*"]),
       deps = ["//{project_name}/src/valdi/{module_name}"],
       visibility = ["//visibility:public"],
   )
   ```

9. Create the module BUILD.bazel:
   ```python
   load("//bzl:valdi.bzl", "valdi_module")

   valdi_module(
       name = "{module_name}",
       srcs = glob(["src/**/*.ts", "src/**/*.tsx"]) + ["tsconfig.json"],
       assets = glob(["res/**/*.{jpeg,jpg,png,svg,webp}"]),
       deps = [
           "//src/valdi_modules/valdi_core",
           "//src/valdi_modules/valdi_tsx",
       ],
       visibility = ["//visibility:public"],
   )
   ```

10. Create the main App.tsx component:
    ```tsx
    import { Component, ComponentContext } from 'valdi_core';
    import { Style } from 'valdi_tsx';

    interface AppViewModel {
      title: string;
    }

    const styles = {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
      },
      subtitle: {
        fontSize: 16,
        color: '#666666',
        marginTop: 8,
      },
    };

    export class App extends Component<AppViewModel, ComponentContext> {
      onCreate(): void {
        console.log('App created');
      }

      onRender() {
        return (
          <view style={styles.container}>
            <label style={styles.title}>{this.viewModel.title || 'Welcome to Valdi'}</label>
            <label style={styles.subtitle}>Build native apps with TypeScript</label>
          </view>
        );
      }
    }
    ```

11. Create index.ts:
    ```typescript
    export { App } from './App';
    ```

12. Create type declaration stubs:
    ```typescript
    // CppModule.d.ts
    declare module 'CppModule' {
      // Add your C++ bindings here
    }

    // NativeModule.d.ts
    declare module 'NativeModule' {
      // Add your native platform bindings here
    }
    ```

13. Create package.json with pnpm:
    ```json
    {
      "name": "{project_name}",
      "version": "1.0.0",
      "description": "Valdi application",
      "license": "ISC",
      "devDependencies": {
        "@typescript-eslint/eslint-plugin": "^6.21.0",
        "@typescript-eslint/parser": "^6.21.0",
        "eslint": "^8.27.0",
        "eslint-plugin-import": "^2.26.0",
        "eslint-plugin-unused-imports": "^2.0.0",
        "prettier": "^3.0.0",
        "typescript": "^5.3.3"
      }
    }
    ```

14. Create .eslintrc.js:
    ```javascript
    module.exports = {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './src/valdi/{module_name}/tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'unused-imports',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'error',
      },
    };
    ```

15. Create tsconfig.json files:
    ```json
    // src/valdi/_configs/tsconfig.json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "jsx": "react",
        "jsxFactory": "Valdi.createElement",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "declaration": true,
        "declarationMap": true
      }
    }

    // src/valdi/{module_name}/tsconfig.json
    {
      "extends": "../_configs/tsconfig.json",
      "include": ["src/**/*"]
    }
    ```

16. Create .gitignore:
    ```
    # Dependencies
    node_modules/
    pnpm-lock.yaml

    # Bazel
    bazel-*
    .bazel-*

    # Build outputs
    dist/
    build/

    # IDE
    .idea/
    .vscode/
    *.swp
    *.swo
    .DS_Store

    # Environment
    .env
    .env.local
    ```

17. Create .prettierrc.json:
    ```json
    {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "es5",
      "printWidth": 100
    }
    ```

18. Install dependencies:
    ```bash
    pnpm install
    ```

19. Initialize git repository:
    ```bash
    git init
    git add .
    git commit -m "chore: initial Valdi project setup"
    ```

20. Print next steps:
    ```
    Project created successfully!

    Next steps:
    1. cd {project-name}
    2. valdi install ios    # Install iOS dependencies
       OR
       valdi install android # Install Android dependencies
    3. valdi hotreload       # Start development with hot reload
    4. Open in VSCode/Cursor and install Valdi extensions

    Useful commands:
    - valdi doctor          # Check environment health
    - valdi projectsync     # Sync after changing deps/resources
    - bazel build //:app    # Build the application

    Documentation: https://github.com/Snapchat/Valdi
    ```

**Example usage**:
- `/new-valdi my-app`
- `/new-valdi` (will prompt for name)
