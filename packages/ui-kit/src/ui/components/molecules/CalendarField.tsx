import React from 'react';
import { Calendar } from '../atoms/Calendar';

type CalendarFieldProps = {
    /** Callback when a day is pressed */
    onDayPress?: (day: {
        dateString: string;
        day: number;
        month: number;
        year: number;
        timestamp: number;
    }) => void;
};

/**
 * CalendarField Molecule
 * 
 * Molecule wrapper around the Calendar atom.
 * Provides a molecule-level interface for organisms to use calendars
 * without directly importing atoms.
 * 
 * @example
 * ```tsx
 * <CalendarField
 *   onDayPress={(day) => console.log(day.dateString)}
 * />
 * ```
 */
export const CalendarField: React.FC<CalendarFieldProps> = ({
    onDayPress,
}) => {
    return <Calendar onDayPress={onDayPress} />;
};
