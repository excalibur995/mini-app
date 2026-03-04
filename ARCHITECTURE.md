# Transfer Mini-App Complete Technical Documentation

A comprehensive guide explaining how the Transfer app works, from blocks and capabilities to adapters, validators, and services.

## Table of Contents

1. [Quick Overview](#quick-overview)
2. [Project Structure](#project-structure)
3. [Core Concepts](#core-concepts)
4. [Blocks System](#blocks-system)
5. [Capabilities System](#capabilities-system)
6. [Adapters](#adapters)
7. [Validators](#validators)
8. [Services](#services)
9. [How Everything Works Together](#how-everything-works-together)
10. [Complete Data Flow Example](#complete-data-flow-example)
11. [Adding New Features](#adding-new-features)

---

## Quick Overview

The Transfer app is built on a **configuration-driven architecture** that separates concerns:

```
┌────────────────────────────────────────────────────────────┐
│                    Transfer App                            │
├────────────────────────────────────────────────────────────┤
│ UI Layer (Screens)                                         │
│   └─ Renders Blocks based on Capabilities                 │
├────────────────────────────────────────────────────────────┤
│ Block Layer (UI Components)                               │
│   └─ From ui-kit package (reusable components)            │
├────────────────────────────────────────────────────────────┤
│ Service Layer (Business Logic)                            │
│   ├─ TransactionService (orchestrator)                    │
│   ├─ Validators (data validation)                         │
│   └─ Adapters (market-specific logic)                     │
├────────────────────────────────────────────────────────────┤
│ Data Layer (Configuration & State)                        │
│   ├─ Capabilities (market features)                       │
│   ├─ AppContext (global state)                            │
│   └─ Types (interfaces)                                   │
└────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
apps/transfer/src/
├── App.tsx                          # Entry point (re-exports navigator)
├── adapters/
│   ├── base.ts                      # BaseAdapter (abstract class)
│   ├── countries/
│   │   ├── id.ts                    # IDAdapter (Indonesia/QRIS)
│   │   └── my.ts                    # MYAdapter (Malaysia/DuitNow)
│   └── index.ts                     # Adapter factory function
├── configs/
│   ├── id.json                      # Indonesia capabilities config
│   └── my.json                      # Malaysia capabilities config
├── contexts/
│   └── AppContext.tsx               # Global app state & provider
├── core/
│   ├── BlockFactory.tsx             # Creates & manages blocks
│   ├── BlockRouter.tsx              # Routes blocks to screens
│   └── CapabilityLoader.ts          # Loads market capabilities
├── hooks/
│   ├── useBlockRenderer.tsx         # Renders blocks for screen
│   ├── useTransaction.ts            # Transaction business logic
│   └── index.ts
├── navigation/
│   ├── TransferNavigator.tsx        # Main navigator with AppProvider
│   └── types.ts
├── screens/
│   ├── Landing.tsx                  # First screen
│   ├── TransferTo.tsx               # Select recipient
│   ├── EnterAmount.tsx              # Enter amount & tip
│   ├── TransferDetails.tsx          # Transaction details
│   ├── Confirmation.tsx             # Review before submit
│   ├── EndFlow.tsx                  # Success/failure result
│   ├── Home.tsx                     # Home screen
│   └── Profile.tsx                  # User profile
├── services/
│   └── TransactionService.ts        # Submits transactions
├── styles/
│   └── common.ts                    # Shared styles
├── types/
│   └── index.ts                     # TypeScript interfaces
└── constants/
    └── mockData.ts                  # Mock data for development
```

---

## Core Concepts

### 1. Market-Driven Architecture

The app supports multiple payment markets (Indonesia, Malaysia) with different:

- **Compliance frameworks** (QRIS, DuitNow)
- **Currencies** (IDR, MYR)
- **Features** (tips, recurring transfers)
- **Validation rules** (min/max amounts)

### 2. Configuration-First Design

Each market is defined by a JSON configuration that determines:

- Which blocks/UI components to show
- Which features are enabled
- Validation constraints

### 3. Component Composition

The UI is built from reusable **blocks** (components from ui-kit) that are assembled per market.

---

## Blocks System

### What are Blocks?

Blocks are reusable UI components that compose screens. They represent distinct features or sections of the transaction flow.

### Available Blocks

```typescript
export type BlockName =
  | "RecipientSelectionBlock" // Select who to send money to
  | "AccountDetailBlock" // Show account details
  | "AmountInputBlock" // Enter amount
  | "TransferDetailsBlock" // Additional transfer info
  | "ConfirmationBlock" // Review transaction
  | "ResultBlock" // Success/failure result
  | "AccountListBlock" // List of accounts
  | "RecurringBlock"; // Recurring transfer settings
```

### Block Registry Mapping

**Location**: `apps/transfer/src/core/BlockFactory.tsx`

```typescript
const BLOCK_REGISTRY: Record<BlockName, React.ComponentType<any>> = {
  RecipientSelectionBlock: SearchableFilteredListTransferTo,
  AccountDetailBlock: AccountDetail,
  AmountInputBlock: AccountCard,
  TransferDetailsBlock: TransferList,
  ConfirmationBlock: ConfirmationTransferTo,
  ResultBlock: EndFlowMessage,
  AccountListBlock: AccountList,
  RecurringBlock: RecurringFrequency,
};
```

Each block is a React component from the `ui-kit` package.

### Block Interface

```typescript
export interface IBlock {
  name: BlockName; // Block identifier
  component: React.ComponentType<any>; // React component
  enabled: boolean; // Enabled per market
}
```

### Block Factory Function

```typescript
export function createBlock(
  blockName: BlockName,
  capabilities: ICapabilities | null
): IBlock {
  const component = BLOCK_REGISTRY[blockName];

  if (!component) {
    throw new Error(`Unknown block: ${blockName}`);
  }

  // Check if block is in capabilities.blocks array
  const enabled = capabilities?.blocks?.includes(blockName) ?? false;

  return {
    name: blockName,
    component,
    enabled,
  };
}

export function createEnabledBlocks(capabilities: ICapabilities): IBlock[] {
  // Return only blocks that are enabled for this market
  return capabilities.blocks.map((blockName) =>
    createBlock(blockName as BlockName, capabilities)
  );
}
```

### Block Rendering

**Location**: `apps/transfer/src/hooks/useBlockRenderer.tsx`

```typescript
export function useBlockRenderer(screenName: ScreenName) {
  const { capabilities } = useAppContext();

  // Create router based on capabilities
  const router = useMemo(
    () => (capabilities ? new BlockRouter(capabilities) : null),
    [capabilities]
  );

  // Get all enabled blocks
  const blocks = useMemo(
    () => (capabilities ? createEnabledBlocks(capabilities) : []),
    [capabilities]
  );

  // Get blocks for this specific screen
  const screenBlockNames = useMemo(
    () => router?.getBlocksForScreen(screenName) || [],
    [router, screenName]
  );

  // Filter blocks to only those for this screen
  const filteredBlocks = useMemo(
    () => blocks.filter((block) => screenBlockNames.includes(block.name)),
    [blocks, screenBlockNames]
  );

  // Render function
  const renderBlocks = useMemo(
    () =>
      (
        blockPropsMap: Record<string, any> = {},
        wrapper?: (children: React.ReactNode, key: string) => React.ReactElement
      ) => {
        return filteredBlocks.map((block) => {
          const props = blockPropsMap[block.name] || {};
          const BlockComponent = block.component;

          const element = <BlockComponent key={block.name} {...props} />;

          if (wrapper) {
            return wrapper(element, block.name);
          }

          return element;
        });
      },
    [filteredBlocks]
  );

  return {
    blocks: filteredBlocks,
    blockNames: screenBlockNames,
    router,
    capabilities,
    renderBlocks,
  };
}
```

### Using Blocks in Screens

**Example**: `apps/transfer/src/screens/EnterAmount.tsx`

```typescript
const EnterAmount: React.FC<Props> = () => {
  // Get blocks for this screen
  const { renderBlocks, capabilities } = useBlockRenderer("EnterAmount");

  // Define block props
  const blockProps = {
    AmountInputBlock: {
      amount: amount,
      onAmountChange: setAmount,
      currency: capabilities?.currency,
    },
    TipBlock: {
      tip: tip,
      onTipChange: setTip,
      currency: capabilities?.currency,
    },
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Render all blocks configured for this screen */}
        {renderBlocks(blockProps, (children, key) => (
          <View key={key} style={styles.row}>
            {children}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
```

### Block Flow Through Screens

```
Landing Screen
    ↓ (user starts transfer)
TransferTo Screen
    └─ RecipientSelectionBlock (choose who to send to)
    ↓
EnterAmount Screen
    ├─ AmountInputBlock (enter amount)
    ├─ TipBlock (optional tip - if enabled in market)
    ├─ TransferDetailsBlock (notes, reference)
    ↓
TransferDetails Screen
    └─ Shows summary
    ↓
Confirmation Screen
    ├─ ConfirmationBlock (review everything)
    ├─ Show recipient, amount, fees
    ↓
EndFlow Screen
    └─ ResultBlock (success/failure message)
```

---

## Capabilities System

### What are Capabilities?

Capabilities define what features and constraints apply to each market. They're loaded from JSON configuration files.

### Capability Interface

**Location**: `apps/transfer/src/core/CapabilityLoader.ts`

```typescript
export interface ICapabilities {
  currency: string; // "IDR", "MYR", etc.
  market: string; // "ID", "MY", etc.
  blocks: string[]; // List of enabled blocks for this market
  features: {
    tip: {
      enabled: boolean; // Can users add tips?
    };
    fees: {
      enabled: boolean; // Are fees applicable?
      visible: boolean; // Show fees to user?
    };
    recipient: {
      enabled: boolean; // Can user select recipients?
      editable: boolean; // Can user edit recipient?
    };
    recurring: {
      enabled: boolean; // Recurring transfers?
    };
  };
  validation: {
    minAmount: number; // Minimum transaction amount
    maxAmount: number; // Maximum transaction amount
  };
}
```

### Loading Capabilities

```typescript
export async function loadCapabilities(
  market: "MY" | "ID"
): Promise<ICapabilities> {
  try {
    if (market === "MY") {
      const capsMY = await import("../configs/my.json");
      return capsMY.default;
    } else if (market === "ID") {
      const capsID = await import("../configs/id.json");
      return capsID.default;
    }
    throw new Error(`Unknown market: ${market}`);
  } catch (err) {
    console.error(`Failed to load capabilities for ${market}:`, err);
    throw err;
  }
}
```

### Indonesia Capabilities (QRIS)

**Location**: `apps/transfer/src/configs/id.json`

```json
{
  "currency": "IDR",
  "market": "ID",
  "blocks": [
    "AccountDetailBlock",
    "AccountListBlock",
    "RecipientSelectionBlock",
    "AmountInputBlock",
    "TransferDetailsBlock",
    "ConfirmationBlock",
    "ResultBlock"
  ],
  "features": {
    "tip": {
      "enabled": true
    },
    "fees": {
      "enabled": true,
      "visible": true
    },
    "recipient": {
      "enabled": true,
      "editable": true
    },
    "recurring": {
      "enabled": false
    }
  },
  "validation": {
    "minAmount": 1000,
    "maxAmount": 999999999.99
  }
}
```

**Indonesia Characteristics**:

- ✅ Tips enabled (QRIS feature)
- ❌ No recurring transfers
- Amount range: 1,000 - 999,999,999.99 IDR
- Shows 7 blocks/sections

### Malaysia Capabilities (DuitNow)

**Location**: `apps/transfer/src/configs/my.json`

```json
{
  "currency": "MYR",
  "market": "MY",
  "blocks": [
    "AccountDetailBlock",
    "AccountListBlock",
    "RecipientSelectionBlock",
    "AmountInputBlock",
    "TransferDetailsBlock",
    "ConfirmationBlock",
    "RecurringBlock",
    "ResultBlock"
  ],
  "features": {
    "tip": {
      "enabled": false
    },
    "fees": {
      "enabled": true,
      "visible": true
    },
    "recipient": {
      "enabled": true,
      "editable": true
    },
    "recurring": {
      "enabled": true
    }
  },
  "validation": {
    "minAmount": 0.01,
    "maxAmount": 999999.99
  }
}
```

**Malaysia Characteristics**:

- ❌ Tips disabled (DuitNow limitation)
- ✅ Recurring transfers enabled
- Amount range: 0.01 - 999,999.99 MYR
- Shows 8 blocks/sections (includes RecurringBlock)

### AppContext - Global Access

**Location**: `apps/transfer/src/contexts/AppContext.tsx`

```typescript
interface AppContextType {
  capabilities: ICapabilities | null;
  adapter: BaseAdapter;
  loading: boolean;
  error: Error | null;
}

export function AppProvider({ market, children }: AppProviderProps) {
  const [capabilities, setCapabilities] = useState<ICapabilities | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const adapter = useMemo(() => getAdapter(market), [market]);

  useEffect(() => {
    async function initializeCapabilities() {
      try {
        const caps = await loadCapabilities(market);
        setCapabilities(caps);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }

    initializeCapabilities();
  }, [market]);

  return (
    <AppContext.Provider value={{ capabilities, adapter, loading, error }}>
      {children}
    </AppContext.Provider>
  );
}

// Access anywhere in app
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
```

---

## Adapters

### What are Adapters?

Adapters handle market-specific logic for transaction processing. They transform generic transaction data into market-specific formats.

### Base Adapter

**Location**: `apps/transfer/src/adapters/base.ts`

```typescript
export interface FormattedPayload {
  merchantId: string;
  merchantName: string;
  amount: number;
  tip?: number;
  currency: string;
  market: string;
  compliance?: string;
  timestamp: string;
  nonce: string;
}

export class BaseAdapter {
  protected market: string;
  protected currency: string;
  protected compliance: string;

  constructor(market: string, currency: string, compliance: string) {
    this.market = market;
    this.currency = currency;
    this.compliance = compliance;
  }

  /**
   * Transform raw data to market-specific format
   */
  formatPayload(payload: any): FormattedPayload {
    return {
      merchantId: payload.merchantId,
      merchantName: payload.merchantName,
      amount: payload.amount,
      tip: payload.tip || 0,
      currency: this.currency,
      market: this.market,
      compliance: this.compliance,
      timestamp: payload.timestamp || new Date().toISOString(),
      nonce: payload.nonce,
    };
  }

  /**
   * Validate market-specific constraints
   */
  validatePayload(payload: any): boolean {
    return (
      Boolean(payload.merchantId) &&
      Boolean(payload.merchantName) &&
      typeof payload.amount === "number" &&
      payload.amount > 0
    );
  }

  /**
   * Provide market-specific HTTP headers
   */
  getRequestHeaders(): Record<string, string> {
    return {
      "X-Market": this.market,
      "X-Compliance": this.compliance,
    };
  }

  /**
   * Parse market-specific API response
   */
  parseResponse(response: any): any {
    return response;
  }

  /**
   * Handle market-specific errors
   */
  handleError(error: any): string {
    return error.message || "Transaction failed";
  }
}
```

### Indonesia Adapter (QRIS)

**Location**: `apps/transfer/src/adapters/countries/id.ts`

```typescript
export class IDAdapter extends BaseAdapter {
  constructor() {
    super("ID", "IDR", "QRIS");
  }

  override formatPayload(payload: any): FormattedPayload {
    const formatted = super.formatPayload(payload);
    const tipIncluded = payload.tip && payload.tip > 0;

    return {
      ...formatted,
      compliance: "QRIS",
      tipIncluded,
      ...(payload.reference && { qrisReference: payload.reference }),
    };
  }

  override validatePayload(payload: any): boolean {
    if (!super.validatePayload(payload)) return false;

    // QRIS limit: 1,000 - 999,999,999.99 IDR
    if (payload.amount < 1000 || payload.amount > 999999999.99) return false;

    if (payload.tip && payload.tip < 0) return false;

    return true;
  }

  override getRequestHeaders(): Record<string, string> {
    return {
      ...super.getRequestHeaders(),
      "X-BI-Regulation": "QRIS-2024",
      "X-Language": "id-ID",
    };
  }

  override handleError(error: any): string {
    const errorMap: Record<string, string> = {
      BI_001: "QRIS merchant not registered",
      BI_002: "Transaction amount exceeds QRIS limit",
      BI_003: "QRIS network timeout",
      BI_004: "Invalid merchant QRIS data",
    };
    return errorMap[error.code] || error.message || "Transaction failed";
  }
}
```

### Malaysia Adapter (DuitNow)

**Location**: `apps/transfer/src/adapters/countries/my.ts`

```typescript
export class MYAdapter extends BaseAdapter {
  constructor() {
    super("MY", "MYR", "DUITNOW");
  }

  override formatPayload(payload: any): FormattedPayload {
    const formatted = super.formatPayload(payload);

    return {
      ...formatted,
      compliance: "DUITNOW",
      ...(payload.reference && { reference: payload.reference }),
    };
  }

  override validatePayload(payload: any): boolean {
    if (!super.validatePayload(payload)) return false;

    // DuitNow limit: 0.01 - 999,999.99 MYR
    if (payload.amount <= 0 || payload.amount > 999999.99) return false;

    return true;
  }

  override getRequestHeaders(): Record<string, string> {
    return {
      ...super.getRequestHeaders(),
      "X-BNM-Regulation": "ACR-2024",
      "X-Language": "en-MY",
    };
  }

  override handleError(error: any): string {
    const errorMap: Record<string, string> = {
      BNM_001: "Merchant not registered with BNM",
      BNM_002: "Transaction amount exceeds limit",
      BNM_003: "Duplicate transaction detected",
      DN_TIMEOUT: "DuitNow service timeout",
    };
    return errorMap[error.code] || error.message || "Transaction failed";
  }
}
```

### Adapter Factory

**Location**: `apps/transfer/src/adapters/index.ts`

```typescript
export function getAdapter(market: "MY" | "ID"): BaseAdapter {
  switch (market) {
    case "MY":
      return new MYAdapter();
    case "ID":
      return new IDAdapter();
    default:
      console.warn(`Unknown market: ${market}, defaulting to Malaysia`);
      return new MYAdapter();
  }
}
```

---

## Validators

### What are Validators?

Validators ensure transaction data meets business rules before submission. They work independently from adapters.

### TransactionValidator

**Location**: `apps/transfer/src/validators/TransactionValidator.ts`

```typescript
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class TransactionValidator {
  /**
   * Validate merchant information
   */
  static validateMerchant(data: TransactionData): ValidationResult {
    const errors: string[] = [];

    if (!data.merchantId || data.merchantId.trim().length === 0) {
      errors.push("Merchant ID is required");
    }

    if (!data.merchantName || data.merchantName.trim().length === 0) {
      errors.push("Merchant name is required");
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate transaction amount
   */
  static validateAmount(
    amount: number,
    capabilities: ICapabilities
  ): ValidationResult {
    const errors: string[] = [];

    if (typeof amount !== "number" || amount <= 0) {
      errors.push("Amount must be greater than 0");
    }

    if (amount < capabilities.validation.minAmount) {
      errors.push(
        `Amount must be at least ${capabilities.validation.minAmount} ${capabilities.currency}`
      );
    }

    if (amount > capabilities.validation.maxAmount) {
      errors.push(
        `Amount cannot exceed ${capabilities.validation.maxAmount} ${capabilities.currency}`
      );
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate tip/gratuity
   */
  static validateTip(
    tip: number | undefined,
    capabilities: ICapabilities
  ): ValidationResult {
    const errors: string[] = [];

    if (tip !== undefined && tip > 0) {
      if (!capabilities.features.tip.enabled) {
        errors.push("Tip is not enabled for this market");
      } else if (typeof tip !== "number" || tip < 0) {
        errors.push("Tip must be a positive number");
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate complete transaction
   */
  static validateTransaction(
    data: TransactionData,
    capabilities: ICapabilities
  ): ValidationResult {
    const errors: string[] = [];

    // Accumulate all errors
    errors.push(...this.validateMerchant(data).errors);
    errors.push(...this.validateAmount(data.amount, capabilities).errors);
    errors.push(...this.validateTip(data.tip, capabilities).errors);

    return { valid: errors.length === 0, errors };
  }
}
```

### Validation Example

```typescript
// User enters: amount = 500 IDR (below 1000 minimum)
const result = TransactionValidator.validateTransaction(
  {
    merchantId: 'MER_001',
    merchantName: '7-Eleven',
    amount: 500,
    tip: 10000,
  },
  capabilities // Indonesia with minAmount: 1000
);

// Result:
{
  valid: false,
  errors: [
    'Amount must be at least 1000 IDR'
  ]
}
```

---

## Services

### TransactionService

**Location**: `apps/transfer/src/services/TransactionService.ts`

The service orchestrates the complete transaction workflow:

```typescript
export class TransactionService implements ITransactionService {
  private adapter: BaseAdapter;
  private capabilities: ICapabilities;

  constructor(adapter: BaseAdapter, capabilities: ICapabilities) {
    this.adapter = adapter;
    this.capabilities = capabilities;
  }

  /**
   * Complete transaction submission workflow
   */
  async submitTransaction(data: TransactionData): Promise<TransactionResult> {
    try {
      // Step 1: Validate transaction
      const validation = this.validateTransaction(data);
      if (!validation.valid) {
        return {
          success: false,
          message: validation.errors.join(", "),
        };
      }

      // Step 2: Format payload
      const payload = this.adapter.formatPayload({
        ...data,
        timestamp: new Date().toISOString(),
        nonce: Math.random().toString(36).substring(7),
      });

      // Step 3: Validate formatted payload
      if (!this.adapter.validatePayload(payload)) {
        return {
          success: false,
          message: "Invalid payload format",
        };
      }

      // Step 4: Generate transaction ID
      const transactionId = `TXN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      // Step 5: Return success
      return {
        success: true,
        transactionId,
        message: "Transaction completed successfully",
        payload,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Transaction failed",
      };
    }
  }

  validateTransaction(data: TransactionData) {
    return TransactionValidator.validateTransaction(data, this.capabilities);
  }
}
```

### useTransaction Hook

**Location**: `apps/transfer/src/hooks/useTransaction.ts`

```typescript
export function useTransaction() {
  const { adapter, capabilities } = useAppContext();

  const submitTransaction = useCallback(
    async (data: TransactionData) => {
      const service = new TransactionService(adapter, capabilities!);
      return service.submitTransaction(data);
    },
    [adapter, capabilities]
  );

  return { submitTransaction };
}
```

---

## How Everything Works Together

### Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
│              (EnterAmount screen)                           │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   useBlockRenderer Hook          │
        │                                 │
        │ • Gets capabilities             │
        │ • Creates enabled blocks        │
        │ • Returns renderBlocks()        │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   Render Blocks (UI)            │
        │                                 │
        │ • AmountInputBlock              │
        │ • TipBlock (if enabled)         │
        │ • TransferDetailsBlock          │
        └─────────────────────────────────┘
                          │
              User presses "Confirm"
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   useTransaction Hook           │
        │   submitTransaction()           │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   TransactionService            │
        │   .submitTransaction()          │
        └─────────────────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         │                                 │
         ▼                                 ▼
    ┌─────────────┐              ┌──────────────────┐
    │  Validator  │              │     Adapter      │
    │             │              │                  │
    │ • Merchant  │              │ • formatPayload  │
    │ • Amount    │              │ • validatePayload│
    │ • Tip       │              │ • getHeaders     │
    └─────────────┘              └──────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        │
                  All valid? ✓
                        │
         ┌──────────────▼──────────────┐
         │  Generate Transaction ID    │
         │  TXN-{timestamp}-{random}   │
         └──────────────┬──────────────┘
                        │
         ┌──────────────▼──────────────┐
         │  Return TransactionResult   │
         │                            │
         │ {                          │
         │   success: true,           │
         │   transactionId: "...",    │
         │   payload: {...}           │
         │ }                          │
         └──────────────┬──────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │   Navigation to EndFlow Screen  │
        │   (Show success/failure)        │
        └─────────────────────────────────┘
```

### Data Flow Step by Step

#### Step 1: App Initialization

```typescript
// TransferNavigator.tsx
export const TransferNavigator = () => {
  const market = "MY"; // From host app or env

  return (
    <AppProvider market={market}>
      <NavigatorScreens />
    </AppProvider>
  );
};
```

#### Step 2: AppProvider Loads Configuration

```typescript
// AppContext.tsx
const AppProvider = ({ market, children }) => {
  // Load capabilities for market
  const caps = await loadCapabilities(market); // Loads my.json

  // Get adapter for market
  const adapter = getAdapter(market); // Returns MYAdapter

  // Provide to all children
  return (
    <AppContext.Provider value={{ capabilities: caps, adapter }}>
      {children}
    </AppContext.Provider>
  );
};
```

#### Step 3: Screen Renders Blocks

```typescript
// EnterAmount.tsx
const EnterAmount = () => {
  // Get blocks for this screen
  const { renderBlocks, capabilities } = useBlockRenderer("EnterAmount");

  // Malaysia: Shows AmountInputBlock + TipBlock (if enabled)
  // Indonesia: Shows AmountInputBlock only (tips not enabled)

  return renderBlocks(blockProps);
};
```

#### Step 4: User Enters Data

```
User enters:
- amount: 100 MYR
- tip: 5 MYR
- merchant: 7-Eleven
```

#### Step 5: Transaction Validation & Submission

```typescript
// User presses Confirm
const handleSubmit = async () => {
  const result = await submitTransaction({
    merchantId: "MER_001",
    merchantName: "7-Eleven",
    amount: 100,
    tip: 5,
  });

  // Service validates → formats → generates ID
  // Returns: { success: true, transactionId: "TXN-..." }
};
```

---

## Complete Data Flow Example

### Scenario: Malaysia Transfer with Recurring

**Market**: Malaysia (MY)  
**Capabilities**: Tips disabled, recurring enabled  
**Amount**: 100 MYR

### Flow:

```
┌─ App Initialization ─────────────────────────────┐
│ 1. Load Malaysia capabilities (my.json)         │
│ 2. Features: recurring=true, tips=false          │
│ 3. Blocks: 8 total (includes RecurringBlock)    │
│ 4. Get MYAdapter                                │
│ 5. Currency: MYR                                │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────▼─────────────┐
        │  TransferTo Screen      │
        │  Shows: Bank selector   │
        │  Block: RecipientSelection
        │  User selects: Maybank  │
        └───────────┬─────────────┘
                    │
        ┌───────────▼──────────────┐
        │  EnterAmount Screen      │
        │  Blocks rendered:        │
        │  ✓ AmountInputBlock      │
        │  ✗ TipBlock (disabled)   │
        │  ✓ TransferDetailsBlock  │
        │  User enters: 100 MYR    │
        └───────────┬──────────────┘
                    │
        ┌───────────▼──────────────┐
        │  TransferDetails Screen  │
        │  Blocks rendered:        │
        │  ✓ RecurringBlock        │
        │  User sets: Monthly      │
        └───────────┬──────────────┘
                    │
        ┌───────────▼────────────────────┐
        │  Confirmation Screen           │
        │  Review:                       │
        │  • To: Maybank                 │
        │  • Amount: 100 MYR             │
        │  • Recurring: Monthly          │
        │  • Tip: Not shown (disabled)   │
        │                                │
        │  User presses: Confirm         │
        └───────────┬────────────────────┘
                    │
        ┌───────────▼──────────────────────┐
        │  TransactionService              │
        │                                  │
        │  [1] Validate                   │
        │  ✓ Merchant: "Maybank"          │
        │  ✓ Amount: 100 (0.01-999999.99) │
        │  ✓ Tip: undefined (OK, disabled)│
        │  → { valid: true, errors: [] }  │
        │                                  │
        │  [2] Format with MYAdapter      │
        │  • formatPayload()              │
        │  • currency: "MYR"              │
        │  • market: "MY"                 │
        │  • compliance: "DUITNOW"        │
        │  • recurring: true              │
        │  • timestamp: ISO string        │
        │  • nonce: random string         │
        │                                  │
        │  [3] Validate Payload           │
        │  • validatePayload()            │
        │  • Amount in range? YES         │
        │  → true                         │
        │                                  │
        │  [4] Generate ID                │
        │  • TXN-1702857600000-ABC123DEF  │
        │                                  │
        │  [5] Return Result              │
        │  {                              │
        │    success: true,               │
        │    transactionId: "TXN-...",    │
        │    payload: {...}               │
        │  }                              │
        └───────────┬──────────────────────┘
                    │
        ┌───────────▼──────────────┐
        │  EndFlow Screen          │
        │  (Success Page)          │
        │                          │
        │  Show:                   │
        │  ✓ Success message       │
        │  ✓ Transaction ID        │
        │  ✓ Amount: 100 MYR       │
        │  ✓ Receipt details       │
        │  ✓ "Make Another Transfer"
        │     button               │
        └──────────────────────────┘
```

---

## Adding New Features

### Adding a New Block

#### 1. Create Block in ui-kit

```typescript
// packages/ui-kit/src/blocks/NewBlock/NewBlock.tsx

export interface NewBlockProps {
  data: string;
  onDataChange: (data: string) => void;
}

export const NewBlock: React.FC<NewBlockProps> = ({ data, onDataChange }) => {
  return (
    <View>
      <Text>{data}</Text>
      <TextInput onChangeText={onDataChange} />
    </View>
  );
};
```

#### 2. Register in BlockFactory

```typescript
// apps/transfer/src/core/BlockFactory.tsx

export type BlockName = "RecipientSelectionBlock" | "..." | "NewBlock"; // Add this

const BLOCK_REGISTRY: Record<BlockName, React.ComponentType<any>> = {
  RecipientSelectionBlock: SearchableFilteredListTransferTo,
  // ...
  NewBlock: NewBlock, // Add this
};
```

#### 3. Add to BlockRouter

```typescript
// apps/transfer/src/core/BlockRouter.ts
const SCREEN_BLOCKS: Record<ScreenName, BlockName[]> = {
  EnterAmount: ["AmountInputBlock", "TipBlock", "NewBlock"], // Add here
  // ...
};
```

#### 4. Enable per Market

```typescript
// apps/transfer/src/configs/id.json
{
  "blocks": [
    "AccountDetailBlock",
    "NewBlock", // Add this
    // ...
  ]
}
```

### Adding a New Market

#### 1. Create Adapter

```typescript
// apps/transfer/src/adapters/countries/sg.ts

export class SGAdapter extends BaseAdapter {
  constructor() {
    super("SG", "SGD", "PAYNOW");
  }
  // Override methods...
}
```

#### 2. Create Config

```typescript
// apps/transfer/src/configs/sg.json

{
  "currency": "SGD",
  "market": "SG",
  "blocks": [...],
  "features": {...},
  "validation": {...}
}
```

#### 3. Register Adapter

```typescript
// apps/transfer/src/adapters/index.ts

export function getAdapter(market: "MY" | "ID" | "SG") {
  switch (market) {
    case "SG":
      return new SGAdapter();
    // ...
  }
}
```

#### 4. Update CapabilityLoader

```typescript
// apps/transfer/src/core/CapabilityLoader.ts

export async function loadCapabilities(market: "MY" | "ID" | "SG") {
  if (market === "SG") {
    const capsSG = await import("../configs/sg.json");
    return capsSG.default;
  }
  // ...
}
```

---

## Summary

The Transfer app architecture provides:

✅ **Scalability** - Add markets without changing existing code  
✅ **Flexibility** - Enable/disable features per market via config  
✅ **Maintainability** - Each concern (blocks, adapters, validators) is isolated  
✅ **Testability** - Components can be tested independently  
✅ **Reusability** - Blocks and adapters are composable and reusable

**Key Patterns Used:**

- **Factory Pattern** - Block and Adapter creation
- **Strategy Pattern** - Market-specific adapters
- **Provider Pattern** - AppContext for global state
- **Configuration-Driven Design** - JSON configs determine features

**Flow Summary:**

1. Market selected → Load capabilities + adapter (AppProvider)
2. Screen rendered → Select blocks based on capabilities (useBlockRenderer)
3. User interaction → Collect transaction data (Blocks)
4. Submission → Validate, format, generate ID (TransactionService)
5. Result → Show success/failure (EndFlow screen)
