import { View, StyleSheet } from "react-native";
import { theme } from "../theme/theme";

type LandingTemplateProps = {
  LandingHeader?: React.ReactNode;
  SearchAccount?: React.ReactNode;
  AccountList?: React.ReactNode;
  LandingFooter?: React.ReactNode;
};

const LandingTemplate = ({
  LandingHeader,
  SearchAccount,
  AccountList,
  LandingFooter,
}: LandingTemplateProps) => {
  return (
    <View style={styles.container}>
      {LandingHeader}
      {SearchAccount}
      {AccountList}
      {LandingFooter}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export { LandingTemplate };
