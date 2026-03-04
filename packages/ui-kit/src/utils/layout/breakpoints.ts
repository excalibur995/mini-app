import { Dimensions } from "react-native";

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function getBreakpointFromWidth(width?: number): Breakpoint {
  const screenWidth = width ?? Dimensions.get("window").width;

  if (screenWidth < BREAKPOINTS.sm) return "xs";
  if (screenWidth < BREAKPOINTS.md) return "sm";
  if (screenWidth < BREAKPOINTS.lg) return "md";
  if (screenWidth < BREAKPOINTS.xl) return "lg";
  if (screenWidth < BREAKPOINTS.xxl) return "xl";
  return "xxl";
}

export function getBreakpointLabel(breakpoint: Breakpoint): string {
  const labels: Record<Breakpoint, string> = {
    xs: "Extra Small (< 576px)",
    sm: "Small (576-767px)",
    md: "Medium (768-991px)",
    lg: "Large (992-1199px)",
    xl: "Extra Large (1200-1399px)",
    xxl: "Extra Extra Large (≥ 1400px)",
  };
  return labels[breakpoint];
}

export function isMobile(width?: number): boolean {
  const screenWidth = width ?? Dimensions.get("window").width;
  return screenWidth < BREAKPOINTS.md;
}

export function isTablet(width?: number): boolean {
  const screenWidth = width ?? Dimensions.get("window").width;
  return screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;
}

export function isDesktop(width?: number): boolean {
  const screenWidth = width ?? Dimensions.get("window").width;
  return screenWidth >= BREAKPOINTS.xl;
}
