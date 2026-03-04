import { AppContextType } from '../contexts/types';
import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react';

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
