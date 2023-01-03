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

import { useState } from "react";
import { Formik, Form } from "formik";

import EmployeesForm from "./forms/EmployeesForm";
import DepartmentForm from "./forms/DepartmentForm";
import PerformanceForm from "./forms/PerformanceForm";
import TrainingForm from "./forms/TrainingForm";

import { trainingSchema } from "./schemas/trainingSchema";

const AdminDialog = (props) => {
  const { onClose, setOpenDialog, openDialog, title } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={openDialog} fullWidth>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Formik
          validationSchema={trainingSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            setIsSubmitting(false);
          }}
          onChange={() => setIsSubmitting(true)}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Stack spacing={1.5}>
                {title === "Employees" && (
                  <EmployeesForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {title === "Department" && (
                  <DepartmentForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {title === "Performance" && (
                  <PerformanceForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {title === "Training" && (
                  <TrainingForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained">
          <Button type="submit" size="large" disabled={isSubmitting}>
            Submit
          </Button>
          <Button onClick={() => setOpenDialog(false)} size="small">
            <CloseIcon />
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;
