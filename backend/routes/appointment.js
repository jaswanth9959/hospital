import express from "express";
const router = express.Router();
import { protect } from "../helpers/middlewares/authMiddleware.js";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getDoctorAppointments,
  getMyAppointments,
  updateAppointmentToCancel,
  updateAppointmentToPaid,
  updateStatus,
} from "../controllers/Appointment.js";
router.route("/").post(protect, createAppointment).get(getAllAppointments);
router.route("/:id").get(getAppointmentById).put(updateStatus);
router.route("/:id/pay").put(updateAppointmentToPaid);
router.route("/:id/cancel").put(updateAppointmentToCancel);
router.route("/myappointments/:id").get(getMyAppointments);
router.route("/doctorappointments/:id").get(getDoctorAppointments);

export default router;
