import React, { useState } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../assets";
import { theme } from "../../../theme/theme";
import { Icon, Label } from "../atoms";

type SupportedCurrency = "MYR" | "IDR";

export type CardData = {
  currency: SupportedCurrency;
  amount: number;
  fullName: string;
  bankName: string;
  bankAcc: string;
  badgeSource?: ImageSourcePropType;
};

type AmountWithHeaderCardProps = {
  data?: Partial<CardData>;
};

export const AmountWithHeaderCard: React.FC<AmountWithHeaderCardProps> = ({
  data = {},
}) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavoritePress = (event: GestureResponderEvent) => {
    setFavorite((prev) => !prev);
  };

  const {
    currency,
    amount,
    fullName,
    bankName,
    bankAcc = "",
    badgeSource,
  } = data;

  const formattedAmount = new Intl.NumberFormat(
    currency === "IDR" ? "id-ID" : "en-MY",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(amount ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={images.maybankLogo}
          style={styles.maybankLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.body}>
        <Label size="xlarge" weight="bold" style={styles.amount}>
          {currency ? `${currency} ${formattedAmount}` : formattedAmount}
        </Label>

        <View style={styles.subBody}>
          <Label size="medium" weight="regular" style={styles.fullName}>
            {fullName ?? ""}
          </Label>
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Icon
              icon={favorite ? "favorite" : "favorite-outline"}
              color={favorite ? "red" : theme.colors.text}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bankInfo}>
          <Label size="medium" weight="regular" color="muted">
            {`${bankName ?? ""} • ${bankAcc}`}
          </Label>
          {badgeSource && (
            <Image
              source={badgeSource}
              style={styles.badgeIcon}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    backgroundColor: "#FFC107",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  maybankLogo: {
    height: 20,
    width: 100,
  },
  body: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  amount: {
    color: "#000",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  fullName: {
    flex: 1,
    color: "#000",
    fontSize: 14,
  },
  favoriteIcon: {
    padding: 0,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
