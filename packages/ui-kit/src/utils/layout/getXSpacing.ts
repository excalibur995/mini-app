import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

export function getXSpacing(style: Style | Style[]): number {
  const flat = StyleSheet.flatten(style);

  const rawML = flat?.marginLeft;
  const rawMR = flat?.marginRight;
  const rawMH = flat?.marginHorizontal;
  const rawPL = flat?.paddingLeft;
  const rawPR = flat?.paddingRight;
  const rawPH = flat?.paddingHorizontal;

  const ml =
    typeof rawML === "number" ? rawML : typeof rawMH === "number" ? rawMH : 0;
  const mr =
    typeof rawMR === "number" ? rawMR : typeof rawMH === "number" ? rawMH : 0;
  const pl =
    typeof rawPL === "number" ? rawPL : typeof rawPH === "number" ? rawPH : 0;
  const pr =
    typeof rawPR === "number" ? rawPR : typeof rawPH === "number" ? rawPH : 0;

  return ml + mr + pl + pr;
}
