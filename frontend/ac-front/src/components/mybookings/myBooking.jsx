import { useEffect, useState } from "react";
import BookingStatusTracker from "../booking/BookingStatusTraker";
import { getMyBookings } from "../../service/bookingService";


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
      {bookings.length === 0(
        <div className="flex flex-1 items-center justify-center">
          <p className="text-2xl">No bookings found</p>
        </div>
      )}
    </div>
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
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
