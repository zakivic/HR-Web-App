import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const departmentAdapter = createEntityAdapter({
  selectId: (department) => department._id,
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState = departmentAdapter.getInitialState();
export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
    getDepartmentById: builder.query({
      query: (id) => `/departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Departments", _id: id }],
    }),
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/departments/create-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) =>
        [
          { type: "Departments" },
          // If the department has an id, invalidate that specific department
          result?.data?._id && { type: "Departments", _id: result.data._id },
        ].filter(Boolean),
    }),
    updateDepartment: builder.mutation({
      query: (data, id) => ({
        url: `/departments/update-department/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Departments", _id: id },
        { type: "Departments", _id: "ALL" },
      ],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/delete-department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Departments", id }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
