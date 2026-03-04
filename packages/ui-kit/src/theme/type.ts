// src/theme/types.ts
export interface ThemeType {
  colors: {
    primary: string;
    background: string;
    text: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    muted: string;
    border: string;
    shadow: string;
    card: string;
    gray: {
      light: string;
      medium: string;
      dark: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    fontWeight: {
      regular: "400" | "normal";
      medium: "500" | "medium";
      bold: "700" | "bold";
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  shadows: {
    light: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      shadowOffset?: { width: number; height: number };
      elevation: number;
    };
    medium: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      shadowOffset?: { width: number; height: number };
      elevation: number;
    };
  };
}
