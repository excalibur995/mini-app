import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import type { Journey } from '../types/journey';

type JourneyState = {
  journey: Journey | null;
  currentIndex: number;
};

type JourneyDispatch = {
  setJourney: (j: Journey) => void;
  setCurrentIndex: (i: number) => void;
};

const JourneyStateContext = createContext<JourneyState | null>(null);
const JourneyDispatchContext = createContext<JourneyDispatch | null>(null);

export const JourneyProvider = ({ children }: PropsWithChildren) => {
  const [journey, setJourneyState] = useState<Journey | null>(null);
  const [currentIndex, setCurrentIndexState] = useState(0);

  // Stable refs so useEffect deps don't cause infinite loops
  const setJourney = useCallback((j: Journey) => setJourneyState(j), []);
  const setCurrentIndex = useCallback(
    (i: number) => setCurrentIndexState(i),
    [],
  );

  return (
    <JourneyStateContext.Provider value={{ journey, currentIndex }}>
      <JourneyDispatchContext.Provider value={{ setJourney, setCurrentIndex }}>
        {children}
      </JourneyDispatchContext.Provider>
    </JourneyStateContext.Provider>
  );
};

export const useJourneyState = () => {
  const ctx = useContext(JourneyStateContext);
  if (!ctx)
    throw new Error('useJourneyState must be used inside JourneyProvider');
  return ctx;
};

export const useJourneyDispatch = () => {
  const ctx = useContext(JourneyDispatchContext);
  if (!ctx)
    throw new Error('useJourneyDispatch must be used inside JourneyProvider');
  return ctx;
};
