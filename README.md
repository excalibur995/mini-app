# Next-Gen Application

**Unified Mobile Architecture for Maybank Project Atlas**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.3-orange.svg)](https://pnpm.io/)
[![Re.Pack](https://img.shields.io/badge/Re.Pack-5.2.1-purple.svg)](https://re-pack.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)

---

## 🧭 Overview

This repository contains the **Next-Gen Application** built for the **Maybank Digital Banking Platform (Project Atlas)**. It serves as the foundation for the Next-Gen SuperApp — a modular, secure, and scalable mobile solution leveraging React Native, Re.Pack Module Federation, Native SDK integrations, and modern mobile architecture patterns.

The project aims to modernize and unify Maybank's mobile ecosystem, providing consistent customer experiences across all market segments through a micro-frontend architecture that enables independent feature development and deployment.

---

## 🧩 Core Principles

| Principle                | Description                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Modular Architecture** | Built using Re.Pack Module Federation to enable independent feature modules (Host, Dashboard, Transfer, ScanPay) |
| **Cross-Platform**       | Single React Native codebase optimized for iOS and Android with platform-specific enhancements                   |
| **Performance-Driven**   | Hermes engine, Rspack bundling, code splitting, and React Native new architecture support                        |
| **Secure by Design**     | Integrated with Security SDK, code signing, and native security frameworks                                       |
| **Composable UI/UX**     | Shared design system via mbb-ui-kit and consistent navigation patterns                                           |
| **Scalable CI/CD**       | Monorepo structure with pnpm workspaces, automated dependency management, and multi-flavor configs               |

---

## 🏗 Project Structure

```
mbbmy-dbdo-nextgen-app/
├── apps/
│   ├── host/                  # 🏠 Host Shell App (Module Federation Container)
│   │   ├── android/           # Android native layer
│   │   ├── ios/              # iOS native layer
│   │   ├── src/              # React Native source code
│   │   ├── rspack.config.mjs # Re.Pack configuration
│   │   └── package.json      # Port: 8000 (dev), 8100 (standalone)
│   │
│   ├── dashboard/            # 🎨 Dashboard Mini-App (Federated Module)
│   │   ├── android/
│   │   ├── ios/
│   │   ├── src/
│   │   ├── rspack.config.mjs
│   │   └── package.json      # Port: 8001 (dev), 8101 (standalone)
│   │
│   ├── transfer/             # 💸 Transfer Mini-App (Federated Module)
│   │   ├── android/
│   │   ├── ios/
│   │   ├── src/
│   │   ├── rspack.config.mjs
│   │   └── package.json      # Port: 8002 (dev), 8102 (standalone)
│   │
│   └── scanpay/              # 📷 ScanPay Mini-App (QR & Camera Features)
│       ├── android/
│       ├── ios/
│       ├── src/
│       ├── rspack.config.mjs
│       └── package.json      # Port: 8003 (dev), 8103 (standalone)
│
├── packages/
│   ├── mobile-sdk/           # 🛠 Core Mobile SDK (Shared Dependencies & Utils)
│   ├── mbb-ui-kit/          # 🎨 Maybank Design System Components
│   └── security-sdk/        # 🔐 Security SDK (Native Security Integrations)
│
├── mprocs/                   # 🖥️ Multi-process Runner Configurations
│   └── host.yaml            # Concurrent dev server orchestration
│
├── scripts/                  # 🧰 Automation & Build Scripts
│
├── .env.*                    # 🌍 Environment Variables (SIT, UAT, PROD)
├── package.json              # 📦 Root Workspace Configuration
├── pnpm-workspace.yaml       # 📦 pnpm Monorepo Configuration
├── lefthook.yml             # 🪝 Git Hooks Configuration
├── SETUP.md                  # 📖 Detailed Technical Setup Guide
└── README.md                 # 📖 This File

```

---

## 🎯 Key Features

### Module Federation Architecture

- **Host App**: Main container that dynamically loads federated modules at runtime
- **Mini-Apps**: Independent apps (Dashboard, Transfer, ScanPay) that can run standalone or as federated modules
- **Dynamic Loading**: Load features on-demand to reduce initial bundle size
- **Shared Dependencies**: Optimized dependency sharing across all modules

### Technical Highlights

- ⚡ **Rspack Bundling**: 5-10x faster builds compared to Webpack
- 🏗️ **React Native New Architecture**: Enabled with Turbo Modules and Fabric
- 🔄 **Hot Module Replacement**: Fast refresh during development
- 📦 **Code Splitting**: Automatic chunk-based code splitting
- 🎨 **Reanimated & Skia**: High-performance animations and graphics
- 📸 **Vision Camera**: Advanced camera features for QR scanning
- 🔒 **Code Signing**: Production bundle integrity verification
- 🧪 **TypeScript**: Full type safety across the codebase

---

## ⚙️ Requirements

> ⚠️ **Important**: Please ensure all requirements are met before proceeding with setup.

### Core Requirements

| Tool         | Version | Required |
| ------------ | ------- | -------- |
| **Node.js**  | ≥ 20    | ✅ Yes   |
| **pnpm**     | 9.15.3  | ✅ Yes   |
| **Watchman** | Latest  | ✅ Yes   |
| **Ruby**     | 3.3.9   | ✅ Yes   |

### iOS Development

- **Xcode**: ≥ 16.0
- **CocoaPods**: Installed via Bundler
- **iOS Deployment Target**: 13.0+

### Android Development

- **Android Studio**: Latest stable
- **Android SDK**: 35+
- **Java/JDK**: 17+
- **Gradle**: 8.x (via wrapper)

### Installation Guides

- **pnpm**: [Official Installation Guide](https://pnpm.io/installation)
- **Watchman**: `brew install watchman` (macOS)
- **Ruby**: Use rbenv or RVM to manage Ruby versions

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Clone the repository
git clone https://github.com/maybank-ghes/mbbmy-dbdo-nextgen-app.git
cd mbbmy-dbdo-nextgen-app

# Install all dependencies (runs postinstall hooks for iOS pods)
pnpm install

# Verify pnpm version alignment
pnpm self-update
```

### 2. iOS Pod Installation (if needed)

```bash
# Install pods for all apps
pnpm pods

# Or for a specific app
pnpm --filter host pods
```

---

## 🎮 Running the Application

### Development Mode (Module Federation)

Start all mini-apps concurrently using mprocs:

```bash
# Start Host + All Mini-Apps (Dashboard, Transfer, ScanPay)
pnpm start

# This runs 4 dev servers simultaneously:
# - Host: http://localhost:8000
# - Dashboard: http://localhost:8001
# - Transfer: http://localhost:8002
# - ScanPay: http://localhost:8003
```

Then, in a separate terminal:

```bash
# Run Host App on iOS
pnpm ios

# Run Host App on Android
pnpm android
```

### Running Individual Mini-Apps (Standalone Mode)

Each mini-app can also run independently for isolated development:

#### Dashboard

```bash
# Start Dashboard standalone dev server
pnpm dashboard:start

# Run Dashboard on iOS/Android
pnpm dashboard:ios
pnpm dashboard:android
```

#### Transfer

```bash
pnpm --filter transfer start:standalone
pnpm --filter transfer ios
pnpm --filter transfer android
```

#### ScanPay

```bash
pnpm --filter scanpay start:standalone
pnpm --filter scanpay ios
pnpm --filter scanpay android
```

---

## 🛠 Available Commands

### Root Commands

```bash
# Development
pnpm start                   # Start all apps using mprocs
pnpm ios                     # Run host app on iOS
pnpm android                 # Run host app on Android

# Dashboard shortcuts
pnpm dashboard:start         # Start dashboard standalone
pnpm dashboard:ios          # Run dashboard on iOS
pnpm dashboard:android      # Run dashboard on Android

# Code Quality
pnpm lint                    # Lint all apps
pnpm test                    # Run tests for all apps
pnpm typecheck              # Type check all apps

# Dependency Management
pnpm align-deps             # Align dependencies across apps
pnpm check-deps             # Check dependency versions
pnpm pods                   # Install iOS pods for all apps
pnpm pods:update            # Update iOS pods for all apps

# Cleanup
pnpm clean                  # Remove all node_modules, builds, pods
```

### Per-App Commands

```bash
# Start dev server
pnpm --filter <app-name> start
pnpm --filter <app-name> start:standalone

# Run on device
pnpm --filter <app-name> ios
pnpm --filter <app-name> android

# Build bundles
pnpm --filter <app-name> bundle:ios
pnpm --filter <app-name> bundle:android

# iOS pod management
pnpm --filter <app-name> pods
pnpm --filter <app-name> pods:update

# Code quality
pnpm --filter <app-name> lint
pnpm --filter <app-name> test
```

**App names**: `host`, `dashboard`, `transfer`, `scanpay`

---

## 📦 Package Structure

### Apps

| App           | Description             | Ports (Dev/Standalone) | Key Features                                                |
| ------------- | ----------------------- | ---------------------- | ----------------------------------------------------------- |
| **host**      | Main container app      | 8000 / 8100            | Module Federation host, QR display, bottom sheet navigation |
| **dashboard** | Dashboard & analytics   | 8001 / 8101            | Federated module, tab navigation, reanimated                |
| **transfer**  | Money transfer features | 8002 / 8102            | Federated module, transaction flows                         |
| **scanpay**   | QR scanning & payments  | 8003 / 8103            | Federated module, Vision Camera, QR code scanning           |

### Packages

| Package          | Description                                              | Usage                |
| ---------------- | -------------------------------------------------------- | -------------------- |
| **mobile-sdk**   | Shared dependencies, utils, and Module Federation config | Imported by all apps |
| **mbb-ui-kit**   | Maybank Design System components                         | UI component library |
| **security-sdk** | Native security integrations                             | Security features    |

---

## 🏛 Architecture

### Module Federation Flow

```
┌─────────────────────────────────────────────────┐
│              Host App (Port 8000)               │
│  ┌─────────────────────────────────────────┐   │
│  │   App Container & Navigation Shell      │   │
│  └─────────────────────────────────────────┘   │
│                      │                          │
│         ┌────────────┼────────────┐            │
│         ▼            ▼            ▼            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │Dashboard │ │ Transfer │ │ ScanPay  │       │
│  │  (8001)  │ │  (8002)  │ │  (8003)  │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│  Federated    Federated    Federated          │
│  Module       Module       Module             │
└─────────────────────────────────────────────────┘

        Shared Dependencies (mobile-sdk)
        • React 19.1.0 (Singleton)
        • React Native 0.81.4 (Singleton)
        • React Navigation 7.x
        • Reanimated, Gesture Handler, etc.
```

### Development vs Production

**Development Mode:**

- Each mini-app runs its own dev server
- Host loads modules via HTTP from `localhost:800X`
- Hot Module Replacement enabled
- Fast refresh for rapid iteration

**Production Mode:**

- All modules bundled and code-signed
- Modules loaded from CDN or app bundle
- Optimized bundle sizes with tree shaking
- Code splitting for on-demand loading

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm --filter host test
pnpm --filter dashboard test

# Run tests with coverage
pnpm --filter host test -- --coverage
```

---

## 📝 Code Quality

### Linting

```bash
# Lint all apps
pnpm lint

# Lint specific app
pnpm --filter host lint

# Fix auto-fixable issues
pnpm --filter host lint -- --fix
```

### Type Checking

```bash
# Type check all apps
pnpm typecheck

# Type check specific app
pnpm --filter host typecheck
```

### Git Hooks

The project uses Lefthook for git hooks. Configuration is in `lefthook.yml`. Install hooks:

```bash
lefthook install
```

---

## 🔧 Troubleshooting

### Common Issues

#### Metro starts instead of Rspack

- Ensure `rspack.config.mjs` exists in the app directory
- Verify `@callstack/repack` is installed
- Check `react-native.config.js` is properly configured

#### Module not found errors

```bash
# Clear caches and reinstall
pnpm clean
pnpm install
pnpm pods
```

#### iOS build fails

```bash
# Clean iOS build
cd apps/host/ios
rm -rf build Pods Podfile.lock
bundle install
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
cd ../../..
```

#### Port already in use

```bash
# Kill processes on ports 8000-8003
lsof -ti:8000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
lsof -ti:8002 | xargs kill -9
lsof -ti:8003 | xargs kill -9
```

#### Android build issues

```bash
# Clean Android build
cd apps/host/android
./gradlew clean
cd ../../..
```

For more detailed troubleshooting, see [SETUP.md](./SETUP.md).

---

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed technical setup and configuration guide
- [Re.Pack Documentation](https://re-pack.dev/docs) - Module Federation and bundling
- [React Native Docs](https://reactnative.dev/) - React Native framework
- [pnpm Workspaces](https://pnpm.io/workspaces) - Monorepo management

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes in the appropriate app or package
3. Run tests and linting: `pnpm test && pnpm lint`
4. Align dependencies if needed: `pnpm align-deps`
5. Commit changes (pre-commit hooks will run)
6. Create a pull request

### Code Style

- Follow ESLint configuration (`@react-native/eslint-config`)
- Use TypeScript for type safety
- Follow React Native best practices
- Write tests for new features

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## 🔗 Related Links

- **Repository**: [maybank-ghes/mbbmy-dbdo-nextgen-app](https://github.com/maybank-ghes/mbbmy-dbdo-nextgen-app)
- **Current Branch**: `feat/InitialCodeBase`
- **Active Pull Request**: [Initial Commit #1](https://github.com/maybank-ghes/mbbmy-dbdo-nextgen-app/pull/1)

---

## 📞 Support

For questions or issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [SETUP.md](./SETUP.md) for detailed configuration
3. Open an issue on GitHub
4. Contact the development team

---

<div align="center">

**Built with ❤️ for Maybank Project Atlas**

_Empowering the next generation of digital banking_

</div>
