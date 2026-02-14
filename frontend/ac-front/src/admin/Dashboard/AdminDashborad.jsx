import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://localhost:1200";

  // 🔐 Protect Admin Route
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ROLE_ADMIN") {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  // 📦 Fetch All Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API_URL}/bookings/all-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🔄 Update Booking Status
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log(bookings)
      await fetch(
        `${API_URL}/bookings/admin/${bookingId}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      setBookings(prevBookings =>
        prevBookings.map(booking => {
          if (booking.bookingId === bookingId) {
            return { ...booking, status: newStatus };
          }
          return booking;
        })
      );

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  // 🔄 WebSocket for New Bookings
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:1200/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Admin WebSocket connected");

        stompClient.subscribe("/topic/admin/bookings", (message) => {
          const newBooking = JSON.parse(message.body);

          setBookings((prev) => [newBooking, ...prev]);
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // 📊 Stats
  const total = bookings.length;
  const booked = bookings.filter(b => b.status === "BOOKED").length;
  const assigned = bookings.filter(b => b.status === "ASSIGNED").length;
  const onTheWay = bookings.filter(b => b.status === "ON_THE_WAY").length;
  const completed = bookings.filter(b => b.status === "COMPLETED").length;
  const cancelled = bookings.filter(b => b.status === "CANCELLED").length;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Booked</h2>
          <p className="text-2xl font-bold">{booked}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Assigned</h2>
          <p className="text-2xl font-bold">{assigned}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">On The Way</h2>
          <p className="text-2xl font-bold">{onTheWay}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-2xl font-bold">{completed}</p>
        </div>
      </div>

      {/* Booking Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">AC Type</th>
                  <th className="text-left p-2">Cleaning Type</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId} className="border-b hover:bg-gray-50">
                    <td className="p-2">{booking.fullName}</td>
                    <td className="p-2">{booking.acType}</td>
                    <td className="p-2">{booking.cleaningType}</td>
                    <td className="p-2">{booking.date}</td>
                    <td className="p-2">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking.bookingId, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="BOOKED">BOOKED</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="ON_THE_WAY">ON_THE_WAY</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
