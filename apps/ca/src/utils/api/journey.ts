import type { Journey } from '../../types/journey';
import type { Screen } from '../../types/screen';
import api from './client';

export const fetchJourneys = async (): Promise<Journey[]> => {
  const res = await api.get('/journeys');
  return res.data?.data;
};

export const fetchJourney = async (journeyId: string): Promise<Journey> => {
  const res = await api.get(`/journeys/${journeyId}`);
  return res.data?.data;
};

export const fetchScreen = async (documentId: string): Promise<Screen> => {
  const res = await api.get(`/screens/${documentId}`);
  return res.data?.data;
};
