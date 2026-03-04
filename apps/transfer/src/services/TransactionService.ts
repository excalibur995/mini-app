import { IJourney } from '../core/types';
import { CountryAdapter } from '../adapters';
import {
  TransactionData,
  TransactionResult,
  ITransactionService,
} from '../types';

export class TransactionService implements ITransactionService {
  private adapter: CountryAdapter;
  private journey: IJourney;

  constructor(adapter: CountryAdapter, journey: IJourney) {
    this.adapter = adapter;
    this.journey = journey;
  }

  async submitTransaction(data: TransactionData): Promise<TransactionResult> {
    try {
      // Create formatted payload
      const payload = {
        merchantId: data.merchantId || '',
        merchantName: data.merchantName || '',
        amount: data.amount,
        tip: data.tip,
        currency: this.journey.market === 'MY' ? 'MYR' : 'IDR',
        market: this.journey.market,
        timestamp: new Date().toISOString(),
        nonce: Math.random().toString(36).substring(7),
      };

      // Generate transaction ID
      const transactionId = `TXN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      return {
        success: true,
        transactionId,
        message: 'Transaction completed successfully',
        payload,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Transaction failed',
      };
    }
  }
}
