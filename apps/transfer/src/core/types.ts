export type ScreenName =
  | 'TransferListScreen'
  | 'BankListScreen'
  | 'TransferAmountScreen'
  | 'TransferAccountDetailScreen'
  | 'TransferConfirmationScreen'
  | 'TransferMethodScreen';

export interface IJourney {
  market: string;
  journey: string[];
}
