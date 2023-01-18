import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  TablePagination,
  Checkbox,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useGetDepartmentsQuery } from "../../../features/departmentSlice";
import { handleSelected } from "../../../features/selectItemsSlice";

const Departments = (props) => {
  const { title } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [view, setView] = useState("table");
  const dispatch = useDispatch();

  const { isLoading, data } = useGetDepartmentsQuery({
    page: page + 1,
    rowsPerPage,
  });

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheck = (event, id) => {
    dispatch(handleSelected(id));
  };

  return (
    <Paper>
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
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Select</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Manager</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Employees</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            ) : (
              data.departments.map((department) => (
                <TableRow key={department._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={(e) => handleCheck(e, department._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{department.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {department.manager || "No manager assigned"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {department.employees.length > 0
                        ? department.employees.length
                        : "No employees assigned"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.totalCount && (
        <TablePagination
          rowsPerPageOptions={[6, 12, 18, 24, 30]}
          component="div"
          count={data?.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ position: "sticky", top: 0 }}
        />
      )}
    </Paper>
  );
};

export default Departments;
