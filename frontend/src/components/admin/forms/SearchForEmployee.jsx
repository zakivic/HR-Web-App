import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { useGetDataQuery } from "../../../features/dataFetchingSlice";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchForEmployee = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const {
    data,
    isFetching,
    isLoading,
    isUninitialized,
    isSuccess,
    isError,
    error,
  } = useGetDataQuery({
    title: "Employees",
    page: page + 1,
    rowsPerPage,
  });

  let content;
  if (isUninitialized) {
    content = <p>Initializing request...</p>;
  } else if (isLoading) {
    content = <p>Loading data...</p>;
  } else if (isFetching) {
    content = <p>Fetching data...</p>;
  } else if (isSuccess) {
    if (data.totalCount === 0) {
      content = (
        <Typography m={1} color="error" variant="h6">
          No Employees found. Add a new Employee in the employee section
        </Typography>
      );
    } else {
      console.log(data);
      content = data.employees.map((employee) => (
        <MenuItem
          key={employee._id}
          value={employee.firstName}
          style={getStyles(employee.firstName, personName, theme)}
        >
          {employee.firstName}
        </MenuItem>
      ));
    }
  } else if (isError) {
    console.log(error);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Employees</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Employees" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {content}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchForEmployee;
