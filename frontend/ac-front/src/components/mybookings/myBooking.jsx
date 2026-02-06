import { useEffect, useState } from "react";
import BookingStatusTracker from "../booking/BookingStatusTraker";


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
    return <p>No bookings found</p>;
  }

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

          {/* 🔥 WebSocket status updates */}
          <BookingStatusTracker booking={booking} />
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
