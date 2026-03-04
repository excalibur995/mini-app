// src/atoms/Icon.tsx
// Temporarily disabled lucide-react-native imports
// import {
//   ChevronDown,
//   ChevronUp,
//   Heart,
//   HelpCircle,
//   Mic,
//   X,
// } from "lucide-react-native";

// Placeholder components until icon library is replaced
const ChevronDown = (props: any) => null;
const ChevronUp = (props: any) => null;
const Heart = (props: any) => null;
const HelpCircle = (props: any) => null;
const Mic = (props: any) => null;
const X = (props: any) => null;

import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";
// Import SVG icons from assets
import {
  BankIcon,
  CheckCircleIcon,
  ChevronLeft,
  ChevronRight,
  MoreOutlined,
  SearchIcon,
  StarIcon,
  cardIcon,
  editIcon,
  interactionIcon,
  receiptIcon,
} from "../../../assets/media";

type IconProps = {
  /** The icon name */
  icon: string;
  /** Size of the icon */
  size?: number | "sm" | "md" | "lg";
  /** Color of the icon */
  color?: string;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
};

// Size mapping
const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

// Map icon names to SVG or Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  search: SearchIcon,
  mic: Mic,
  back: ChevronLeft,
  "arrow-back-ios": ChevronLeft,
  "arrow-back": ChevronLeft,
  "chevron-right": ChevronRight,
  "keyboard-arrow-up": ChevronUp,
  "keyboard-arrow-down": ChevronDown,
  "more-horiz": MoreOutlined,
  "account-balance": BankIcon,
  close: MoreOutlined,
  favorite: Heart,
  "favorite-outline": Heart,
  edit: editIcon,
  "receipt-long": receiptIcon,
  "chat-bubble-outline": interactionIcon,
  "add-card": cardIcon,
  "check-circle": CheckCircleIcon,
  cancel: MoreOutlined,
  star: StarIcon,
  x: X,
};

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 20,
  color = theme.colors.text,
  style,
}) => {
  if (!icon) {
    return null;
  }

  const IconComponent = iconMap[icon] || HelpCircle;

  // Handle size mapping
  const iconSize = typeof size === "string" ? sizeMap[size] : size;

  // Check if it's a Lucide icon by checking the icon name
  const lucideIcons = [
    "keyboard-arrow-up",
    "keyboard-arrow-down",
    "favorite",
    "favorite-outline",
    "mic",
  ];
  const isLucideIcon =
    lucideIcons.includes(icon) || IconComponent === HelpCircle;

  if (isLucideIcon) {
    // Lucide icons use size and color props
    return <IconComponent size={iconSize} color={color} style={style} />;
  }

  // SVG icons from assets need consistent sizing
  // Pass width/height as props to override SVG's internal dimensions
  return <IconComponent style={style} />;
};
