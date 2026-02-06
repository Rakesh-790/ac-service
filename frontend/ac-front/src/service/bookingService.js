import axiosClient from "./axiosClient";

export const createBooking = async (bookingData) => {
  const response = await axiosClient.post(
    "/bookings/create-booking",
    bookingData
  );
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosClient.get("/bookings/my-bookings");
  return response.data;
};
