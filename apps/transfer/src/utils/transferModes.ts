import countryConfig from '../../../../country-config.json';
import {
  MOCK_TRANSFER_MODES_ID,
  MOCK_TRANSFER_MODES_MY,
} from '../constants/mockData';

/**
 * Get transfer modes based on country config
 */
export const getTransferModes = () => {
  const country = countryConfig.country;
  return country === 'MY' ? MOCK_TRANSFER_MODES_MY : MOCK_TRANSFER_MODES_ID;
};
