import React from "react";
import { SvgXml } from "react-native-svg";

/**
 * Wraps raw SVG XML strings into React components that use SvgXml
 * With asset/source, rspack provides raw SVG XML directly (no encoding needed)
 */
export function wrapSvgAsComponent(svgXml: string, displayName?: string) {
  const Component = (props: any) => {
    return <SvgXml xml={svgXml} {...props} />;
  };

  if (displayName) {
    Component.displayName = displayName;
  }

  return Component;
}
