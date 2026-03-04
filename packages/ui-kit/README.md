# UI Kit

Atomic Design component library for React Native and React Native Web.

## Structure

Following Atomic Design principles:

- **atoms/** - Basic building blocks (Button, Text, Input, Icon)
- **molecules/** - Simple combinations (FormField, Card, ListItem)
- **organisms/** - Complex components (Form, Header, Navigation)
- **templates/** - Page-level layouts
- **blocks/** - Feature-specific composite components

## Development

### ⚡ Zero-Build Development

This package uses **direct source mapping** - no build step required during development!

**How it works:**

- All apps are configured to import directly from `src/` folder
- TypeScript path mappings resolve `ui-kit` to source files
- Rspack watches the source files and hot reloads changes automatically
- Changes appear instantly - no rebuild needed! 🚀

**Just edit and save** - your changes will hot reload in all running apps.

### Configuration

Each app has:

1. **TypeScript paths** (`tsconfig.json`):

   ```json
   {
     "paths": {
       "ui-kit": ["../../packages/ui-kit/src"]
     }
   }
   ```

2. **Rspack alias** (`rspack.config.mjs`):

   ```javascript
   alias: {
     'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src')
   }
   ```

3. **Watch options** for hot reload:
   ```javascript
   watchOptions: {
     followSymlinks: true,
     ignored: /node_modules\/(?!ui-kit)/
   }
   ```

## Usage

```tsx
import { Button, Text } from "ui-kit";
import { FormField } from "ui-kit/molecules";
import { TransactionBlock } from "ui-kit/blocks";
```
