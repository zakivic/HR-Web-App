import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  ButtonGroup,
  DialogActions,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Formik, Form } from "formik";

// Forms
import EmployeesForm from "./forms/EmployeesForm";
import DepartmentForm from "./forms/DepartmentForm";
import PerformanceForm from "./forms/PerformanceForm";
import TrainingForm from "./forms/TrainingForm";

//  Initial values and validation Schemas
import {
  employeeInitialValues,
  employeeValidationSchema,
} from "./schemas/employeeSchema";
import {
  departmentInitialValues,
  departmentValidationSchema,
} from "./schemas/departmentSchema";
import {
  trainingInitialValues,
  trainingValidationSchema,
} from "./schemas/trainingSchema";
import {
  performanceInitialValues,
  performanceValidationSchema,
} from "./schemas/performanceSchema";

const AdminDialog = (props) => {
  const { onClose, openDialog, title } = props;

  let initialValues;
  let validationSchema;
  switch (title) {
    case "Employees":
      initialValues = employeeInitialValues;
      validationSchema = employeeValidationSchema;
      break;
    case "Department":
      initialValues = departmentInitialValues;
      validationSchema = departmentValidationSchema;
      break;
    case "Training":
      initialValues = trainingInitialValues;
      validationSchema = trainingValidationSchema;
      break;
    case "Performance":
      initialValues = performanceInitialValues;
      validationSchema = performanceValidationSchema;
      break;

    default:
      initialValues = null;
      validationSchema = null;
      break;
  }

  return (
    <Formik
      key={title}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
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
        resetForm,
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
                {title === "Employees" && (
                  <EmployeesForm
                    errors={errors}
                    touched={touched}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                )}
                {title === "Department" && (
                  <DepartmentForm
                    errors={errors}
                    touched={touched}
                    setFieldTouched={setFieldTouched}
                  />
                )}
                {title === "Training" && (
                  <TrainingForm
                    errors={errors}
                    touched={touched}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                )}
                {title === "Performance" && (
                  <PerformanceForm
                    errors={errors}
                    touched={touched}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                )}
              </Stack>
            </Form>
          </DialogContent>
          <DialogActions>
            <ButtonGroup variant="contained">
              <Button onClick={handleSubmit} size="large">
                Submit
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                size="small"
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default AdminDialog;
