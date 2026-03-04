import { useMemo } from "react";
import { PixelRatio } from "react-native";

interface Breakpoint {
  threshold: number;
  value: number;
}

const breakpoints: Breakpoint[] = [
  { threshold: 1.2, value: 2 },
  { threshold: 1.3, value: 4 },
];

const scaleControl = (deviceFontScale: number): number => {
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (deviceFontScale >= breakpoints[i].threshold) {
      return breakpoints[i].value;
    }
  }
  return 0;
};

export type ScaleFunction = (value: number | undefined) => number | undefined;

export interface UseScaleReturn {
  deviceFontScale: number;
  scale: ScaleFunction;
}

export const useScale = (): UseScaleReturn => {
  const deviceFontScale = PixelRatio.getFontScale();

  const scale = useMemo((): ScaleFunction => {
    const scaleFn: ScaleFunction = (value) =>
      value === undefined ? undefined : value + scaleControl(deviceFontScale);

    return scaleFn;
  }, [deviceFontScale]);

  return {
    deviceFontScale,
    scale,
  };
};
