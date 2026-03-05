import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import DynamicScreenZone from '../../components/sdui/core/DynamicScreenZone';
import { CaJourneyParamList } from '../../navigation/CurrentAccountJourneyNavigator';

const SCREEN_ID = 'ACCT_CA_NPWP_REVIEW';

type Props = NativeStackScreenProps<CaJourneyParamList, typeof SCREEN_ID>;

export default function AcctCaNpwpReviewScreen({ ...navigationProps }: Props) {
  return <DynamicScreenZone screenId={SCREEN_ID} {...navigationProps} />;
}
