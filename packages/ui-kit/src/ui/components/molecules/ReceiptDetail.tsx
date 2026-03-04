import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import { Label } from '../atoms';
import { theme } from '../../../theme/theme';

type ReceiptDetailProps = {
  detail: string; // always shown on the left
  value?: string; // right content text
  image?: ImageSourcePropType; // optional image (local require or remote uri)
};

export const ReceiptDetail: React.FC<ReceiptDetailProps> = ({
  detail,
  value,
  image,
}) => {
  return (
    <View style={styles.row}>
      {/* Left side always muted label */}
      <Label size="medium" weight="regular" color="muted">
        {detail}
      </Label>

      {/* Right side: optional image + value */}
      <View style={styles.rightContent}>
        {image && (
          <Image source={image} style={styles.image} resizeMode="contain" />
        )}
        {value && (
            <Label
            size="medium"
            weight="bold"
            style={StyleSheet.flatten([
              styles.valueLabel,
              { color: image ? theme.colors.secondary : theme.colors.text },
            ])}
            >
            {value}
            </Label>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  valueLabel: {
    // color is set dynamically depending on image presence
  } as TextStyle,
});
