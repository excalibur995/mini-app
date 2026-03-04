export function is1DArray<T>(array: T[]): boolean {
  try {
    return array.every((item) => !Array.isArray(item));
  } catch {
    return false;
  }
}

export function convert1DArrayTo2DArray<T>(
  array: T[],
  numOfColumns: number
): T[][] {
  const grid: T[][] = [];
  for (let i = 0; i < array.length; i += numOfColumns) {
    grid.push(array.slice(i, i + numOfColumns));
  }
  return grid;
}
