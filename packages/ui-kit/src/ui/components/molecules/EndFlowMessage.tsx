import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { Icon, Label } from "../atoms";
import { theme } from "../../../theme/theme";

export type EndFlowMessageProps = {
  result: boolean;
  datetime: Date;
};

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const EndFlowMessage: React.FC<EndFlowMessageProps> = ({
  result,
  datetime,
}) => {
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (result) {
      confettiRef.current?.start();
    }
  }, [result]);

  return (
    <View style={styles.container}>
      {result ? (
        <>
          {/* Confetti behind content */}
          <View style={styles.confettiWrapper}>
            <ConfettiCannon
              ref={confettiRef}
              count={40}
              origin={{ x: 200, y: 0 }}
              fadeOut={true}
              autoStart={false}
            />
          </View>

          <Icon icon="check-circle" color={theme.colors.success} size={48} />
          <Label size="large" weight="bold">
            Transfer Successful
          </Label>
        </>
      ) : (
        <>
          <Icon icon="cancel" color={theme.colors.error} size={48} />
          <Label size="large" weight="bold">
            Transfer Failed
          </Label>
        </>
      )}
      <Label size="medium" weight="regular" style={styles.datetime}>
        {formatDateTime(datetime)}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
  },
  confettiWrapper: {
    ...StyleSheet.absoluteFillObject, // fill parent
    zIndex: -1, // ✅ behind icon/labels
  },
  datetime: {
    marginTop: 4,
    color: theme.colors.muted,
  },
});
