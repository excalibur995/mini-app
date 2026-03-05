export type JourneyScreen = {
  id: number;
  documentId: string;
  screenId: string;
  locale?: string;
};

export type Journey = {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  journeyId: string | null;
  navigator: string;
  presentation: 'card' | 'modal' | 'fullScreenModal' | 'formSheet' | null;
  screens: JourneyScreen[];
  initialState: Record<string, unknown> | null;
};
