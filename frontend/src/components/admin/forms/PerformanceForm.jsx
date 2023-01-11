import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  ButtonGroup,
  DialogActions,
  Stack,
  TextField,
  Slider,
  FormLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommonTextField from "./CommonTextField";

// Initial values
const initialValues = {
  employee: "",
  reviewDate: new Date(),
  manager: "",
  strengths: "",
  areasForImprovement: "",
  goals: "",
  overallRating: 1,
};

// Yup validation schema
const validationSchema = Yup.object({
  employee: Yup.string().required("Employee is required"),
  reviewDate: Yup.date().required("Review date is required"),
  manager: Yup.string().required("Manager is required"),
  strengths: Yup.string().required("Strengths is required"),
  areasForImprovement: Yup.string().required(
    "Areas for Improvement is required"
  ),
  goals: Yup.string().required("Goals is required"),
  overallRating: Yup.number()
    .required("Overall rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

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
  const { onClose, openDialog, title } = props;

  function valuetext(value) {
    return `${value}`;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        // make API call to create department
        actions.resetForm();
        onClose();
      }}
    >
      {({
        errors,
        touched,
        handleSubmit,
        values,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Dialog open={openDialog} fullWidth>
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <DialogContent dividers>
            <Form>
              <Stack spacing={1.5}>
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
                    onChange={(value) =>
                      setFieldValue("reviewDate", value, true)
                    }
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
                    getAriaValueText={valuetext}
                    step={0.25}
                    min={1}
                    max={5}
                    marks={marks}
                    valueLabelDisplay="on"
                    sx={{ mt: 5, mb: 5 }}
                  />
                </FormControl>
              </Stack>
            </Form>
          </DialogContent>
          <DialogActions>
            <ButtonGroup variant="contained">
              <Button onClick={handleSubmit} size="large">
                Submit
              </Button>
              <Button onClick={() => onClose()} size="small">
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default PerformanceForm;
