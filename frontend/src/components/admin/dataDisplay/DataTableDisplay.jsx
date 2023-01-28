import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Checkbox,
  Avatar,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { handleSelected } from "../../../features/selectItemsSlice";

const DataTableDisplay = (props) => {
  const {
    data,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    validationSchema,
    dataKey,
  } = props;

  console.log(validationSchema);
  console.log(data);
  const dispatch = useDispatch();

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

  const content = (
    <>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
              >
                Select
              </TableCell>
              {dataKey === "employees" && (
                <TableCell
                  align="center"
                  sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                >
                  Photo
                </TableCell>
              )}
              {Object.keys(validationSchema.fields)
                .filter((field) => field !== "photo")
                .map((field) => (
                  <TableCell
                    align="center"
                    key={field}
                    sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                  >
                    {validationSchema.fields[field].spec.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.[dataKey]?.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">
                  <Checkbox onChange={(e) => handleCheck(e, item._id)} />
                </TableCell>
                {dataKey === "employees" && (
                  <TableCell align="center">
                    <Avatar
                      variant="rounded"
                      alt={item.name}
                      src={item.photo}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                )}
                {Object.keys(validationSchema.fields)
                  .filter((field) => field !== "photo")
                  .map((field) => {
                    let fieldValue;
                    if (
                      (Array.isArray(item[field]) &&
                        item[field].length === 0) ||
                      !item[field]
                    ) {
                      fieldValue = "No " + field + " assigned";
                    } else if (
                      Array.isArray(item[field]) &&
                      item[field].length > 0
                    ) {
                      fieldValue = item[field].length + " elements" + " View";
                    } else {
                      fieldValue = item[field];
                    }
                    return (
                      <TableCell align="center" key={field}>
                        {/* <Typography variant="body1"> */}
                        {fieldValue}
                        {/* </Typography> */}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.totalCount && (
        <TablePagination
          rowsPerPageOptions={
            data?.totalCount < 6 ? [data?.totalCount] : [6, 12, 18, 24, 30]
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
    </>
  );

  return <>{content}</>;
};

export default DataTableDisplay;
