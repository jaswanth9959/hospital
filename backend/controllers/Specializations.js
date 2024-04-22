import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Specialization from "../models/Specialization.js";
const getSpec = asyncHandler(async (req, res) => {
  const appointments = await Specialization.find({});
  res.status(200).json(appointments);
});

export { getSpec };
