import { useEffect, useState } from "react";
import { connectBookingSocket, disconnectBookingSocket } from "../../socket/bookingSocket";


function BookingStatusTracker({ booking }) {
  const [status, setStatus] = useState(booking.status);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connectBookingSocket(booking.bookingId, (data) => {
      setStatus(data.status);
      setMessage(data.message);
    });

    return () => {
      disconnectBookingSocket();
    };
  }, [booking.bookingId]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="font-semibold text-lg">AC Service Status</h3>

      <p className="mt-2">
        Current Status:
        <span className="ml-2 font-bold text-blue-600">
          {status}
        </span>
      </p>

      {message && (
        <p className="mt-1 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}

export default BookingStatusTracker;
