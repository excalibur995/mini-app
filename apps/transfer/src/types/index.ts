import { IJourney } from '../core/types';
import { CountryAdapter } from '../adapters';

export interface TransactionData {
  merchantId?: string;
  merchantName?: string;
  recipientAccount?: string;
  recipientName?: string;
  amount: number;
  tip?: number;
  description?: string;
  mode?: string;
  purpose?: string;
  remark?: string;
}

export interface TransactionResult {
  success: boolean;
  transactionId?: string;
  message: string;
  payload?: FormattedPayload;
}

export interface FormattedPayload {
  merchantId: string;
  merchantName: string;
  amount: number;
  tip?: number;
  currency: string;
  market: string;
  compliance?: string;
  timestamp: string;
  nonce: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface MerchantData {
  name: string;
  id: string;
  amount?: number;
  tip?: number;
}

export interface BaseBlockProps {
  merchantData: MerchantData;
}

export interface EditableBlockProps<T = number> extends BaseBlockProps {
  value: T;
  onChange: (value: T) => void;
}

export interface ITransactionService {
  submitTransaction(
    data: TransactionData,
    adapter: CountryAdapter,
    journey: IJourney,
  ): Promise<TransactionResult>;
}
