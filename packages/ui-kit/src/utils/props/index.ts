export function warnIfMissingProps(
  componentName: string,
  props: Record<string, any>,
  requiredKeys: string[]
): void {
  requiredKeys.forEach((key) => {
    if (props[key] === undefined || props[key] === null) {
      console.warn(`[${componentName}] Missing required prop: \`${key}\``);
    }
  });
}
