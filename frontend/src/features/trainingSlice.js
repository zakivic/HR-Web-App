import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const trainingAdapter = createEntityAdapter({
  selectId: (training) => training._id,
  sortComparer: (a, b) => b.startDate.localeCompare(a.startDate),
});

const initialState = trainingAdapter.getInitialState();
export const trainingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getDepartments: builder.query({
    //   query: ({ page, rowsPerPage }) =>
    //     `/departments?page=${page}&rowsPerPage=${rowsPerPage}`,
    //   providesTags: ["Departments"],
    // }),
    getTrainingById: builder.query({
      query: (id) => `/training/${id}`,
      providesTags: (result, error, id) => [{ type: "Training", _id: id }],
    }),
    createTraining: builder.mutation({
      query: (data) => ({
        url: "/training/create-training",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) =>
        [
          { type: "Training" },
          // If the training has an id, invalidate that specific training
          result?.data?._id && { type: "Training", _id: result.data._id },
        ].filter(Boolean),
    }),
    updateTraining: builder.mutation({
      query: ({ data, id }) => ({
        url: `/training/update-training/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Training", _id: id },
        { type: "Training", _id: "ALL" },
      ],
    }),
    deleteTraining: builder.mutation({
      query: (ids) => ({
        url: `/training/delete-training`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((_id) => ({ type: "Training", _id })),
    }),
  }),
});

export const {
  useGetTrainingByIdQuery,
  useLazyGetTrainingByIdQuery,
  useCreateTrainingMutation,
  useUpdateTrainingMutation,
  useDeleteTrainingMutation,
} = trainingApiSlice;
