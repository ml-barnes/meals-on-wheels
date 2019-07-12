import "drivers/props/styles/styles.css";
//import { handleDayClick } from '../functions/DayClickEventFunction.js'

/*const attributes = {
    containerProps: { style: { display: "inline" } },
    format: "M/D/YYYY",
    //onDayClick: this.handleDayClick,
    numberOfMonths: 4,
    fromMonth: new Date(),
    disabledDays: [
        { daysOfWeek: [0] },
        { before: new Date() }
    ]
}*/

function GetDayPickerAttributes(selectedDays, dayClick) {
  return {
    selectedDays: selectedDays,
    format: "M/D/YYYY",
    onDayClick: dayClick,
    numberOfMonths: 4,
    fromMonth: new Date(),
    disabledDays: [{ daysOfWeek: [0] }, { before: new Date() }]
  };
}

export default GetDayPickerAttributes;
