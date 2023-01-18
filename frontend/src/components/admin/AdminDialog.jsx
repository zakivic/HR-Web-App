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

import { useDispatch, useSelector } from "react-redux";

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

import { useCreateDepartmentMutation } from "../../features/departmentSlice";
import { useGetDepartmentByIdQuery } from "../../features/departmentSlice";
import {
  selectOpen,
  resetState,
  selectId,
  selectCaller,
} from "../../features/toggleDialogSlice";

import { createInitialValues } from "../../features/generalUtils";

const AdminDialog = (props) => {
  const { title } = props;
  const [createDepartment] = useCreateDepartmentMutation();
  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const caller = useSelector(selectCaller);
  const departmentId = useSelector(selectId);

  const { isLoading, data } = useGetDepartmentByIdQuery(departmentId);
  console.log(data);
  console.log(caller);
  const handleSubmit = async (values) => {
    const data = getdata(values);
    try {
      const response = await createDepartment(data).unwrap();
      console.log(response);
      // Do something with the response data
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  // Remove empty fields from the Form values
  const getdata = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  let initialValues;
  let validationSchema;
  switch (title) {
    case "Employees":
      initialValues = employeeInitialValues;
      validationSchema = employeeValidationSchema;
      break;
    case "Department":
      caller !== "edit"
        ? (initialValues = departmentInitialValues)
        : (initialValues = createInitialValues(
            data,
            departmentValidationSchema
          ));
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
        // make API call to create department
        handleSubmit(values);
        // reset the form
        actions.resetForm();
        dispatch(resetState());
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
        <Dialog open={open} fullWidth onClose={() => dispatch(resetState())}>
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
                  resetForm();
                  dispatch(resetState());
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
