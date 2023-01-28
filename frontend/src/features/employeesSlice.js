import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const employeeAdapter = createEntityAdapter({
  selectId: (employee) => employee._id,
  sortComparer: (a, b) => b.hireDate.localeCompare(a.hireDate),
});

const initialState = employeeAdapter.getInitialState();
export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getEmployees: builder.query({
    //   query: ({ page, rowsPerPage }) =>
    //     `/employees?page=${page}&rowsPerPage=${rowsPerPage}`,
    //   providesTags: ["Employees"],
    // }),
    getEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employees", _id: id }],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employees/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) =>
        [
          { type: "Employees" },
          // If the employee has an id, invalidate that specific employee
          result?.data?._id && { type: "Employees", _id: result.data._id },
        ].filter(Boolean),
    }),
    updateEmployee: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/update-employee/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Employees", _id: id },
        { type: "Employees", _id: "ALL" },
      ],
    }),
    deleteEmployees: builder.mutation({
      query: (ids) => ({
        url: `/employees/delete-employees`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((_id) => ({ type: "Employees", _id })),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLazyGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeesMutation,
} = employeeApiSlice;
