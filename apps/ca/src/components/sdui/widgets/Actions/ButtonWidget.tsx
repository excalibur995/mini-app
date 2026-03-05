import React from 'react';
import { View } from 'react-native';
import { Button } from 'ui-kit';
import { useJourneyStore } from '../../../../store/useJourneyStore';
import { NavigateActionPayload, ScreenAction } from '../../../../types/screen';

type Props = {
  label: string;
  variant?: 'primary' | 'secondary' | string;
  action: ScreenAction;
  guardRules?: { field: string; rule: string }[];
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
};

export const ButtonWidget: React.FC<Props> = ({
  label,
  variant = 'primary',
  action,
  guardRules,
  journeyId,
  onNavigate,
}) => {
  const handlePress = () => {
    // Evaluate guard rules before firing action
    if (guardRules && guardRules.length > 0) {
      const getSession = useJourneyStore.getState().getSession;
      const session = getSession(journeyId);
      const passed = guardRules.every(guard =>
        evaluateGuard(guard, session?.journeyState),
      );
      if (!passed) {
        // Validation failed, potentially show an error or toast
        console.warn('Navigation blocked by guard rule.');
        return;
      }
    }

    if (action.type === 'navigate') {
      onNavigate(action.payload as NavigateActionPayload);
    }
  };

  return (
    <View style={{ marginBottom: 0 }}>
      <Button title={label} variant={variant as any} onPress={handlePress} />
    </View>
  );
};

const evaluateGuard = (
  guard: { field: string; rule: string },
  journeyState: Record<string, unknown> | undefined,
): boolean => {
  if (!journeyState) return false;
  const value = journeyState[guard.field];

  switch (guard.rule) {
    case 'required':
      return value !== null && value !== undefined && value !== '';
    default:
      console.warn(`Unsupported guard rule: ${guard.rule}`);
      return true;
  }
};
