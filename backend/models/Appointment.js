import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    details: {
      doctorName: { type: String, required: true },
      appointmentDate: { type: String, required: true },
      appointmentTime: { type: String, required: true },
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },

    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    slot_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    Status: {
      type: String,
      required: true,
      default: "Pending",
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
