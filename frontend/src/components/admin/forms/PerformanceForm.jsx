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

import { useState } from "react";

const PerformanceForm = (props) => {
  const { onClose, setOpenDialog, openDialog, title } = props;
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };
  return (
    <Dialog onClose={handleClose} open={openDialog} fullWidth>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1.5}>
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
              name="reviewDate"
              label="Review Date"
              value={formData.reviewDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            required
            name="manager"
            label="Manager"
            type="text"
            fullWidth
            value={formData.manager}
            onChange={handleChange}
          />
          <TextField
            required
            name="reviewPeriodStart"
            label="Review Period Start"
            type="text"
            fullWidth
            value={formData.reviewPeriodStart}
            onChange={handleChange}
          />
          <TextField
            required
            name="reviewPeriodEnd"
            label="Review Period End"
            type="text"
            fullWidth
            value={formData.reviewPeriodEnd}
            onChange={handleChange}
          />
          <TextField
            required
            name="reviewType"
            label="Review Type"
            type="text"
            fullWidth
            value={formData.reviewType}
            onChange={handleChange}
          />
          <TextField
            required
            name="rating"
            label="Rating"
            type="text"
            fullWidth
            value={formData.rating}
            onChange={handleChange}
          />
          <TextField
            required
            name="comments"
            label="Comments"
            type="text"
            fullWidth
            value={formData.comments}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained">
          <Button onClick={handleSubmit} size="large">
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

export default PerformanceForm;
