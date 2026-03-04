// libs/ui/src/components/molecules/TransferModeDetails.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AccountDetail } from './AccountDetail';
import { Checkbox } from './Checkbox';

export type TransferModeProps = {
    id: string;
    title: string;
    currency: 'MYR' | 'IDR' | 'SGD'
    serviceFee: number,
    transactionLimit: number,
    operatingHours: string,
    logoSource: { uri: string },
    description?:string,
}

type TransferModeDetailsProps = {
  modes: TransferModeProps[];
  selectedModeId?: string | null;
  onSelectMode?: (id: string) => void;
};

export const TransferModeDetails: React.FC<TransferModeDetailsProps> = ({
  modes,
  selectedModeId,
  onSelectMode,
}) => {



  return (
    <View>
      {modes.map((mode) => {
        const isSelected = selectedModeId === mode.id;
        const serviceFee = `${mode.currency} ${Number(mode.serviceFee).toLocaleString()}`;
        const transactionLimit = `${mode.currency} ${Number(mode.transactionLimit).toLocaleString()}`;
        return (
          <TouchableOpacity
            key={mode.id}
            onPress={() => onSelectMode && onSelectMode(mode.id)}
            activeOpacity={0.8}
            style={[
              styles.cardWrapper,
              isSelected && styles.selectedCardWrapper, // 🔹 Apply grey to wrapper
            ]}
          >
            <View
              style={[
                styles.cardContent,
                isSelected && styles.selectedCardContent, // 🔹 Apply grey to content
              ]}
            >
              <AccountDetail
                name={mode.title}
                nickname={`Fee • ${serviceFee}`}
                accountNumber={`Transaction limit • ${transactionLimit}`}
                bank={`Operating hours • ${mode.operatingHours}`}
                source={mode.logoSource}
                variant="variant1"
              />

              {isSelected && (
                <View style={styles.checkboxWrapper}>
                  <Checkbox checked={true} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
  },
  selectedCardWrapper: {
    backgroundColor: '#e0e0e0', // grey when selected
  },
  cardContent: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedCardContent: {
    backgroundColor: '#e0e0e0', // grey when selected
  },
  checkboxWrapper: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
