import { IJourney } from './types';
import { ScreenName } from '../navigation/types';

export class NavigationFactory {
  private journeyMap: Map<ScreenName, ScreenName | null>;

  constructor(journey: IJourney | null) {
    const journeySteps = this.getJourneySteps(journey);
    this.journeyMap = this.buildJourneyMap(journeySteps);
  }

  private getJourneySteps(journey: IJourney | null): ScreenName[] {
    if (!journey?.journey || !Array.isArray(journey.journey)) {
      throw new Error('Journey configuration is required');
    }

    return journey.journey as ScreenName[];
  }

  private buildJourneyMap(
    journeySteps: ScreenName[],
  ): Map<ScreenName, ScreenName | null> {
    const map = new Map<ScreenName, ScreenName | null>();

    journeySteps.forEach((screen, index) => {
      const nextScreen = journeySteps[index + 1] || null;
      map.set(screen, nextScreen);
    });

    return map;
  }

  getNextScreen(currentScreen: ScreenName): ScreenName | null {
    return this.journeyMap.get(currentScreen) ?? null;
  }
}
