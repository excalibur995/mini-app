import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { useJourneyStore } from '../../../store/useJourneyStore';
import type { SduiValidation } from '../../../types/screen';

type ValidationContextType = {
  errors: Record<string, string>;
  registerValidation: (path: string, validations: SduiValidation[]) => void;
  unregisterValidation: (path: string) => void;
  validateAll: () => boolean;
  clearError: (path: string) => void;
  clearErrors: () => void;
};

const ValidationContext = createContext<ValidationContextType | undefined>(
  undefined,
);

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};

export const ValidationProvider: React.FC<{
  journeyId: string;
  children: React.ReactNode;
}> = ({ journeyId, children }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use a ref to store active validation rules so we don't trigger re-renders just by registering/unregistering
  const validationRules = useRef<Record<string, SduiValidation[]>>({});

  const registerValidation = useCallback(
    (path: string, validations: SduiValidation[]) => {
      validationRules.current[path] = validations;
    },
    [],
  );

  const unregisterValidation = useCallback((path: string) => {
    delete validationRules.current[path];
    setErrors(prev => {
      if (prev[path]) {
        const next = { ...prev };
        delete next[path];
        return next;
      }
      return prev;
    });
  }, []);

  const clearError = useCallback((path: string) => {
    setErrors(prev => {
      if (prev[path]) {
        const next = { ...prev };
        delete next[path];
        return next;
      }
      return prev;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getSession = useJourneyStore(state => state.getSession);

  const validateAll = useCallback(() => {
    const session = getSession(journeyId);
    const state = session?.journeyState || {};

    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Evaluate all registered rules
    Object.entries(validationRules.current).forEach(([path, rules]) => {
      const value = state[path];

      for (const rule of rules) {
        if (rule.rule === 'required') {
          // Check for truthy value or boolean false (which is a valid value for required, just not undefined/null/empty string)
          if (value === undefined || value === null || value === '') {
            newErrors[path] = rule.message || 'This field is required';
            isValid = false;
            break; // Stop evaluating rules for this path if we already have an error
          }
        }
        // if (rule.rule === 'pattern' && !!value) {
        //   const regex = new RegExp(rule.value as string);
        //   if (!regex.test(value as string)) {
        //     newErrors[path] = rule.message || 'Invalid pattern';
        //     isValid = false;
        //     break; // Stop evaluating rules for this path if we already have an error
        //   }
        // }
        // Additional rules (regex, minLength, etc.) can be added here in the future
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [journeyId, getSession]);

  return (
    <ValidationContext.Provider
      value={{
        errors,
        registerValidation,
        unregisterValidation,
        validateAll,
        clearError,
        clearErrors,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};
