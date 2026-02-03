import { useEffect } from "react";

const AdminDashboard = () => {

  useEffect(() => {
    // fetch admin-only data here if needed
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Bookings</h2>
          <p className="text-2xl font-bold">45</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">₹32,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
