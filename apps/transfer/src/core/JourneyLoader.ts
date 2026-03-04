import { IJourney } from './types';

const BASE_JOURNEY = require('../journeys/base.json');

export const DEFAULT_JOURNEY: IJourney = {
  market: '',
  journey: BASE_JOURNEY.journey || [],
};

export function loadJourney(market: 'MY' | 'ID'): IJourney {
  try {
    const JOURNEY_REGISTRY: Record<string, IJourney> = {
      MY: require('../journeys/my.json'),
      ID: require('../journeys/id.json'),
    };

    const journey = JOURNEY_REGISTRY[market];

    if (!journey) {
      console.warn(`Unknown market: ${market}, using base journey`);
      return {
        ...DEFAULT_JOURNEY,
        market,
      };
    }

    // Merge with base journey as fallback
    return {
      ...BASE_JOURNEY,
      ...journey,
      journey: journey.journey || BASE_JOURNEY.journey,
    };
  } catch (err) {
    console.error(`Failed to load journey for ${market}:`, err);
    console.log('Falling back to base journey');
    return {
      ...DEFAULT_JOURNEY,
      market,
    };
  }
}
