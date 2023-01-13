import { TextField, Slider, FormLabel, FormControl } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Field } from "formik";

import CommonTextField from "./CommonTextField";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const PerformanceForm = (props) => {
  const { errors, touched, values, setFieldTouched, setFieldValue } = props;

  function valueText(value) {
    return `${value}`;
  }
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
          onChange={(value) => setFieldValue("reviewDate", value, true)}
          value={values.reviewDate}
          renderInput={(params) => (
            <Field
              {...params}
              required
              name="reviewDate"
              label="Review Date"
              fullWidth
              as={TextField}
              helperText={touched.reviewDate && errors.reviewDate}
              onBlur={() => setFieldTouched("reviewDate", true)}
              error={Boolean(touched.reviewDate && errors.reviewDate)}
            />
          )}
        />
      </LocalizationProvider>
      <CommonTextField
        required={true}
        fieldName="manager"
        fieldLabel="Manager"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
      <Field
        required={true}
        name="strengths"
        label="Strengths"
        as={TextField}
        error={Boolean(touched.strengths && errors.strengths)}
        multiline
        rows={4}
      />
      <Field
        required={true}
        name="areasForImprovement"
        label="Areas for Improvement"
        as={TextField}
        error={Boolean(
          touched.areasForImprovement && errors.areasForImprovement
        )}
        multiline
        rows={4}
      />
      <Field
        required
        name="goals"
        label="Goals"
        as={TextField}
        error={Boolean(touched.goals && errors.goals)}
        multiline
        rows={4}
      />
      <FormControl>
        <FormLabel required id="overall-rating-slider">
          Overall rating
        </FormLabel>
        <Slider
          aria-label="Always visible"
          defaultValue={1}
          getAriaValueText={valueText}
          step={0.25}
          min={1}
          max={5}
          marks={marks}
          valueLabelDisplay="on"
          sx={{ mt: 5, mb: 5 }}
        />
      </FormControl>
    </>
  );
};

export default PerformanceForm;
