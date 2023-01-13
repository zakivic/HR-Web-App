import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Field } from "formik";
import CommonTextField from "./CommonTextField";

const TrainingForm = (props) => {
  const { errors, touched, values, setFieldTouched, setFieldValue } = props;

  return (
    <>
      <CommonTextField
        required={true}
        fieldName="employee"
        fieldLabel="Employee"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(value) => setFieldValue("startDate", value, true)}
          value={values.startDate}
          renderInput={(params) => (
            <Field
              {...params}
              required
              name="startDate"
              label="Start Date"
              fullWidth
              as={TextField}
              helperText={touched.startDate && errors.startDate}
              onBlur={() => setFieldTouched("startDate", true)}
              error={Boolean(touched.startDate && errors.startDate)}
            />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(value) => setFieldValue("endDate", value, true)}
          value={values.endDate}
          renderInput={(params) => (
            <Field
              {...params}
              required
              name="endDate"
              label="End Date"
              fullWidth
              as={TextField}
              helperText={touched.endDate && errors.endDate}
              onBlur={() => setFieldTouched("endDate", true)}
              error={Boolean(touched.endDate && errors.endDate)}
            />
          )}
        />
      </LocalizationProvider>
      <CommonTextField
        required={true}
        fieldName="course"
        fieldLabel="Course"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
      <CommonTextField
        required={true}
        fieldName="trainer"
        fieldLabel="Trainer"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
      <CommonTextField
        required={true}
        fieldName="location"
        fieldLabel="Location"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    </>
  );
};

export default TrainingForm;
