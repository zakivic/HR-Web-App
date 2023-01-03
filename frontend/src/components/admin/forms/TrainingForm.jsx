import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TrainingForm = (props) => {
  const { values = {}, errors, touched, setFieldValue } = props;

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <TextField
        required
        name="employee"
        label="Employee"
        type="text"
        fullWidth
        value={values.employee || ""}
        onChange={(event) =>
          setFieldValue(event.target.name, event.target.value)
        }
        error={touched.employee && !!errors.employee}
        helperText={touched.employee && errors.employee}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="startDate"
          label="Start Date"
          value={values.startDate || null}
          onChange={(date) => setFieldValue("startDate", date)}
          error={touched.startDate && !!errors.startDate}
          helperText={touched.startDate && errors.startDate}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="endDate"
          label="End Date"
          value={values.endDate || null}
          onChange={(date) => setFieldValue("endDate", date)}
          error={touched.endDate && !!errors.endDate}
          helperText={touched.endDate && errors.endDate}
        />
      </LocalizationProvider>
      <TextField
        required
        name="description"
        label="Description"
        type="text"
        fullWidth
        value={values.description || ""}
        onChange={(event) =>
          setFieldValue(event.target.name, event.target.value)
        }
        error={touched.description && !!errors.description}
        helperText={touched.description && errors.description}
      />
    </>
  );
};

export default TrainingForm;
