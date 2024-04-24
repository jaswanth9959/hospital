import bcrypt from "bcryptjs";

const doctors = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
  {
    firstName: "doctor",
    lastName: "1",
    email: "doctor1@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-24T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      {
        slot: "11:00AM-12:00PM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    firstName: "doctor",
    lastName: "2",
    email: "doctor2@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      { slot: "11:00AM-12:00PM", unavailableDates: [] },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    firstName: "doctor",
    lastName: "3",
    email: "doctor3@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      { slot: "11:00AM-12:00PM", unavailableDates: [] },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    firstName: "doctor",
    lastName: "4",
    email: "doctor4@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      { slot: "11:00AM-12:00PM", unavailableDates: [] },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    firstName: "doctor",
    lastName: "5",
    email: "doctor5@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      { slot: "9:00AM-10:00AM", unavailableDates: [] },
      {
        slot: "10:00AM-11:00AM",
        unavailableDates: ["2024-04-24T16:51:34.631Z"],
      },
      {
        slot: "11:00AM-12:00PM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    firstName: "doctor",
    lastName: "6",
    email: "doctor6@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-20T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      { slot: "11:00AM-12:00PM", unavailableDates: [] },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
];

export default doctors;
