export abstract class FeeAdapter {
  protected market: string;
  protected currency: string;

  constructor(market: string, currency: string) {
    this.market = market;
    this.currency = currency;
  }

  abstract calculateFee(amount: number, transferMethod: string): number;

  calculateTotal(amount: number, fee: number): number {
    return amount + fee;
  }

  getFeeInfo(_transferMethod: string): { fee: number; description: string } {
    return {
      fee: 0,
      description: 'No fee information available',
    };
  }
}
