import { IDFeeAdapter, IDTransferAdapter } from './id';
import { MYFeeAdapter, MYTransferAdapter } from './my';

export interface CountryAdapter {
  fee: IDFeeAdapter | MYFeeAdapter;
  transfer: IDTransferAdapter | MYTransferAdapter;
}

export function getAdapter(market: 'MY' | 'ID'): CountryAdapter {
  switch (market) {
    case 'MY':
      return {
        fee: new MYFeeAdapter(),
        transfer: new MYTransferAdapter(),
      };
    case 'ID':
      return {
        fee: new IDFeeAdapter(),
        transfer: new IDTransferAdapter(),
      };
    default:
      return {
        fee: new IDFeeAdapter(),
        transfer: new IDTransferAdapter(),
      };
  }
}
