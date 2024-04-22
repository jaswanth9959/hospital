import { apiSlice } from "./apiSlice";
import { DOCTOR_URL, SPECIALIZATION_URL } from "../constants";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    staffLogin: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getStaff: builder.query({
      query: () => ({
        url: DOCTOR_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Doctor"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.doctorId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getStaffByID: builder.query({
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${DOCTOR_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["Doctor"],
    }),
    staffprofile: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.doctorId}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getSpecs: builder.query({
      query: () => ({
        url: `${SPECIALIZATION_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useStaffLoginMutation,
  useGetStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
  useStaffprofileMutation,
  useGetSpecsQuery,
} = staffApiSlice;
