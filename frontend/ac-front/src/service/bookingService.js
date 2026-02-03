import axiosClient from "./axiosClient";

export const createBooking = async (bookingData) => {
  const response = await axiosClient.post(
    "/bookings/create-booking",
    bookingData
  );
  return response.data;
};
