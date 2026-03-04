import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "../ui/components/atoms";
import {
  AmountWithHeaderCard,
  EndFlowMessage,
  EndFlowMessageProps,
} from "../ui/components/molecules";
import { CardData } from "../ui/components/molecules/AmountWithHeaderCard";
import {
  ActionItem,
  EndFlowActionGroup,
  ReceiptCard,
  ReceiptItem,
} from "../ui/components/organisms";

export type EndFlowBlockProps = {
  endFlowMessage: EndFlowMessageProps;
  amountCard: CardData;
  receiptCard: ReceiptItem[];
  actions: ActionItem[];
  onFooterPress: () => void; // ✅ only onPress is configurable
};

export const EndFlowBlock: React.FC<EndFlowBlockProps> = ({
  endFlowMessage,
  amountCard,
  receiptCard,
  actions,
  onFooterPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <EndFlowMessage
          result={endFlowMessage.result}
          datetime={endFlowMessage.datetime}
        />
        <AmountWithHeaderCard data={amountCard} />
        <ReceiptCard data={receiptCard} />
        <EndFlowActionGroup data={actions} />
      </ScrollView>

      {/* Fixed footer */}
      <View style={styles.footer}>
        <Button
          title="Done" // ✅ fixed label
          size="md" // ✅ fixed size
          onPress={onFooterPress} // ✅ only onPress comes from prop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
    backgroundColor: "#F5F5F5",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 0,
    backgroundColor: "#F5F5F5",
  },
});
