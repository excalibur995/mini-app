import { FeeAdapter } from '../base/FeeAdapter';

export class MYFeeAdapter extends FeeAdapter {
  constructor() {
    super('MY', 'MYR');
  }

  override calculateFee(amount: number, transferMethod: string): number {
    const feeMap: Record<string, number | ((amt: number) => number)> = {
      'DuitNow Transfer': 0.5,
      'Interbank GIRO': amt => amt * 0.001,
      'Instant Transfer': 1.0,
      RENTAS: 2.0,
    };

    const fee = feeMap[transferMethod];
    if (typeof fee === 'function') {
      return fee(amount);
    }
    return fee || 0.5;
  }
}
