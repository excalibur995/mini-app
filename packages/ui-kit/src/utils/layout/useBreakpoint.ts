import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export interface WindowDimensions {
  width: number;
  height: number;
}

export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => {
    const window = Dimensions.get("window");
    return {
      width: window.width,
      height: window.height,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}
