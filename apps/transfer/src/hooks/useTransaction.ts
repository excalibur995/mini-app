import { useCallback, useMemo } from 'react';
import { TransactionData, TransactionResult } from '../types';
import { TransactionService } from '../services/TransactionService';
import { DEFAULT_JOURNEY } from '../core/JourneyLoader';
import { useAppContext } from './useAppContext';
import { useAdapter } from './useAdapter';

export function useTransaction() {
  const { journey } = useAppContext();
  const adapter = useAdapter();

  const TransactionServiceInstance = useMemo(() => {
    const j = journey || DEFAULT_JOURNEY;
    return new TransactionService(adapter, j);
  }, [adapter, journey]);

  const submitTransaction = useCallback(
    async (data: TransactionData): Promise<TransactionResult> => {
      if (!journey) {
        return {
          success: false,
          message: 'Journey not loaded',
        };
      }

      return TransactionServiceInstance.submitTransaction(data);
    },
    [TransactionServiceInstance, journey],
  );

  return {
    submitTransaction,
  };
}
