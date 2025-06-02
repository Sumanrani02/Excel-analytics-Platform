import { useEffect, useState } from "react";
import { Trash2, User, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Pie } from "react-chartjs-2";
import Modal from "react-modal";
import { NavLink } from "react-router-dom";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  content: {
    maxWidth: "600px",
    width: "90%",
    margin: "auto",
    padding: "20px 30px",
    borderRadius: "12px",
    inset: "50% auto auto 50%",
    transform: "translate(-50%, -50%)",
    background: "#f0fdf4",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    maxHeight: "80vh",
    overflowY: "auto",
  },
};

export default function AdminHomePage() {
  const {
    user,
    setUser,
    fetchAllUsers,
    users,
    loading,
    error,
    handleDeleteUser,
    handleDeleteFilebyAdmin,
  } = useAuth();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user?.role === "admin" && user?.token) {
      fetchAllUsers();
    }
  }, [user?.role, user?.token]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleRemoveUser = async (userId) => {
    try {
      await handleDeleteUser(userId);
      console.log("User deleted successfully");
    } catch {
      console.log("failed");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Access denied. Admins only.
      </div>
    );
  }

  const chartData = {
    labels: users?.map((u) => u.name || "Unnamed User") || [],
    datasets: [
      {
        label: "Files Uploaded",
        data: users?.map((u) => u.files?.length || 0) || [],
        backgroundColor: users
          ? users.map((_, index) => `hsl(${(index * 60) % 360}, 70%, 50%)`)
          : [],
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-green-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center rounded-2xl bg-white shadow p-4 mb-5">
          <h1 className="text-2xl text-green-800 font-semibold">
            Welcome Admin !
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
        {loading && (
          <div className="text-center text-green-600 font-medium">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        )}
        {Array.isArray(users) && users.length === 0 && !loading && (
          <div className="text-center text-green-700 font-semibold">
            No users found.
          </div>
        )}

        {/* Container for side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Table takes flex-grow to fill remaining space */}
          <div className="flex-grow overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden border border-green-300">
              <thead className="bg-green-200">
                <tr>
                  <th className="text-left p-5 font-semibold uppercase tracking-wider text-green-900 select-none cursor-default">
                    User Info
                  </th>
                  <th className="p-5 font-semibold uppercase tracking-wider text-green-900 select-none cursor-default text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((u, i) => (
                    <tr
                      key={u._id}
                      className={`border-b border-green-300 transition-colors ${
                        i % 2 === 0 ? "bg-green-50" : "bg-white"
                      } hover:bg-green-100 hover:shadow-md cursor-pointer`}
                    >
                      <td
                        className="p-5 align-top"
                        onClick={() => handleUserClick(u)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleUserClick(u);
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <User className="text-green-600" size={24} />
                          <div>
                            <div className="font-semibold text-green-900 text-lg">
                              {u.name || "Unnamed User"}
                            </div>
                            <div className="text-sm text-green-700">
                              {u.email}
                            </div>
                            <div className="text-xs text-green-600 font-medium mt-1">
                              Total files: {u.files?.length || 0}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 align-top text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveUser(u._id);
                          }}
                          className="text-red-600 hover:text-red-800 focus:outline-none transition-colors"
                          title="Delete user"
                          aria-label={`Delete user ${u.name || "unnamed"}`}
                        >
                          <Trash2 size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pie chart container with fixed width */}
          <div className="bg-white rounded shadow p-4 max-w-sm w-full shrink-0">
            <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">
              User Uploads Pie Chart
            </h2>
            <Pie data={chartData} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedUser}
        onRequestClose={handleCloseModal}
        style={modalStyles}
        contentLabel="File Details Modal"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          Files for {selectedUser?.name || "Unnamed User"}
        </h2>
        {selectedUser?.files && selectedUser.files.length > 0 ? (
          <ul className="space-y-2 max-h-[60vh] overflow-auto">
            {selectedUser.files.map((file) => (
              <li
                key={file._id}
                className="flex items-center justify-between bg-green-100 rounded px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="text-green-700" size={16} />
                  <span
                    className="text-green-800 truncate max-w-xs"
                    title={file.originalname || "Unnamed file"}
                  >
                    {file.originalname || "Unnamed file"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleDeleteFilebyAdmin(selectedUser._id, file._id)
                  }
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  title="Delete file"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-green-600 italic">No files uploaded</div>
        )}
        <button
          onClick={handleCloseModal}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
