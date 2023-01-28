import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const departmentAdapter = createEntityAdapter({
  selectId: (department) => department._id,
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState = departmentAdapter.getInitialState();
export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => "/departments/all",
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
      query: ({ data, id }) => ({
        url: `/departments/update-department/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Departments", _id: id },
        { type: "Departments", _id: "ALL" },
      ],
    }),
    deleteDepartments: builder.mutation({
      query: (ids) => ({
        url: `/departments/delete-departments`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((_id) => ({ type: "Departments", _id })),
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useLazyGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentsMutation,
} = departmentApiSlice;
