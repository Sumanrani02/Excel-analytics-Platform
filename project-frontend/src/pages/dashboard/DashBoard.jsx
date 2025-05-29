import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import SideBar from "../../components/SideBar";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const {
    summary,
    recentUploads,
    chartData,
    user,
    setUser,
    loading,
    fetchDashboardData,
  } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Chart configuration
  const doughnutChartData = chartData
    ? {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      }
    : null;

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="p-6 flex-1 bg-green-50 h-screen">
        <div className="flex justify-between items-center rounded-2xl bg-white shadow p-4 mb-5">
          <h1 className="text-2xl text-green-800 font-semibold">
            Welcome {user.name}!
          </h1>

          <NavLink
            to="/login"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("user"); // Clear user details
              setUser("");
            }}
            className="rounded-lg bg-green-100 text-green-600 py-2 px-4 font-medium hover:bg-green-200 focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
          >
            Log Out
          </NavLink>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-screen bg-green-100">
            <p className="text-center text-gray-500 text-2xl">
              Loading Dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold text-blue-600">
                  {summary.totalFiles}
                </p>
                <p className="text-sm text-gray-600">Total Files Uploaded</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold text-green-600">
                  {summary.successfulUploads}
                </p>
                <p className="text-sm text-gray-600">Successful Uploads</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold text-red-600">
                  {summary.failedUploads}
                </p>
                <p className="text-sm text-gray-600">Failed Uploads</p>
              </div>
            </div>

            {/* Recent Uploads Table */}
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Recent Uploads
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-green-300 text-teal-800 px-4 py-2">
                    File Name
                  </th>
                  <th className="border border-green-300 text-teal-800 px-4 py-2">
                    Date
                  </th>
                  <th className="border border-green-300 text-teal-800 px-4 py-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((upload, index) => (
                  <tr key={index} className="text-green-900">
                    <td className="border border-gray-300 px-4 py-2">
                      {upload.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {upload.date}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${
                        upload.status === "uploaded"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {upload.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Charts */}
            <div className="mt-6 w-1/2 mx-auto">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Upload Status
              </h2>
              {doughnutChartData ? (
                <Doughnut data={doughnutChartData} />
              ) : (
                <p>No chart data available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
