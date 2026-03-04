import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 402,
  lg: 430,
};

export type Breakpoint = "xs" | "sm" | "md" | "lg";

export interface ResponsiveValues {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
}

export const useResponsive = (): ResponsiveValues => {
  const { width, height } = useWindowDimensions();

  const currentBreakpoint = useMemo((): Breakpoint => {
    if (width <= breakpoints.xs) return "xs";
    if (width <= breakpoints.sm) return "sm";
    if (width <= breakpoints.md) return "md";
    return "lg";
  }, [width]);

  console.log(width);

  const isXs = width <= breakpoints.xs;
  const isSm = width > breakpoints.xs && width <= breakpoints.sm;
  const isMd = width > breakpoints.sm && width <= breakpoints.md;
  const isLg = width > breakpoints.md;

  return {
    width,
    height,
    breakpoint: currentBreakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
  };
};

export interface ResponsiveValueMap<T> {
  default: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
}

export const getResponsiveValue = <T>(
  values: ResponsiveValueMap<T>,
  breakpoint: Breakpoint
): T => {
  return values[breakpoint] ?? values.default;
};
