import { apiSlice } from "./apiSlice";
import { APPOINTMENT_URL, PAYPAL_URL } from "../constants";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: APPOINTMENT_URL,
        method: "POST",
        body: appointment,
      }),
    }),
    getAppointmentById: builder.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: "PUT",
      }),
      providesTags: ["Appointment"],
    }),
    getClientID: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    payAppointment: builder.mutation({
      query: ({ appointmentId, details }) => ({
        url: `${APPOINTMENT_URL}/${appointmentId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    cancelAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: `${APPOINTMENT_URL}/${appointmentId}/cancel`,
        method: "PUT",
      }),
    }),

    getMyAppointments: builder.query({
      query: (userId) => ({
        url: `${APPOINTMENT_URL}/myappointments/${userId}`,
      }),

      keepUnusedDataFor: 5,
    }),

    getDoctorAppointments: builder.query({
      query: (doctorId) => ({
        url: `${APPOINTMENT_URL}/doctorappointments/${doctorId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAppointments: builder.query({
      query: () => ({
        url: APPOINTMENT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetClientIDQuery,
  useGetAppointmentByIdQuery,
  usePayAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAppointmentsQuery,
  useUpdateStatusMutation,
  useCancelAppointmentMutation,
  useGetDoctorAppointmentsQuery,
} = appointmentApiSlice;
