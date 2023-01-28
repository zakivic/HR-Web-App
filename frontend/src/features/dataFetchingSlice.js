import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const dataFetchAdapter = createEntityAdapter({
  selectId: (data) => data._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id),
});

const initialState = dataFetchAdapter.getInitialState();
export const dataFetchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ title, page, rowsPerPage }) => {
        switch (title) {
          case "Department":
            return `/departments?page=${page}&rowsPerPage=${rowsPerPage}`;
          case "Employees":
            return `/employees?page=${page}&rowsPerPage=${rowsPerPage}`;
          case "Training":
            return `/training?page=${page}&rowsPerPage=${rowsPerPage}`;
          case "Performance":
            return `/performance?page=${page}&rowsPerPage=${rowsPerPage}`;
          default:
            throw new Error("Invalid title");
        }
      },
      providesTags: ["Departments", "Employees", "Training", "Performance"],
    }),
  }),
});

export const { useGetDataQuery } = dataFetchApiSlice;
