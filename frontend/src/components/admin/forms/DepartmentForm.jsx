import { TextField } from "@mui/material";
import { useState } from "react";

const DepartmentForm = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <TextField
        required
        name="name"
        label="Name"
        type="text"
        fullWidth
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="manager"
        label="Manager"
        type="text"
        fullWidth
        value={formData.manager}
        onChange={handleChange}
      />
      <TextField
        name="employees"
        label="Employees"
        type="text"
        fullWidth
        value={formData.employees}
        onChange={handleChange}
      />
    </>
  );
};

export default DepartmentForm;
