import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

export type ScreenName =
  | 'TransferListScreen'
  | 'BankListScreen'
  | 'TransferAccountDetailScreen'
  | 'TransferAmountScreen'
  | 'TransferMethodScreen'
  | 'TransferConfirmationScreen';

export interface BankData {
  id: string;
  name: string;
  logoSource: ImageSourcePropType;
}

export interface RecipientData {
  name: string;
  bank: string;
  accountNumber: string;
  initials: string;
  bankLogo?: ImageSourcePropType;
}

export interface FromAccountData {
  accountName: string;
  accountNumber: string;
  balance: string;
  bankLogo?: ImageSourcePropType;
}

export interface TransferData {
  recipient: RecipientData;
  fromAccount: FromAccountData;
  amount: string;
  currency: string;
  isScheduled: boolean;
  isRecurring: boolean;
}

export type MainNavigatorParamList = {
  TransferListScreen: undefined;
  BankListScreen: undefined;
  TransferAccountDetailScreen?: {
    bank?: BankData;
  };
  TransferAmountScreen?: {
    recipient?: RecipientData;
    fromAccount?: FromAccountData;
  };
  TransferMethodScreen?: {
    transferData?: TransferData;
  };
  TransferConfirmationScreen?: {
    transferData?: TransferData;
    transferMethod?: string;
    transferFee?: number;
  };
};

export type TransferListScreenProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'TransferListScreen'
>;

export type BankListScreenProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'BankListScreen'
>;

export type TransferAccountDetailScreenProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'TransferAccountDetailScreen'
>;

export type TransferAmountScreenProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'TransferAmountScreen'
>;

export type TransferMethodScreenProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'TransferMethodScreen'
>;

export type TransferConfirmationProps = NativeStackScreenProps<
  MainNavigatorParamList,
  'TransferConfirmationScreen'
>;
