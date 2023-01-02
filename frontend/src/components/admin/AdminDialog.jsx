import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  ButtonGroup,
  DialogActions,
  Stack,
} from "@mui/material";

import { useState } from "react";

import EmployeesForm from "./forms/EmployeesForm";
import DepartmentForm from "./forms/DepartmentForm";
import PerformanceForm from "./forms/PerformanceForm";
import TrainingForm from "./forms/TrainingForm";

const AdminDialog = (props) => {
  const { onClose, selectedValue, openDialog, title } = props;
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit the form data
    console.log(formData);
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
            <TrainingForm formData={formData} setFormData={setFormData} />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="outlined">
          <Button>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;
