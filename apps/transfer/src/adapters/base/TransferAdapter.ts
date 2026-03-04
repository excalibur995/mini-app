export interface TransferMode {
  id: string;
  title: string;
  name?: string;
  description?: string;
  currency: 'MYR' | 'IDR' | 'SGD';
  serviceFee: number;
  transactionLimit: number;
  operatingHours: string;
  logoSource: { uri: string };
  tableData?: (string | number)[][];
  tableTitle?: string;
  tableSubheading?: string;
}

export abstract class TransferAdapter {
  protected market: string;

  constructor(market: string) {
    this.market = market;
  }

  abstract getTransferModes(): TransferMode[];

  getTransferModeById(id: string): TransferMode | undefined {
    return this.getTransferModes().find(mode => mode.id === id);
  }

  getTransferModeByName(name: string): TransferMode | undefined {
    return this.getTransferModes().find(mode => mode.name === name);
  }

  abstract getMockBalance(): number;
}
