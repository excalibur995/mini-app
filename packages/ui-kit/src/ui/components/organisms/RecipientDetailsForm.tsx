import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";
import { Dropdown } from "../atoms/Dropdown";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";

type RecipientDetailsFormProps = {
  /** Label for bank dropdown (e.g., "Transfer to", "Select Bank", "Recipient Bank") */
  bankLabel?: string;
  /** Array of bank options */
  bankOptions: string[];
  /** Currently selected bank */
  selectedBank: string;
  /** Callback when bank is selected */
  onBankSelect: (bank: string) => void;
  /** Placeholder for bank dropdown */
  bankPlaceholder?: string;

  /** Account number value */
  accountNumber: string;
  /** Callback when account number changes */
  onAccountNumberChange: (accountNo: string) => void;

  /** Callback when Next button is pressed */
  onNext?: () => void;
  /** Next button text */
  nextButtonText?: string;
  /** Disable Next button */
  disableNext?: boolean;

  /** Optional custom styles */
  style?: ViewStyle;
};

/**
 * RecipientDetailsFormTransferTo Organism
 *
 * A reusable form component that combines FormField molecule with Dropdown and Input atoms
 * for bank selection and account number entry, with a Next button for transfer workflows.
 * Perfect for any scenario requiring bank selection and account number input:
 * - Money transfers
 * - Payment to bank account
 * - Adding beneficiary
 * - Linking bank account
 *
 * @example
 * ```tsx
 * const [bank, setBank] = useState('');
 * const [accountNo, setAccountNo] = useState('');
 *
 * <RecipientDetailsFormTransferTo
 *   bankLabel="Transfer to"
 *   bankOptions={['Maybank', 'CIMB', 'Public Bank']}
 *   selectedBank={bank}
 *   onBankSelect={setBank}
 *   accountNumber={accountNo}
 *   onAccountNumberChange={setAccountNo}
 *   onNext={() => console.log('Next pressed')}
 * />
 * ```
 */
export const RecipientDetailsForm: React.FC<RecipientDetailsFormProps> = ({
  bankLabel = "Transfer to",
  bankOptions,
  selectedBank,
  onBankSelect,
  bankPlaceholder = "Choose a bank",
  accountNumber,
  onAccountNumberChange,
  onNext,
  nextButtonText = "Next",
  disableNext = false,
  style,
}) => {
  // Auto-disable if fields are empty
  const isDisabled = disableNext || !selectedBank || !accountNumber.trim();

  return (
    <View style={[styles.container, style]}>
      {/* Form Fields */}
      <View style={styles.formFields}>
        {/* FormField Molecule with Dropdown Atom */}
        <FormField label={bankLabel} labelSize="small" labelColor="muted">
          <Dropdown
            options={bankOptions}
            selected={selectedBank}
            onSelect={onBankSelect}
            placeholder={bankPlaceholder}
            style={{ width: "100%" }}
          />
        </FormField>

        {/* FormField Molecule with Input Atom */}
        <FormField label="Account number" labelSize="small" labelColor="muted">
          <Input
            value={accountNumber}
            onChangeText={onAccountNumberChange}
            placeholder="8888 1515 8888"
            keyboardType="numeric"
            radius={5}
            borderColor="#BDBDBD"
            selectionColor={theme.colors.primary}
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
            }}
          />
        </FormField>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  formFields: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
