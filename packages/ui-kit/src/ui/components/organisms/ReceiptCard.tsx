import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon, Label } from "../atoms"; // adjust import paths
import { ReceiptDetail } from "../molecules"; // updated row component with image support
import { theme } from "../../../theme/theme";

export type ReceiptItem = {
  detail: string;
  value?: string;
  image?: any; // optional image (local require or remote uri)
  extendable?: boolean; // whether this item should be hidden until "show more"
};

type ReceiptCardProps = {
  data: ReceiptItem[]; // pass data from parent
};

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  // Check if there are any extendable items
  const hasExtendableItems = data.some((item) => item.extendable);

  // filter items: always show non-extendable, show extendable only if showMore is true
  const visibleData = data.filter((item) => !item.extendable || showMore);

  return (
    <Card radius="md" variant="medium">
      <Card.Body style={styles.body}>
        {visibleData.map((item, index) => (
          <ReceiptDetail
            key={index}
            detail={item.detail}
            value={item.value}
            image={item.image}
          />
        ))}
      </Card.Body>

      {hasExtendableItems && (
        <Card.Footer>
          <TouchableOpacity
            style={styles.footerRow}
            onPress={() => setShowMore(!showMore)}
            activeOpacity={0.7}
          >
            <Label size="medium" weight="bold" style={styles.showMoreLabel}>
              {showMore ? "Show less" : "Show more"}
            </Label>
            <Icon
              icon={showMore ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              color={theme.colors.secondary}
              size={20}
            />
          </TouchableOpacity>
        </Card.Footer>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  body: {
    gap: 8, // spacing between ReceiptDetail rows
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  showMoreLabel: {
    color: theme.colors.secondary,
  },
});
