// src/theme/theme.ts
import { ThemeType } from "./type";

export const theme: ThemeType = {
  colors: {
    primary: "#ffc83d",
    background: "#ffffff",
    text: "#000000",
    secondary: "#4A90E2",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#9ca3af",
    border: "#e5e7eb",
    shadow: "rgba(0,0,0,0.08)",
    card: "#f3f4f6",
    gray: {
      light: "#f3f4f6",
      medium: "#e5e7eb",
      dark: "#6b7280",
    },
  },
  typography: {
    fontFamily: "System",
    fontSize: {
      small: 13,
      medium: 16,
      large: 18,
      xlarge: 24,
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 16,
    pill: 50,
  },
  shadows: {
    light: {
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  },
};
