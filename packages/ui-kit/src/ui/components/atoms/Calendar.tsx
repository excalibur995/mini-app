import React, { useState } from "react";
import { Calendar as Cl } from "react-native-calendars";
// import { ChevronLeft, ChevronRight } from "lucide-react-native";
const ChevronLeft = (props: any) => null;
const ChevronRight = (props: any) => null;
import { theme } from "../../../theme/theme";

type CalendarProps = {
  onDayPress?: (day: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }) => void;
  selectedDate?: string;
};

const Calendar: React.FC<CalendarProps> = ({ onDayPress, selectedDate }) => {
  const today = new Date().toISOString().split("T")[0];
  const [selected, setSelected] = useState(selectedDate || today);

  const handleDayPress = (day: any) => {
    setSelected(day.dateString);
    onDayPress?.(day);
  };

  const markedDates = selected
    ? {
        [selected]: {
          selected: true,
          selectedColor: theme.colors.primary,
          selectedTextColor: "#ffffff",
        },
      }
    : {};

  return (
    <Cl
      style={{
        borderWidth: 0,
        paddingVertical: 10,
      }}
      current={selected}
      onDayPress={handleDayPress}
      markedDates={markedDates}
      hideExtraDays={false}
      // ✅ Custom arrow rendering
      renderArrow={(direction) =>
        direction === "left" ? (
          <ChevronLeft size={24} color={theme.colors.primary} />
        ) : (
          <ChevronRight size={24} color={theme.colors.primary} />
        )
      }
      theme={{
        backgroundColor: theme.colors.background,
        calendarBackground: theme.colors.background,
        textSectionTitleColor: theme.colors.text,
        textSectionTitleDisabledColor: theme.colors.muted,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: "#ffffff",
        todayTextColor: theme.colors.primary,
        todayBackgroundColor: "transparent",
        dayTextColor: theme.colors.text,
        textDisabledColor: theme.colors.gray?.light || "#e0e0e0",
        dotColor: theme.colors.primary,
        selectedDotColor: "#ffffff",
        monthTextColor: theme.colors.text,
        indicatorColor: theme.colors.primary,
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13,
        textDayFontWeight: "400",
        textMonthFontWeight: "500",
        textDayHeaderFontWeight: "400",
      }}
      enableSwipeMonths
    />
  );
};

export { Calendar };
