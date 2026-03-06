import { useQuery } from '@tanstack/react-query';
import type { Journey } from '../../types/journey';
import type { Screen } from '../../types/screen';
import { fetchJourney, fetchJourneys, fetchScreen } from '../api/journey';
import { queryClient } from '../queryClient';

export const journeyKeys = {
  journeys: () => ['journeys'] as const,
  journey: (journeyId: string) => ['journey', journeyId] as const,
  screen: (documentId: string) => ['screen', documentId] as const,
};

export const useJourneys = () =>
  useQuery<Journey[]>({
    queryKey: journeyKeys.journeys(),
    queryFn: fetchJourneys,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

export const preloadJourney = (journeyId: string) => {
  return queryClient.prefetchQuery({
    queryKey: journeyKeys.journey(journeyId),
    queryFn: () => fetchJourney(journeyId),
    staleTime: 30 * 1000,
  });
};

export const useJourney = (journeyId?: string) =>
  useQuery<Journey>({
    enabled: !!journeyId,
    queryKey: journeyKeys.journey(journeyId!),
    queryFn: () => fetchJourney(journeyId!),
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
    retryDelay: 500,
  });

export const useScreen = (documentId: string | null) =>
  useQuery<Screen>({
    queryKey: journeyKeys.screen(documentId!),
    queryFn: () => fetchScreen(documentId!),
    enabled: !!documentId,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
