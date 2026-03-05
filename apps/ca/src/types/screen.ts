// ─── Navigate Action ─────────────────────────────────────────────────────────

export type NavigateActionPayload =
  | { direction: 'next'; navigation_type: 'push' | 'replace' | 'reset' }
  | { direction: 'back'; navigation_type: 'push' | 'replace' | 'reset' }
  | {
      direction: 'jump';
      target: string;
      navigation_type: 'push' | 'replace' | 'reset';
    };

export type ScreenAction = {
  id: number;
  key: string;
  type: 'navigate' | string;
  payload: NavigateActionPayload | Record<string, unknown>;
  analytics: unknown | null;
};

// ─── SDUI primitives ─────────────────────────────────────────────────────────

export type SduiBinding = {
  id: number;
  path: string;
  scope: string;
  defaultValue: unknown | null;
  syncOnChange: boolean;
  syncDebounceMs: number;
  onClear: unknown | null;
};

export type SduiValidation = {
  id: number;
  rule: string;
  value: unknown | null;
  message: string;
};

// ─── UI Components ────────────────────────────────────────────────────────────

export type RadioOption = {
  id: number;
  key: string;
  label: string;
  description: string | null;
  icon?: string | null;
};

export type UiRadioGroup = {
  __component: 'ui.radio-group';
  id: number;
  label: string | null;
  options: RadioOption[];
  binding: SduiBinding | null;
  validation: SduiValidation[];
  visibility: unknown | null;
};

export type UiButton = {
  __component: 'ui.button';
  id: number;
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | string;
  action: ScreenAction | null;
  guardRules: unknown[];
  visibility: unknown | null;
};

// Union — extend as more component types are added
export type UiComponent = UiRadioGroup | UiButton;

// ─── Screen Meta ──────────────────────────────────────────────────────────────

export type ScreenMeta = {
  id: number;
  title: string;
  subtitle: string | null;
  showBack: boolean;
  showClose: boolean;
  analytics: unknown | null;
  onBack: ScreenAction | null;
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export type Screen = {
  id: number;
  documentId: string;
  screenId: string;
  meta: ScreenMeta;
  header: UiComponent[];
  body: UiComponent[];
  footer: UiComponent[];
};
