import { Field, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import s from "./RentalForm.module.css";
import clsx from "clsx";
import DatePickerField from "../DatePickerField/DatePickerField";

const RentalForm = () => {
  return (
    <div className={s.box}>
      <h2>Book your car now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={{ name: "", email: "", bookingDate: null, comment: "" }}
        onSubmit={(values, action) => {
          console.log(values);
          action.resetForm();
        }}
      >
        <Form className={s.form}>
          <Field
            className={s.input}
            name="name"
            type="text"
            placeholder="Name*"
          />
          <Field
            className={s.input}
            name="email"
            type="text"
            placeholder="Email*"
          />
          <DatePickerField name="bookingDate" />
          <Field
            as="textarea"
            className={clsx(s.input, s.comment)}
            name="comment"
            type="text"
            placeholder="Comment"
          />
          <button className={s.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RentalForm;
