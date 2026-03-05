// import { ChevronLeft } from "lucide-react-native";
const ChevronLeft = (props: any) => null; // Placeholder
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme/theme";
import { RecipientDetailsForm } from "../ui/components/organisms/RecipientDetailsForm";
import {
  ListItem,
  SearchableFilteredListTransferTo,
} from "../ui/components/organisms/SearchableFilteredListTransferTo";

type TransferToBlockProps = {
  /** Array of bank/ewallet items for selection */
  items: ListItem[];
  /** Callback when the flow completes (after step 2) */
  onComplete?: (data: { selectedBank: ListItem; accountNumber: string }) => void;
  /** Callback when back button is pressed on step 1 */
  onCancel?: () => void;
  /** Callback when bank is selected (Step 1) - navigates immediately without Next button */
  onBankSelect?: (bank: ListItem) => void;
  /** Whether to show header */
  showHeader?: boolean;
};

/**
 * TransferToBlock Template
 *
 * A multi-step template for transfer workflows that guides users through:
 * 1. Selecting a bank/ewallet from a searchable, filterable list
 * 2. Entering recipient account details
 *
 * @example
 * ```tsx
 * const bankData = [
 *   { id: '1', name: 'Maybank', logoSource: require('./maybank.png'), category: 'Banks' },
 *   { id: '2', name: 'CIMB', logoSource: require('./cimb.png'), category: 'Banks' },
 * ];
 *
 * <TransferToBlock
 *   items={bankData}
 *   onComplete={(data) => console.log('Transfer to:', data)}
 *   onCancel={() => navigation.goBack()}
 * />
 * ```
 */
export const TransferToBlock: React.FC<TransferToBlockProps> = ({
  items,
  onComplete,
  onCancel,
  onBankSelect,
  showHeader = true,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedBank, setSelectedBank] = useState<ListItem | null>(null);
  const [accountNumber, setAccountNumber] = useState("");

  const handleBankSelect = (bank: ListItem) => {
    setSelectedBank(bank);
    // If onBankSelect callback provided, call it (for direct navigation to another page)
    if (onBankSelect) {
      onBankSelect(bank);
    } else {
      // Otherwise go to step 2 immediately
      setCurrentStep(2);
    }
  };

  const handleStep2Next = () => {
    if (selectedBank && accountNumber.trim()) {
      onComplete?.({
        selectedBank,
        accountNumber,
      });
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  // Get bank names for dropdown options
  const bankOptions = items.map((item) => item.name);

  return (
    <View style={styles.container}>
      {/* Step 1: Bank Selection */}
      {currentStep === 1 && (
        <SearchableFilteredListTransferTo
          items={items}
          onItemSelect={handleBankSelect}
          selectedItem={selectedBank}
          onBackPress={onCancel}
          onClose={onCancel}
        />
      )}

      {/* Step 2: Account Details */}
      {currentStep === 2 && (
        <View style={styles.container}>
          {/* Drag Indicator - same as step 1 */}
          <View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicator} />
          </View>

          {/* Header - same style as step 1 */}
          <View style={styles.header}>
            <Text style={styles.title}>Transfer</Text>
            <TouchableOpacity onPress={handleBackToStep1} style={styles.closeButton}>
              <ChevronLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          <View style={styles.formContent}>
            <RecipientDetailsForm
              bankLabel="Transfer to"
              bankOptions={bankOptions}
              selectedBank={selectedBank?.name || ""}
              onBankSelect={(bankName: string) => {
                const bank = items.find((item) => item.name === bankName);
                if (bank) setSelectedBank(bank);
              }}
              accountNumber={accountNumber}
              onAccountNumberChange={setAccountNumber}
              onNext={handleStep2Next}
              nextButtonText="Next"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  dragIndicatorContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
  },
  closeButton: {
    position: "absolute",
    left: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  formContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
});
