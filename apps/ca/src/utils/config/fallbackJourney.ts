export const FALLBACK_JOURNEYS = {
  ACCT_CA_APPLY: {
    journeyId: 'ACCT_CA_APPLY',
    navigator: 'CurrentAccountJourneyNavigator',
    initialState: {
      accountPurpose: null,
      npwpImage: null,
      npwpNumber: null,
      sourceAccountId: null,
      initialDepositAmount: null,
      termsAccepted: [],
    },
    initialScreenId: 'ACCT_CA_ACCOUNT_PURPOSE',
    initialPresentation: 'card',
    isFallback: true,
  },
} as const;
