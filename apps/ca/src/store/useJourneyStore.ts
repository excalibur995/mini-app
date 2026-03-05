import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { storage } from '../utils/kv';

export interface JourneySession {
  currentScreenIndex: number;
  journeyState: Record<string, unknown>;
}

// Custom storage object for Zustand persist middleware using MMKV
const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.get(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

interface JourneyStoreState {
  // A dictionary of journey sessions keyed by journeyId
  sessions: Record<string, JourneySession>;

  // Actions
  getSession: (journeyId: string) => JourneySession | null;
  setSession: (journeyId: string, session: JourneySession) => void;
  updateSession: (journeyId: string, patch: Partial<JourneySession>) => void;
  clearSession: (journeyId: string) => void;
}

export const useJourneyStore = create<JourneyStoreState>()(
  persist(
    (set, get) => ({
      sessions: {},

      getSession: journeyId => {
        return get().sessions[journeyId] ?? null;
      },

      setSession: (journeyId, session) => {
        set(state => ({
          sessions: {
            ...state.sessions,
            [journeyId]: session,
          },
        }));
      },

      updateSession: (journeyId, patch) => {
        set(state => {
          const current = state.sessions[journeyId] ?? {
            currentScreenIndex: 0,
            journeyState: {},
          };

          // Deep merge for journeyState to ensure we don't accidentally overwrite unrelated fields
          // if we only update one field inside journeyState
          const newJourneyState = patch.journeyState
            ? { ...current.journeyState, ...patch.journeyState }
            : current.journeyState;

          return {
            sessions: {
              ...state.sessions,
              [journeyId]: {
                ...current,
                ...patch,
                journeyState: newJourneyState,
              },
            },
          };
        });
      },

      clearSession: journeyId => {
        set(state => {
          const nextSessions = { ...state.sessions };
          delete nextSessions[journeyId];
          return { sessions: nextSessions };
        });
      },
    }),
    {
      name: 'journey-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
