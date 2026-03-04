import React, { createContext, useEffect, useState } from 'react';
import { loadJourney } from '../core/JourneyLoader';
import { IJourney } from '../core/types';
import { AppContextType, AppProviderProps } from './types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ market, children }: AppProviderProps) {
  const [journey, setJourney] = useState<IJourney | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const j = loadJourney(market);
      setJourney(j);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [market]);

  const value: AppContextType = {
    journey,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
