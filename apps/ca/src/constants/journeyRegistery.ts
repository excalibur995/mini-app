import type { ComponentType } from 'react';
import AcctCaAccountPurposeScreen from '../screens/base/AcctCaAccountPurposeScreen';
import AcctCaNpwpCaptureScreen from '../screens/base/AcctCaNpwpCaptureScreen';
import AcctCaNpwpReviewScreen from '../screens/base/AcctCaNpwpReviewScreen';

const SCREEN_REGISTRY: Record<string, ComponentType<any>> = {
  ACCT_CA_ACCOUNT_PURPOSE: AcctCaAccountPurposeScreen,
  ACCT_CA_NPWP_CAPTURE: AcctCaNpwpCaptureScreen,
  ACCT_CA_NPWP_REVIEW: AcctCaNpwpReviewScreen,
};

export const resolveScreen = (screenId: string): ComponentType<any> | null => {
  console.log({ screenId });
  return SCREEN_REGISTRY[screenId] ?? null;
};
