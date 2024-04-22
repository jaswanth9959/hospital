import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DoctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Specialization",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    schedule: [{ slot: String, unavailableDates: { type: [Date] } }],
    role: {
      type: String,
      required: true,
      default: "doctor",
    },
  },
  { timestamps: true }
);

DoctorSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
