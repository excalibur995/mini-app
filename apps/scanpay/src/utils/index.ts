/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Format currency with proper separators
 */
export const formatCurrency = (amount: number, currency: string = 'MYR'): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Validate QR string format
 */
export const isValidQRString = (qrString: string): boolean => {
  if (isEmpty(qrString)) return false;
  // Basic validation - can be extended based on requirements
  return qrString.length > 0;
};
