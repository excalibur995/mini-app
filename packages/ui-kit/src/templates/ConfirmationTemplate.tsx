// Template
import React from "react";
import { Animated, ScrollView, View } from "react-native";
import { theme } from "../theme/theme";

type ConfirmationTemplateProps = {
  scrollY: Animated.Value; // ✅ Add this
  CollapsibleHeader?: React.ReactNode;
  TransactionalDetail?: React.ReactNode;
  FullTransactionDetails?: React.ReactNode;
  TransferDetail?: React.ReactNode;
  RecurringFrequency?: React.ReactNode;
  Note?: React.ReactNode;
  ConfirmationTransferTo?: React.ReactNode;
  Slider?: React.ReactNode;
};

const ConfirmationTemplate = ({
  scrollY, // ✅ Receive from parent
  CollapsibleHeader,
  TransactionalDetail,
  TransferDetail,
  Slider,
  FullTransactionDetails,
  ConfirmationTransferTo,
  Note,
}: ConfirmationTemplateProps) => {
  // ✅ REMOVE: const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {CollapsibleHeader}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {ConfirmationTransferTo}
        {FullTransactionDetails}
        {TransactionalDetail}
        {TransferDetail}
        {Note}
        {Slider}
      </ScrollView>
    </View>
  );
};

export { ConfirmationTemplate };
