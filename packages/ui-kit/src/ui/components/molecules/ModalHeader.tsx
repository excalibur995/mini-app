// libs/ui/src/molecules/Header.tsx
import React from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';

import { Icon, Label } from '../atoms';
import { theme } from '../../../theme/theme';


interface ModalHeaderProps {
  title: string;
  subheading:string;
  leftIconName?: string;
  rightIconName?: string;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
}


export const ModalHeader: React.FC<ModalHeaderProps> = (
  {
    title ="Text title",
    subheading = "lorem ipsum deng hajike hfer nfm",
    rightIconName ='close',
    onRightPress,
    iconSize =25,
    iconColor =theme.colors.text,

  }) => {

    return (

    <View style={styles.container}>
      <View style={[styles.containervar2]}>
        {/* Atom 1: The Title Label */}
        <Label weight="bold" size="large">
          {title}
        </Label>

        {/* Atom 2: The Icon */}
        {/* Using a touchable wrapper for easier hitting */}
        <TouchableOpacity style={styles.iconWrapper} onPress={onRightPress}>
          <Icon
            icon={rightIconName}
            size={iconSize}
            color={iconColor} // Use theme text color (black)
          />
        </TouchableOpacity>
      </View>
      <Label>{subheading}</Label>
    </View>
  );



};

const styles = StyleSheet.create({
  container:{
    paddingBottom: theme.spacing.md,
  },
  containervar2: {
    flexDirection: 'row', // Lay them out horizontally
    justifyContent: 'space-between', // Push Label to left, Icon to right
    alignItems: 'center', // Vertically center them
    paddingVertical: theme.spacing.sm,
  },
  iconWrapper: {
    width: 40, // reserve space
    justifyContent: "center",
    alignItems: "center",
  },


});
