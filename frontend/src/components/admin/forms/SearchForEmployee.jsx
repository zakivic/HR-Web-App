import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { Field } from "formik";

import { useState } from "react";

import { useGetDataQuery } from "../../../features/dataFetchingSlice";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const formatEmployee = (employee) => ({
  _id: employee._id,
  name: `${employee.firstName} ${employee.lastName}`,
  photo: employee.photo,
});

function mapSelectedNamesToIds(values, multi, formattedEmployees) {
  const nameToIdMap = formattedEmployees.reduce((map, formattedEmployee) => {
    map[formattedEmployee.name] = formattedEmployee._id;
    return map;
  }, {});

  if (multi) {
    return values.map((value) => nameToIdMap[value]);
  } else {
    console.log(values[0]);
    return nameToIdMap[values];
  }
}

const SearchForEmployee = (props) => {
  const { multiSelect, fieldName, fieldLabel, values, setFieldValue } = props;
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  // Check the value of the flag
  const multi = multiSelect || false;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let content;
  let formattedEmployees;
  if (isUninitialized) {
    content = <p>Initializing request...</p>;
  } else if (isLoading) {
    content = <p>Loading data...</p>;
  } else if (isFetching) {
    content = <p>Fetching data...</p>;
  } else if (isSuccess) {
    formattedEmployees = data?.employees.map(formatEmployee);
    if (data.totalCount === 0) {
      content = (
        <Typography m={1} color="error" variant="h6">
          No Employees found. Add a new Employee in the employee section
        </Typography>
      );
    } else {
      console.log(data);
      content = formattedEmployees.map((employee) => (
        <MenuItem
          key={employee._id}
          value={employee.name}
          style={getStyles(employee.name, personName, theme)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {multi && (
              <Checkbox checked={personName.indexOf(employee.name) > -1} />
            )}
            <Avatar alt={employee.name} src={employee.photo} />
            <ListItemText primary={employee.name} />
          </Stack>
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
    console.log(event);
    setPersonName(multi ? value : [value]);
    const valueAsId = mapSelectedNamesToIds(value, multi, formattedEmployees);
    setFieldValue(fieldName, valueAsId, true);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">{fieldLabel}</InputLabel>
        <Field
          labelId="demo-multiple-chip-label"
          as={Select}
          id="selectId"
          multiple={multi}
          name={fieldName}
          defaultValue=""
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
          // renderValue={(selected) => (
          //   <Box
          //     id="chipContainerId"
          //     sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
          //   >
          //     {renderChips(selected, handleDelete)}
          //   </Box>
          // )}
          MenuProps={MenuProps}
        >
          {content}
          <MenuItem>
            {data?.totalCount && (
              <TablePagination
                rowsPerPageOptions={
                  data?.totalCount < 6
                    ? [data?.totalCount]
                    : [6, 12, 18, 24, 30]
                }
                component="div"
                count={data?.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ position: "sticky", top: 0 }}
              />
            )}
          </MenuItem>
        </Field>
      </FormControl>
    </div>
  );
};

export default SearchForEmployee;
