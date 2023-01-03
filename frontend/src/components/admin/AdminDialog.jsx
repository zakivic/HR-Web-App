import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, ButtonGroup, DialogActions, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import EmployeesForm from "./forms/EmployeesForm";
import DepartmentForm from "./forms/DepartmentForm";
import PerformanceForm from "./forms/PerformanceForm";

const ImageBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed grey",
});
const AdminDialog = (props) => {
  const { onClose, setOpenDialog, openDialog, title } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (event) => {
    onClose(event.target.value);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
          {title === "Employees" && <EmployeesForm />}
          {title === "Department" && <DepartmentForm />}
          {title === "Performance" && <PerformanceForm />}
          {title === "Training" && (
            <>
              <TextField
                required
                name="employee"
                label="Employee"
                type="text"
                fullWidth
                value={formData.employee}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="startDate"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleListItemClick}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="endDate"
                  label="End Date"
                  value={formData.endDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={handleChange}
                />
              </LocalizationProvider>
              <TextField
                required
                name="course"
                label="Course"
                type="text"
                fullWidth
                value={formData.course}
                onChange={handleChange}
              />
              <TextField
                required
                name="trainer"
                label="Trainer"
                type="text"
                fullWidth
                value={formData.trainer}
                onChange={handleChange}
              />
              <TextField
                required
                name="location"
                label="Location"
                type="text"
                fullWidth
                value={formData.location}
                onChange={handleChange}
              />
              <TextField
                required
                name="cost"
                label="Cost"
                type="text"
                fullWidth
                value={formData.cost}
                onChange={handleChange}
              />
            </>
          )}
        </Stack>
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
