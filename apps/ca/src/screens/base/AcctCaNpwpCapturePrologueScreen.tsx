import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DynamicScreenZone from '../../components/sdui/core/DynamicScreenZone';
import { CaJourneyParamList } from '../../navigation/CurrentAccountJourneyNavigator';

const SCREEN_ID = 'ACCT_CA_NPWP_CAPTURE_PROLOGUE';

type Props = NativeStackScreenProps<CaJourneyParamList, typeof SCREEN_ID>;

export default function AcctCaNpwpCaptureScreen({ ...navigationProps }: Props) {
  return <DynamicScreenZone screenId={SCREEN_ID} {...navigationProps} />;
}
