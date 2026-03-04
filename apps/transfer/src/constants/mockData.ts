import { images } from 'ui-kit';
import { AccountDetailProps, TransferModePropsWithTable } from 'ui-kit';
import { ExtendedChipProps } from 'ui-kit/ui/components/molecules/ChipList';

export const MOCK_ACCOUNT_CATEGORIES: ExtendedChipProps[] = [
  { title: 'All', variant: 'selectable' },
  {
    title: 'Frequent',
    variant: 'selectable',
    description:
      'Recipients you send money to regularly in the last 90 days will appear here.',
  },
  { title: 'Favourites', variant: 'selectable' },
  { title: 'Own', variant: 'selectable' },
];

export const MOCK_BANK_DATA = [
  {
    id: '1',
    name: 'Maybank',
    logoSource: images.maybankLogo,
    category: 'Banks',
  },
  {
    id: '2',
    name: 'CIMB Bank',
    logoSource: images.cimbLogo,
    category: 'Banks',
  },
  {
    id: '3',
    name: 'Public Bank',
    logoSource: images.publicBankLogo,
    category: 'Banks',
  },
  {
    id: '4',
    name: 'GrabPay',
    logoSource: images.grabpayLogo,
    category: 'eWallets',
  },
  {
    id: '5',
    name: 'Touch n Go',
    logoSource: images.tngLogo,
    category: 'eWallets',
  },
];

// Indonesia Transfer Modes
export const MOCK_TRANSFER_MODES_ID: TransferModePropsWithTable[] = [
  {
    id: '1',
    title: 'BI-FAST',
    currency: 'IDR',
    serviceFee: 2500,
    transactionLimit: 250000000,
    operatingHours: '24/7',
    logoSource: { uri: 'https://via.placeholder.com/50?text=BI-FAST' },
    description: 'Instant transfer using Bank Indonesia Fast Payment System',
  },
  {
    id: '2',
    title: 'BI-SKN',
    currency: 'IDR',
    serviceFee: 1500,
    transactionLimit: 500000000,
    operatingHours: '9 AM - 5 PM (Mon-Fri)',
    logoSource: { uri: 'https://via.placeholder.com/50?text=BI-SKN' },
    description: 'BI-SKN transfer is not instant',
    tableData: [
      ['Transaction Time', 'Processing Time'],
      ['8:00 AM - 3:00 PM (Mon to Fri)', 'Same business day'],
      [
        'After 3:30 PM or on non-business days (Sat, Sun, public holidays)',
        'Next business day',
      ],
    ],
    tableTitle: 'BI-SKN',
    tableSubheading:
      'Your transaction time determines when it is processed and received by your recipient',
  },
  {
    id: '3',
    title: 'Transfer Online',
    currency: 'IDR',
    serviceFee: 3000,
    transactionLimit: 100000000,
    operatingHours: '24/7',
    logoSource: { uri: 'https://via.placeholder.com/50?text=Online' },
  },
  {
    id: '4',
    title: 'RTGS',
    currency: 'IDR',
    serviceFee: 5000,
    transactionLimit: 1000000000,
    operatingHours: 'Mon - Fri 8:00 AM to 3:25 PM',
    logoSource: { uri: 'https://via.placeholder.com/50?text=RTGS' },
    description: 'Real Time Gross Settlement for large transactions',
  },
];

// Malaysia Transfer Modes
export const MOCK_TRANSFER_MODES_MY: TransferModePropsWithTable[] = [
  {
    id: '1',
    title: 'DuitNow Transfer',
    currency: 'MYR',
    serviceFee: 0.5,
    transactionLimit: 50000,
    operatingHours: '24/7',
    logoSource: { uri: 'https://via.placeholder.com/50?text=DuitNow' },
    description: 'Instant transfer using DuitNow',
  },
  {
    id: '2',
    title: 'Interbank GIRO',
    currency: 'MYR',
    serviceFee: 1.0,
    transactionLimit: 100000,
    operatingHours: '9 AM - 5 PM (Mon-Fri)',
    logoSource: { uri: 'https://via.placeholder.com/50?text=GIRO' },
    description: 'Interbank GIRO transfer',
    tableData: [
      ['Transaction Time', 'Processing Time'],
      ['Before 12:00 PM (Mon to Fri)', 'Same business day'],
      [
        'After 12:00 PM or on non-business days (Sat, Sun, public holidays)',
        'Next business day',
      ],
    ],
    tableTitle: 'Interbank GIRO',
    tableSubheading:
      'Your transaction time determines when it is processed and received by your recipient',
  },
  {
    id: '3',
    title: 'Instant Transfer',
    currency: 'MYR',
    serviceFee: 1.5,
    transactionLimit: 30000,
    operatingHours: '24/7',
    logoSource: { uri: 'https://via.placeholder.com/50?text=Instant' },
  },
  {
    id: '4',
    title: 'RENTAS',
    currency: 'MYR',
    serviceFee: 2.0,
    transactionLimit: 999999,
    operatingHours: 'Mon - Fri 9:00 AM to 5:00 PM',
    logoSource: { uri: 'https://via.placeholder.com/50?text=RENTAS' },
    description: 'Real-time Electronic Transfer of Funds and Securities',
  },
];

// Default export for backward compatibility
export const MOCK_TRANSFER_MODES: TransferModePropsWithTable[] =
  MOCK_TRANSFER_MODES_ID;

export const MOCK_RECEIPT_DATA = [
  { detail: 'Reference ID', value: '1234567890' },
  { detail: 'Transaction type', value: 'Transfer', extendable: true },
  { detail: 'Transfer mode', value: 'BI-FAST' },
  { detail: 'Purpose of transfer', value: 'Fund Transfer', extendable: true },
  { detail: 'Remark', value: 'Makan', extendable: true },
  { detail: 'Service fee', value: 'IDR 2,500.00', extendable: true },
  {
    detail: 'Notify via email address',
    value: 'email@gmail.com',
    extendable: true,
  },
  { detail: 'Beneficiary', value: 'Alice Tan', extendable: true },
  {
    detail: 'Category',
    value: 'Food & Beverages',
    image: {
      uri: 'https://cdn.pixabay.com/photo/2014/09/21/18/22/color-455365_1280.png',
    },
  },
];

export const MOCK_RECIPIENT = {
  name: 'Mohammad Irfan Zulkifli Hakimi bin Mohd Khairul Anuar',
  accountNumber: '8888 1515 8888',
  bank: 'Bank CIMB Niaga',
};

export const MOCK_TRANSFER_FROM = 'U Transaction Account iB 5012 3341 4612';

export const MOCK_ACCOUNT_DATA: AccountDetailProps[] = [
  {
    name: 'Katijah binti Haris Ali',
    nickname: 'Wifey Katijah',
    accountNumber: '1111 2222 3333',
    bank: 'Maybank Indonesia',
    source: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    badgeSource: images.maybankLogo,
  },
  {
    name: 'Kamaruddin bin Mohamed Isa',
    nickname: 'Swimming Coach',
    accountNumber: '5012 3341 3421',
    bank: 'RHB Sekuritas Indonesia',
    avatarColor: '#ddd6fe', // light purple
    badgeSource: images.bankIcon,
  },
  {
    name: 'Vimala A/P Perumal',
    nickname: '',
    accountNumber: '5012 3341 3421',
    bank: 'Bank CIMB Niaga',
    avatarColor: '#bfdbfe', // light blue
    badgeSource: images.cimbLogo,
  },
  {
    name: 'Jenny Lim',
    nickname: 'CBD 9388 Carpark Rental',
    accountNumber: '0000 1111 2222',
    bank: 'Maybank Indonesia',
    avatarColor: '#fef08a', // yellow
    badgeSource: images.maybankLogo,
  },
];

export const sampleBankData = [
  {
    id: '1',
    name: 'Maybank',
    logoSource: images.xcel,
    category: 'Banks',
  },
  {
    id: '2',
    name: 'CIMB Bank',
    logoSource: images.xcel,
    category: 'Banks',
  },
  {
    id: '3',
    name: 'Public Bank',
    logoSource: images.xcel,
    category: 'Banks',
  },
  {
    id: '4',
    name: 'Hong Leong Bank',
    logoSource: images.xcel,
    category: 'Banks',
  },
  {
    id: '5',
    name: 'Touch n Go',
    logoSource: images.xcel,
    category: 'eWallets',
  },
  {
    id: '6',
    name: 'GrabPay',
    logoSource: images.xcel,
    category: 'eWallets',
  },
  {
    id: '7',
    name: 'Boost',
    logoSource: images.xcel,
    category: 'eWallets',
  },
];

export const MOCK_TRANSACTION_DATA = {
  recipientName: 'Mohamad Irfan Zulkifli Hakimi bin Mohd Khairul Anuar',
  recipientAccount: '8888 1515 8888',
  amount: 1000,
  merchantId: 'MERCHANT_001',
  merchantName: 'Bank CIMB Niaga',
  description: 'Transfer to savings account',
};
