import {
  Dialog,
  DialogContent,
  DialogTitle,
  ButtonGroup,
  DialogActions,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommonTextField from "./CommonTextField";
import ImageDropZone from "./ImageUpload";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  homePhone: "",
  hireDate: new Date(),
  department: "",
  jobTitle: "",
  nationalIDNumber: "",
  socialSecurityNumber: "",
  nationality: "",
  gender: "",
  address: "",
  photo: "",
  bloodType: "",
  educationStatus: "",
  militaryStatus: "",
  martialStatus: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobilePhone: Yup.string().required("Mobile phone is required"),
  homePhone: Yup.string(),
  hireDate: Yup.date().required("Hire date is required"),
  department: Yup.string().required("Department is required"),
  jobTitle: Yup.string().required("Job title is required"),
  nationalIDNumber: Yup.string().required("National ID number is required"),
  socialSecurityNumber: Yup.string().required(
    "Social security number is required"
  ),
  nationality: Yup.string().required("Nationality is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  photo: Yup.mixed().required("Photo is required"),
  bloodType: Yup.string().required("Blood type is required"),
  educationStatus: Yup.string().required("Education status is required"),
  militaryStatus: Yup.string().required("Military status is required"),
  martialStatus: Yup.string().required("Martial status is required"),
});

const EmployeesForm = (props) => {
  const { onClose, openDialog, title } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("called");
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
                  fieldName="firstName"
                  fieldLabel="First Name"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="lastName"
                  fieldLabel="Last Name"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="email"
                  fieldLabel="Email"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="mobilePhone"
                  fieldLabel="Mobile Phone"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  fieldName="homePhone"
                  fieldLabel="Home Phone"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) => setFieldValue("hireDate", value, true)}
                    value={values.hireDate}
                    renderInput={(params) => (
                      <Field
                        {...params}
                        required
                        name="hireDate"
                        label="Hire Date"
                        fullWidth
                        as={TextField}
                        helperText={touched.hireDate && errors.hireDate}
                        onBlur={() => setFieldTouched("hireDate", true)}
                        error={Boolean(touched.hireDate && errors.hireDate)}
                      />
                    )}
                  />
                </LocalizationProvider>
                <CommonTextField
                  required={true}
                  fieldName="department"
                  fieldLabel="Department"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="jobTitle"
                  fieldLabel="Job Title"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="nationalIDNumber"
                  fieldLabel="National ID Numbe"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="socialSecurityNumber"
                  fieldLabel="Social Security Number"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="nationality"
                  fieldLabel="Nationality"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  required={true}
                  fieldName="address"
                  fieldLabel="Address"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <FormControl>
                  <InputLabel required id="gender-label">
                    Gender
                  </InputLabel>
                  <Field
                    name="gender"
                    as={Select}
                    labelId="gender-label"
                    label="Gender"
                    defaultValue=""
                    error={Boolean(touched.gender && errors.gender)}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Field>
                  {touched.gender && errors.gender && (
                    <FormHelperText error>{errors.gender}</FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel required id="blood-type-label">
                    Blood Type
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="blood-type-label"
                    label="Blood Type"
                    name="bloodType"
                    defaultValue=""
                    error={Boolean(touched.bloodType && errors.bloodType)}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </Field>
                  {touched.bloodType && errors.bloodType && (
                    <FormHelperText error>{errors.bloodType}</FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel required id="martialStatus-label">
                    Martial Status
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="martialStatus-label"
                    label="Martial Status"
                    name="martialStatus"
                    defaultValue=""
                    error={Boolean(
                      touched.martialStatus && errors.martialStatus
                    )}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Field>
                  {touched.martialStatus && errors.martialStatus && (
                    <FormHelperText error>
                      {errors.martialStatus}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel required id="militaryStatus-label">
                    Military Status
                  </InputLabel>
                  <Field
                    as={Select}
                    required
                    labelId="militaryStatus-label"
                    label="Military Status"
                    name="militaryStatus"
                    defaultValue=""
                    error={Boolean(
                      touched.militaryStatus && errors.militaryStatus
                    )}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Reserve">Reserve</MenuItem>
                    <MenuItem value="Veteran">Veteran</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                  </Field>
                  {touched.militaryStatus && errors.militaryStatus && (
                    <FormHelperText error>
                      {errors.militaryStatus}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel required id="educationStatus-label">
                    Education Status
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="educationStatus-label"
                    label="Education Status"
                    name="educationStatus"
                    defaultValue=""
                    error={Boolean(
                      touched.educationStatus && errors.educationStatus
                    )}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="High School">High School</MenuItem>
                    <MenuItem value="Associate">Associate</MenuItem>
                    <MenuItem value="Bachelor">Bachelor</MenuItem>
                    <MenuItem value="Master">Master</MenuItem>
                    <MenuItem value="Doctorate">Doctorate</MenuItem>
                  </Field>
                  {touched.educationStatus && errors.educationStatus && (
                    <FormHelperText error>
                      {errors.educationStatus}
                    </FormHelperText>
                  )}
                </FormControl>
                <Field
                  name="photo"
                  label="Photo"
                  required
                  value={values.photo}
                  component={ImageDropZone}
                  setFieldValue={setFieldValue}
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

export default EmployeesForm;
