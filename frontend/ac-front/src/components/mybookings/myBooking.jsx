import { useEffect, useState } from "react";
import BookingStatusTracker from "../booking/BookingStatusTraker";
import { cancelBooking, getMyBookings } from "../../service/bookingService";
import { toast } from "react-toastify"


function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings()
      .then((data) => {
        setBookings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) {
    return <div className="flex flex-col h-full">
      <div className="flex flex-1 items-center justify-center">
        <p className="text-2xl">No bookings found</p>
      </div>
    </div>
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);

      setBookings(prev =>
        prev.map(b =>
          b.bookingId === bookingId
            ? { ...b, status: "CANCELLED" }
            : b
        )
      );

      toast.success("Service cancelled successfully");

    } catch (error) {
      console.error(error);
      toast.error("Error cancelling booking");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking.bookingId}
          className="mb-4 p-4 border rounded-lg"
        >
          <p><b>AC Type:</b> {booking.acType}</p>
          <p><b>Service:</b> {booking.cleaningType}</p>
          <p><b>Date:</b> {booking.date}</p>
          <p><b>Time:</b> {booking.time}</p>
          <BookingStatusTracker booking={booking} />
          {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleCancel(booking.bookingId)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
