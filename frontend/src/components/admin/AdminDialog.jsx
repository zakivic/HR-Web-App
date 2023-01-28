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

import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../../features/departmentSlice";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../features/employeesSlice";
import {
  useCreatePerformanceMutation,
  useUpdatePerformanceMutation,
} from "../../features/performanceSlice";
import {
  useCreateTrainingMutation,
  useUpdateTrainingMutation,
} from "../../features/trainingSlice";

import {
  selectOpen,
  resetState,
  selectId,
  selectCaller,
} from "../../features/toggleDialogSlice";

import { createInitialValues } from "../../features/generalUtils";

const AdminDialog = (props) => {
  const { title, selectedData } = props;
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [createTraining] = useCreateTrainingMutation();
  const [updateTraining] = useUpdateTrainingMutation();
  const [createPerformance] = useCreatePerformanceMutation();
  const [updatePerformance] = useUpdatePerformanceMutation();
  console.log(selectedData);

  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const caller = useSelector(selectCaller);
  const selectedId = useSelector(selectId);

  const handleSubmit = async (values) => {
    const data = getdata(values);
    console.log(data);
    try {
      if (caller === "add") {
        let response;
        switch (title) {
          case "Employees":
            response = await createEmployee(data).unwrap();
            break;
          case "Department":
            response = await createDepartment(data).unwrap();
            break;
          case "Training":
            response = await createTraining(data).unwrap();
            break;
          case "Performance":
            response = await createPerformance(data).unwrap();
            break;
        }
      } else {
        let response;
        switch (title) {
          case "Employees":
            response = await updateEmployee({
              data,
              id: selectedId,
            }).unwrap();
            break;
          case "Department":
            response = await updateDepartment({
              data,
              id: selectedId,
            }).unwrap();
            break;
          case "Training":
            response = await updateTraining({
              data,
              id: selectedId,
            }).unwrap();
            break;
          case "Performance":
            response = await updatePerformance({
              data,
              id: selectedId,
            }).unwrap();
            break;
        }
      }

      // console.log(response);
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
      caller !== "edit"
        ? (initialValues = employeeInitialValues)
        : (initialValues = createInitialValues(
            selectedData,
            employeeValidationSchema
          ));
      validationSchema = employeeValidationSchema;
      break;
    case "Department":
      caller !== "edit"
        ? (initialValues = departmentInitialValues)
        : (initialValues = createInitialValues(
            selectedData,
            departmentValidationSchema
          ));
      validationSchema = departmentValidationSchema;
      break;
    case "Training":
      caller !== "edit"
        ? (initialValues = trainingInitialValues)
        : (initialValues = createInitialValues(
            selectedData,
            trainingValidationSchema
          ));
      validationSchema = trainingValidationSchema;
      break;
    case "Performance":
      caller !== "edit"
        ? (initialValues = performanceInitialValues)
        : (initialValues = createInitialValues(
            selectedData,
            performanceValidationSchema
          ));
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
