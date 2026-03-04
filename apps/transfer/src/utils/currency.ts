import countryConfig from '../../../../country-config.json';

/**
 * Get market/country code
 */
export const getMarket = (): string => {
  return countryConfig.country || 'ID';
};

/**
 * Get currency code based on country config
 */
export const getCurrency = (): string => {
  const currencyMap: Record<string, string> = {
    ID: 'IDR',
    MY: 'MYR',
  };
  return currencyMap[countryConfig.country] || 'IDR';
};

/**
 * Parse amount string to number
 * Removes commas and converts to float
 */
export const parseAmount = (amountString: string): number => {
  return parseFloat(amountString.replace(/,/g, ''));
};

/**
 * Format amount with currency
 * Returns formatted string like "IDR 1,500,000.00" or "MYR 1,500.00"
 */
export const formatAmount = (amount: number, currency?: string): string => {
  const curr = currency || getCurrency();
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${curr} ${formatted}`;
};

/**
 * Format amount without currency
 * Returns formatted string like "1,500,000.00"
 */
export const formatAmountOnly = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
