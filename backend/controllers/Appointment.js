import User from "../models/User.js";
import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Payment from "../models/payment.js";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jayreddy9959@gmail.com",
    pass: "gpkfltmnmynfbtnr",
  },
});

const createAppointment = asyncHandler(async (req, res) => {
  const { appointmentItems, slot_id, Price, taxPrice, totalPrice, date } =
    req.body;

  if (appointmentItems && appointmentItems.length === 0) {
    res.status(400);
    throw new Error("no Appointment");
  }

  const appointment = new Appointment({
    details: {
      doctorName: appointmentItems.doctorName,
      appointmentDate: appointmentItems.date,
      appointmentTime: appointmentItems.slot,
    },
    date,
    slot_id,
    user: req.user._id,
    doctor: appointmentItems.doctor,
    Price,
    taxPrice,
    totalPrice,
  });

  const createdappointment = await appointment.save();
  res.status(201).json(createdappointment);
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user doctor"
  );
  if (appointment) {
    res.status(200).json(appointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.Status = "Completed";
    const updatedappointment = await appointment.save();

    res.json(updatedappointment);
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const updateAppointmentToPaid = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user doctor"
  );

  const user = await User.findById(appointment.user._id);
  const { id, status, update_time, email_address } = req.body;

  const payment = new Payment({ id, status, update_time, email_address });
  const createdPayment = await payment.save();

  if (appointment) {
    await Doctor.updateOne(
      { "schedule._id": appointment.slot_id },
      { $push: { "schedule.$.unavailableDates": appointment.date } }
    );
    appointment.isPaid = true;
    appointment.paymentID = createdPayment._id;
    appointment.paidAt = Date.now();
    appointment.Status = "Paid";

    const item = {
      slot: appointment.details.appointmentTime,
      date: appointment.date,
    };
    user.appointments.push(item);
    const updateduser = await user.save();
    const updatedappointment = await appointment.save();

    var mailOptions = {
      from: "jayreddy9959@gmail.com",
      to: appointment.user.email,
      subject: "Appointment Conformation Mail",
      text: `Your appointment is confirmed with Dr.${appointment.doctor.firstName} on ${appointment.details.appointmentDate} from ${appointment.details.appointmentTime}.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });

    res.json({ updateduser, updatedappointment });
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const updateAppointmentToCancel = asyncHandler(async (req, res) => {
  console.log("cancel");
  const appointment = await Appointment.findById(req.params.id).populate(
    "user doctor"
  );

  if (appointment) {
    await Doctor.updateOne(
      { "schedule._id": appointment.slot_id },
      { $pull: { "schedule.$.unavailableDates": appointment.date } }
    );
    appointment.Status = "Canceled";
    const updatedappointment = await appointment.save();
    var mailOptions = {
      from: "jayreddy9959@gmail.com",
      to: appointment.user.email,
      subject: "Appointment Cancelation Mail",
      text: `Your appointment with Dr.${appointment.doctor.firstName} on ${appointment.details.appointmentDate} from ${appointment.details.appointmentTime} is canceled.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });

    res.json(updatedappointment);
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.params.id }).populate(
    "doctor"
  );
  res.status(200).json(appointments);
});

const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.params.id,
  }).populate("user");
  res.status(200).json(appointments);
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate("user doctor");
  res.status(200).json(appointments);
});

export {
  createAppointment,
  getAppointmentById,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentToPaid,
  updateStatus,
  updateAppointmentToCancel,
  getDoctorAppointments,
};
