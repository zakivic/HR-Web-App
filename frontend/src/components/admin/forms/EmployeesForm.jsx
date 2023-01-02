import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import React, { useState } from "react";

const ImageBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed grey",
});

const EmployeesForm = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <TextField
        required
        name="firstName"
        label="First Name"
        type="text"
        fullWidth
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        name="lastName"
        label="Last Name"
        type="text"
        fullWidth
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        required
        name="email"
        label="Email"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <TextField
        required
        name="mobilePhone"
        label="Mobile Phone"
        type="text"
        fullWidth
        value={formData.mobilePhone}
        onChange={handleChange}
        autoComplete="mobilePhone"
      />
      <TextField
        name="homePhone"
        label="Home Phone"
        type="text"
        fullWidth
        value={formData.homePhone}
        onChange={handleChange}
        autoComplete="homePhone"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="hireDate"
          label="Hire Date"
          value={formData.hireDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        required
        name="department"
        label="Department"
        type="text"
        fullWidth
        value={formData.department}
        onChange={handleChange}
      />
      <TextField
        required
        name="jobTitle"
        label="Job Title"
        type="text"
        fullWidth
        value={formData.jobTitle}
        onChange={handleChange}
      />
      <TextField
        required
        name="nationalIDNumber"
        label="National ID Number"
        type="text"
        fullWidth
        value={formData.nationalIDNumber}
        onChange={handleChange}
      />
      <TextField
        required
        name="socialSecurityNumber"
        label="Social Security Number"
        type="text"
        fullWidth
        value={formData.socialSecurityNumber}
        onChange={handleChange}
        autoComplete="socialSecurityNumber"
      />
      <TextField
        required
        name="nationality"
        label="Nationality"
        type="text"
        fullWidth
        value={formData.nationality}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          required
          labelId="gender-label"
          name="gender"
          defaultValue="Male"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        name="address"
        label="Address"
        type="text"
        fullWidth
        value={formData.address}
        onChange={handleChange}
      />
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <ImageBox {...getRootProps()}>
            <input
              name="photo"
              value={formData.photo}
              {...getInputProps()}
              onChange={handleChange}
            />
            <Button component="span">Select Photo</Button>
            <p>or drag 'n' drop Photo here</p>
          </ImageBox>
        )}
      </Dropzone>
      <FormControl>
        <InputLabel id="bloodType-label">Blood Type</InputLabel>
        <Select
          required
          labelId="bloodType-label"
          name="bloodType"
          defaultValue="A+"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="martialStatus-label">Martial Status</InputLabel>
        <Select
          required
          labelId="martialStatus-label"
          name="martialStatus"
          defaultValue="Single"
          value={formData.martialStatus}
          onChange={handleChange}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
          <MenuItem value="Widowed">Widowed</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="militaryStatus-label">Military Status</InputLabel>
        <Select
          required
          labelId="militaryStatus-label"
          name="militaryStatus"
          defaultValue="None"
          value={formData.militaryStatus}
          onChange={handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Reserve">Reserve</MenuItem>
          <MenuItem value="Veteran">Veteran</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="educationStatus-label">Education Status</InputLabel>
        <Select
          labelId="educationStatus-label"
          name="educationStatus"
          defaultValue="High School"
          value={formData.educationStatus}
          onChange={handleChange}
        >
          <MenuItem value="High School">High School</MenuItem>
          <MenuItem value="Associate">Associate</MenuItem>
          <MenuItem value="Bachelor">Bachelor</MenuItem>
          <MenuItem value="Master">Master</MenuItem>
          <MenuItem value="Doctorate">Doctorate</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default EmployeesForm;
