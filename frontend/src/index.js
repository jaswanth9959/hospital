import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import App from "./App";
import Home from "./layouts/Home";
import SignIn from "./layouts/Signin";
import Register from "./layouts/Register";
import Doctors from "./layouts/Doctors";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import DoctorLogin from "./layouts/DoctorLogin";
import DoctorInfo from "./layouts/DoctorInfo";
import Confirm from "./layouts/Confirm";
import Details from "./layouts/Details";
import Appointment from "./layouts/Appointment";
import MyAppointments from "./layouts/MyAppointment";
import Appointments from "./layouts/admin/Appointments";
import DoctorAppointments from "./layouts/admin/DoctorAppointments";
import PatientHistory from "./layouts/PatientHistory";
import MyFeedBacks from "./layouts/MyFeedBacks";
import DoctorsList from "./layouts/admin/Doctors";
import EditDoctor from "./layouts/admin/EditDoctor";
import AddDoctor from "./layouts/admin/AddDoctor";
import EditProfile from "./layouts/admin/EditProfile";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctor" element={<DoctorLogin />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorInfo />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/details" element={<Details />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/patienthistory/:id" element={<MyFeedBacks />} />
        <Route path="/patienthistory/:id/:appid" element={<PatientHistory />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/doctors" element={<DoctorsList />} />
        <Route path="/admin/doctor/:id" element={<EditDoctor />} />
        <Route path="/doctorprofile" element={<EditProfile />} />
        <Route
          path="/admin/doctorappointments"
          element={<DoctorAppointments />}
        />
        <Route path="/admin/doctor/add" element={<AddDoctor />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
