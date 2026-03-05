import React from 'react';
import { KeyboardTypeOptions, Text, View } from 'react-native';
import { Input } from 'ui-kit';
import { useJourneyStore } from '../../../../store/useJourneyStore';
import {
  NavigateActionPayload,
  SduiBinding,
  SduiValidation,
} from '../../../../types/screen';
import { useValidation } from '../../core/ValidationContext';

type Props = {
  placeholder?: string;
  binding: SduiBinding;
  keyboard: KeyboardTypeOptions;
  validation: SduiValidation[];
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
};

export const TextInputWidget: React.FC<Props> = ({
  placeholder,
  binding,
  journeyId,
  keyboard,
  validation,
}) => {
  const { registerValidation, unregisterValidation, errors, clearError } =
    useValidation();

  React.useEffect(() => {
    if (validation && validation.length > 0) {
      registerValidation(binding.path, validation);
    }
    return () => unregisterValidation(binding.path);
  }, [binding.path, validation, registerValidation, unregisterValidation]);

  const updateSession = useJourneyStore(state => state.updateSession);
  const session = useJourneyStore(state => state.getSession(journeyId));
  const value = session?.journeyState[binding.path] ?? binding.defaultValue;
  const error = errors[binding.path];

  const handleChange = (text: string) => {
    updateSession(journeyId, {
      journeyState: {
        ...session?.journeyState,
        [binding.path]: text,
      },
    });
    if (error) {
      clearError(binding.path);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Input
        placeholder={placeholder}
        value={value as string}
        keyboardType={keyboard}
        onChangeText={handleChange}
        borderColor={error ? 'red' : undefined}
      />
      {error && (
        <Text style={{ color: 'red', marginTop: 8, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};
