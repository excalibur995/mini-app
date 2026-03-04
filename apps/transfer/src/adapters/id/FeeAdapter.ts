import { FeeAdapter } from '../base/FeeAdapter';

export class IDFeeAdapter extends FeeAdapter {
  constructor() {
    super('ID', 'IDR');
  }

  override calculateFee(_amount: number, transferMethod: string): number {
    const feeMap: Record<string, number> = {
      'BI-FAST': 2500,
      'BI-SKN': 1500,
      'Transfer Online': 3000,
      RTGS: 5000,
    };
    return feeMap[transferMethod] || 2500;
  }
}
