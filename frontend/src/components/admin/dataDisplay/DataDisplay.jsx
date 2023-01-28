import {
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import { useState } from "react";

import { useGetDataQuery } from "../../../features/dataFetchingSlice";
import DataTableDisplay from "./DataTableDisplay";

import { employeeValidationSchema } from "../schemas/employeeSchema";
import { departmentValidationSchema } from "../schemas/departmentSchema";
import { trainingValidationSchema } from "../schemas/trainingSchema";
import { performanceValidationSchema } from "../schemas/performanceSchema";

const DataDisplay = (props) => {
  const { title } = props;
  const [view, setView] = useState("table");
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
    title: title,
    page: page + 1,
    rowsPerPage,
  });

  console.log(data);
  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  let dataKey;
  let validationSchema;
  switch (title) {
    case "Employees":
      validationSchema = employeeValidationSchema;
      dataKey = "employees";
      break;
    case "Department":
      validationSchema = departmentValidationSchema;
      dataKey = "departments";
      break;
    case "Training":
      validationSchema = trainingValidationSchema;
      dataKey = "trainings";
      break;
    case "Performance":
      validationSchema = performanceValidationSchema;
      dataKey = "performanceReviews";
      break;

    default:
      validationSchema = null;
      dataKey = "";
      break;
  }

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
          No {title} found. Add a new {title} to see it here
        </Typography>
      );
    } else {
      content = (
        <DataTableDisplay
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          data={data}
          validationSchema={validationSchema}
          dataKey={dataKey}
        />
      );
    }
  } else if (isError) {
    console.log(error);
  }

  return (
    <Paper sx={{ padding: 1 }}>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        width="100%"
        p={1}
      >
        <Typography variant="h5">{title}</Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="text alignment"
        >
          <ToggleButton value="table" aria-label="display as table">
            <FormatAlignJustifyIcon />
          </ToggleButton>
          <ToggleButton value="cards" aria-label="display as cards">
            <AppsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {/* --------Display--------- */}
      {content}
    </Paper>
  );
};

export default DataDisplay;
