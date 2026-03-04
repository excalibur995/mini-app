import { ComponentType } from 'react';
import { IJourney } from './types';
import * as BaseScreens from '../screens/base';
import * as IDScreens from '../screens/id';

const countryScreens: Record<string, any> = {
  ID: IDScreens,
  MY: {},
};

export function getScreen(
  screenName: string,
  journey: IJourney | null,
): ComponentType<any> {
  if (!journey) {
    return (BaseScreens as any)[screenName];
  }

  const market = journey.market;
  const marketScreens = countryScreens[market];

  if (marketScreens && marketScreens[screenName]) {
    return marketScreens[screenName];
  }

  return (BaseScreens as any)[screenName];
}
