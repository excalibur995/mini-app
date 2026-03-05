import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon, RadioButton } from 'ui-kit';
import { useJourneyStore } from '../../../../store/useJourneyStore';
import {
  NavigateActionPayload,
  SduiBinding,
  SduiValidation,
} from '../../../../types/screen';
import { useValidation } from '../../core/ValidationContext';

type Props = {
  options: {
    key: string;
    label: string;
    description?: string | null;
    icon?: string | null;
  }[];
  binding: SduiBinding;
  validation: SduiValidation[];
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
};

export const RadioGroupWidget: React.FC<Props> = ({
  options,
  binding,
  validation,
  journeyId,
}) => {
  const { registerValidation, unregisterValidation, errors, clearError } =
    useValidation();

  useEffect(() => {
    if (validation && validation.length > 0) {
      registerValidation(binding.path, validation);
    }
    return () => unregisterValidation(binding.path);
  }, [binding.path, validation, registerValidation, unregisterValidation]);

  // Read initial value from journeyState via session
  const updateSession = useJourneyStore(state => state.updateSession);
  const session = useJourneyStore(state => state.getSession(journeyId));
  const value = session?.journeyState[binding.path] ?? binding.defaultValue;
  const error = errors[binding.path];

  const handleSelect = (key: string | number) => {
    // Write new value to journeyState in session store
    updateSession(journeyId, {
      journeyState: {
        ...session?.journeyState,
        [binding.path]: key,
      },
    });
    if (error) {
      clearError(binding.path);
    }
  };

  const widgetOptions = options.map(opt => ({
    value: opt.key,
    label: opt.label,
    description: opt.description || undefined,
    icon: opt.icon ? <Icon icon={opt.icon} size={24} /> : undefined,
  }));

  return (
    <View style={{ marginBottom: 16 }}>
      <RadioButton
        options={widgetOptions}
        selectedValue={value as string | number}
        onChange={handleSelect}
      />
      {error && (
        <Text style={{ color: 'red', marginTop: 8, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};
