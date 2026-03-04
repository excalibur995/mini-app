import { IJourney } from '../core/types';

export interface AppContextType {
  journey: IJourney | null;
  loading: boolean;
  error: Error | null;
}

export interface AppProviderProps {
  market: 'MY' | 'ID';
  children: React.ReactNode;
}
