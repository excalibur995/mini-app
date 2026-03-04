import numeral from "numeral";

export function prepareAccountNumber(
  accountNumber: number | string,
  length?: number
): string {
  if (typeof accountNumber === "number" || typeof accountNumber === "string") {
    const stringNumber = accountNumber.toString();
    const trimLength = length ? length : stringNumber.length;
    const trimmedValue = stringNumber.substring(0, trimLength);
    const formatedNumber = trimmedValue
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    return formatedNumber;
  } else {
    return "N/A";
  }
}

export function prepareAmount(
  amount?: number | string,
  currency: string = "RM",
  asterisk?: boolean
): string {
  amount = amount ? amount : 0;
  currency = currency ? currency : "N/A";

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return `${currency} 0.00`;

  const sign = Math.sign(numericAmount) === -1 ? "-" : "";
  const formattedAmount = numeral(Math.abs(numericAmount)).format("0,0.00");

  return `${sign}${currency} ${formattedAmount}${asterisk ? "*" : ""}`;
}

export const maskAccountNumber = (accountNumber: string): string => {
  let acc = accountNumber.substring(0, 12);
  let mask = "**** **** " + acc.substring(8, 12);
  return mask;
};

export interface MaskTextOptions {
  visibleCount?: number;
  position?: "prefix" | "suffix";
  maskChar?: string;
  grouping?: number;
  totalLength?: number;
  cleanNonAlphanumeric?: boolean;
  maxVisibleLength?: number;
}

export const maskText = (
  input: string,
  {
    visibleCount,
    position = "suffix",
    maskChar = "*",
    grouping,
    totalLength,
    cleanNonAlphanumeric = false,
    maxVisibleLength,
  }: MaskTextOptions
): string => {
  if (!input) return "N/A";

  let text = input;

  if (cleanNonAlphanumeric) {
    text = text.replace(/[^\dA-Z]/gi, "");
  }

  if (maxVisibleLength) {
    text = text.substring(0, maxVisibleLength);
  }

  if (typeof visibleCount === "number") {
    const len = totalLength ? Math.min(text.length, totalLength) : text.length;
    const visiblePart =
      position === "prefix"
        ? text.substring(0, visibleCount)
        : text.substring(len - visibleCount);
    const maskedPart = maskChar.repeat(len - visibleCount);

    text =
      position === "prefix"
        ? visiblePart + maskedPart
        : maskedPart + visiblePart;
  }

  if (grouping && grouping > 0) {
    return text.match(new RegExp(`.{1,${grouping}}`, "g"))?.join(" ") ?? text;
  }

  return text;
};

export function formatNumber(
  value: number | string | null | undefined,
  decimals?: boolean
): string {
  if (value === null || value === undefined || value === "") {
    return decimals ? "0.00" : "0";
  }

  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return decimals ? "0.00" : "0";
  }

  if (decimals) {
    const formatted = numeral(numericValue).format("0,0.00");
    return formatted;
  } else {
    const formatted = numeral(numericValue).format("0,0");
    return formatted;
  }
}
