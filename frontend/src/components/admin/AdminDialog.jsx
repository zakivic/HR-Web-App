import { useState } from "react";

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

import EmployeesForm from "./forms/EmployeesForm";
import DepartmentForm from "./forms/DepartmentForm";
import PerformanceForm from "./forms/PerformanceForm";
import TrainingForm from "./forms/TrainingForm";

const AdminDialog = (props) => {
  const { onClose, setOpenDialog, openDialog, title } = props;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are no errors
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      console.log(formData);
    }
  };

  return (
    <Dialog onClose={handleClose} open={openDialog} fullWidth>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1.5}>
          {title === "Employees" && (
            <EmployeesForm formData={formData} setFormData={setFormData} />
          )}
          {title === "Department" && (
            <DepartmentForm formData={formData} setFormData={setFormData} />
          )}
          {title === "Performance" && (
            <PerformanceForm formData={formData} setFormData={setFormData} />
          )}
          {title === "Training" && (
            <TrainingForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained">
          <Button
            onClick={handleSubmit}
            size="large"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
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
