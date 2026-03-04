import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Avatar as AV } from "react-native-elements";

export interface AvatarProps {
  size?: number;
  source?: { uri: string };
  badgeSource?: ImageSourcePropType; // Support both require() and { uri: string }
  name?: string;
  backgroundColor?: string;
}

function getInitials(name?: string): string {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  // Get first letter of first word and first letter of last word
  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

// Generate a consistent color based on name
function getAvatarColor(name?: string): string {
  if (!name) return "#e5e7eb";

  const colors = [
    "#e5e7eb", // gray
    "#ddd6fe", // light purple
    "#bfdbfe", // light blue
    "#fef08a", // yellow
    "#fecaca", // light red
    "#bbf7d0", // light green
    "#fed7aa", // light orange
    "#fbcfe8", // light pink
  ];

  // Use name length + first char code for consistent color
  const index = (name.length + name.charCodeAt(0)) % colors.length;
  return colors[index];
}

export function Avatar({
  size = 40,
  source,
  badgeSource,
  name,
  backgroundColor,
}: AvatarProps) {
  const hasImage = source?.uri && source.uri.trim() !== "";
  const badgeSize = 28; // Fixed size for bank logo badge
  const borderRadius = badgeSize / 2;
  const avatarBgColor = backgroundColor || getAvatarColor(name);

  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <AV
        rounded
        size={size}
        source={hasImage ? source : undefined}
        title={!hasImage ? getInitials(name) : undefined}
        containerStyle={[
          styles.avatar,
          !hasImage && { backgroundColor: avatarBgColor },
        ]}
        titleStyle={styles.initials}
      />

      {/* SMALL OVERLAPPING IMAGE BADGE */}
      {badgeSource && (
        <Image
          source={badgeSource}
          style={[
            styles.badge,
            { width: badgeSize, height: badgeSize, borderRadius: borderRadius },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
  },
  initials: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: -12,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
