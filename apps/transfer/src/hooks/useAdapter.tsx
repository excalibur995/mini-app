import { useMemo } from 'react';
import { getAdapter } from '../adapters';
import countryConfig from '../../../../country-config.json';

export function useAdapter() {
  const market = countryConfig.country as 'ID' | 'MY';

  const adapter = useMemo(() => getAdapter(market), [market]);

  return adapter;
}
