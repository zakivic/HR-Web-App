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

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import CommonTextField from "./CommonTextField";

const initialValues = { name: "", manager: "", employees: "" };

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  manager: Yup.string(),
  employees: Yup.string(),
});

const DepartmentForm = (props) => {
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
      {({ errors, touched, handleSubmit, setFieldTouched }) => (
        <Dialog open={openDialog} fullWidth>
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <DialogContent dividers>
            <Form>
              <Stack spacing={1.5}>
                <CommonTextField
                  required={true}
                  fieldName="name"
                  fieldLabel="Name"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  fieldName="manager"
                  fieldLabel="Manager"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                <CommonTextField
                  fieldName="employees"
                  fieldLabel="Employees"
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

export default DepartmentForm;
