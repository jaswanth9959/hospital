import mongoose from "mongoose";

const specializationShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Specialization = mongoose.model("Specialization", specializationShema);

export default Specialization;
