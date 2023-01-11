import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  ButtonGroup,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommonTextField from "./CommonTextField";

const validationSchema = Yup.object({
  employee: Yup.string().required("Employee name is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(
      Yup.ref("startDate"),
      "End date must be later than or equal to start date"
    ),
  course: Yup.string().required("Course name is required"),
  trainer: Yup.string().required("Trainer name is required"),
  location: Yup.string().required("Location is required"),
});

const initialValues = {
  employee: "",
  startDate: new Date(),
  endDate: new Date(),
  course: "",
  trainer: "",
  location: "",
};

const TrainingForm = (props) => {
  const { onClose, openDialog, title } = props;

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
                      setFieldValue("startDate", value, true)
                    }
                    value={values.startDate}
                    renderInput={(params) => (
                      <Field
                        required
                        name="startDate"
                        label="Start Date"
                        fullWidth
                        as={TextField}
                        helperText={touched.startDate && errors.startDate}
                        onBlur={() => setFieldTouched("startDate", true)}
                        {...params}
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
                        required
                        name="endDate"
                        label="End Date"
                        fullWidth
                        as={TextField}
                        helperText={touched.endDate && errors.endDate}
                        onBlur={() => setFieldTouched("endDate", true)}
                        {...params}
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

export default TrainingForm;
