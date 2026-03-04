import { View } from "react-native";
import { Header, RadioTab } from "../molecules";

const LandingHeader = () => {
  return (
    <View>
      <Header
        title="Transfer"
        leftIconName="arrow-back-ios"
        rightIconName="more-horiz"
        variant="var1"
        showBorder={false}
      />
      <RadioTab
        tabs={["Local", "Overseas"]}
        onTabChange={(tab) => console.log("Selected Tab:", tab)}
      />
    </View>
  );
};

export { LandingHeader };
