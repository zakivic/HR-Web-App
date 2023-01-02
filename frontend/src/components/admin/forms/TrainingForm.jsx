import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TrainingForm = (props) => {
  const { formData, setFormData } = props;
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
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
          onChange={handleChange}
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
  );
};

export default TrainingForm;
