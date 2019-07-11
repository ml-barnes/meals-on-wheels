import DayPicker, { DateUtils } from 'react-day-picker';

export const handleDayClick = (day, { selected }, modifiers = {}, event) => {
    var { selectedDays } = this.state;

    if (modifiers.disabled) {
        return;
    }

    if (selected) {
        const selectedIndex = selectedDays.findIndex(selectedDay =>
            DateUtils.isSameDay(selectedDay, day)
        );
        selectedDays.splice(selectedIndex, 1);
    } else {
        selectedDays.push(day);
    }

    console.log("Formatted: ", day.toLocaleDateString());
    console.log(selectedDays);
    this.setState({ selectedDays });
}