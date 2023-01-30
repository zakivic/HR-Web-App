import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const performanceAdapter = createEntityAdapter({
  selectId: (performance) => performance._id,
  sortComparer: (a, b) => b.reviewDate.localeCompare(a.reviewDate),
});

const initialState = performanceAdapter.getInitialState();
export const performanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getDepartments: builder.query({
    //   query: ({ page, rowsPerPage }) =>
    //     `/departments?page=${page}&rowsPerPage=${rowsPerPage}`,
    //   providesTags: ["Departments"],
    // }),
    getPerformanceById: builder.query({
      query: (id) => `/performance/${id}`,
      providesTags: (result, error, id) => [{ type: "Performance", _id: id }],
    }),
    createPerformance: builder.mutation({
      query: (data) => ({
        url: "/performance/create-performance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) =>
        [
          { type: "Performance" },
          // If the performance has an id, invalidate that specific performance
          result?.data?._id && { type: "Performance", _id: result.data._id },
        ].filter(Boolean),
    }),
    updatePerformance: builder.mutation({
      query: ({ data, id }) => ({
        url: `/performance/update-performance/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Performance", _id: id },
        { type: "Performance", _id: "ALL" },
      ],
    }),
    deletePerformance: builder.mutation({
      query: (ids) => ({
        url: `/performance/delete-performances`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((_id) => ({ type: "Performance", _id })),
    }),
  }),
});

export const {
  useGetPerformanceByIdQuery,
  useLazyGetPerformanceByIdQuery,
  useCreatePerformanceMutation,
  useUpdatePerformanceMutation,
  useDeletePerformanceMutation,
} = performanceApiSlice;
