export interface ShadowOptions {
  color?: string;
  height?: number;
  width?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { height: number; width: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const getShadow = ({
  color = "rgba(0,0,0, .4)",
  height = 4,
  width = 1,
  shadowOpacity = 0.2,
  shadowRadius = 2,
  elevation = 5,
}: ShadowOptions = {}): ShadowStyle => {
  return {
    shadowColor: color,
    shadowOffset: { height, width },
    shadowOpacity: shadowOpacity,
    shadowRadius: shadowRadius,
    elevation: elevation,
  };
};
