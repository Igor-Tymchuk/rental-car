import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import s from "./DatePickerField.module.css";

const DatePickerField = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DatePicker
      selected={field.value}
      onChange={(val) => setFieldValue(name, val)}
      className={s.input}
      calendarClassName={s.datePickerCalendar}
      dayClassName={() => s.datePickerDay}
      formatWeekDay={(day) => day.toUpperCase().slice(0, 3)}
      popperClassName={s.datePickerPopper}
      placeholderText="Booking date"
    />
  );
};

export default DatePickerField;
