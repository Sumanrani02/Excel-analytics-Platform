import React, { useEffect } from "react";
import { Trash2, User, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function AdminHome() {
  const {
    user,
    fetchAllUsers,
    users,
    loading,
    error,
    handleDeleteUser,
    handleDeleteFilebyAdmin,
  } = useAuth();

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAllUsers(); // Fetch users when the component mounts
    }
  }, [user, fetchAllUsers]);

  const handleRemoveUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await handleDeleteUser(userId);
      toast.success("User  deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteFile = async (userId, fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await handleDeleteFilebyAdmin(userId, fileId);
      toast.success("File deleted successfully");
    } catch (err) {
      toast.error("Failed to delete file");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-green-800">Admin Dashboard</h1>

        {loading && (
          <div className="text-center text-green-600 font-medium">
            Loading...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        )}

        {users.length === 0 && !loading && (
          <div className="text-center text-green-700 font-semibold">
            No users found.
          </div>
        )}

        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-green-200">
            <tr>
              <th className="text-left p-4">User Info</th>
              <th className="text-left p-4">Uploaded Files</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b border-green-300 hover:bg-green-50 transition-colors"
              >
                <td className="p-4 align-top">
                  <div className="flex items-center space-x-3">
                    <User className="text-green-600" />
                    <div>
                      <div className="font-semibold text-green-900">
                        {u.name || "Unnamed User"}
                      </div>
                      <div className="text-sm text-green-700">{u.email}</div>
                      <div className="text-xs text-green-600">
                        Total files: {u.files?.length || 0}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-top">
                  {u.files && u.files.length > 0 ? (
                    <ul className="space-y-2 max-h-40 overflow-auto">
                      {u.files.map((file) => (
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
                            onClick={() => handleDeleteFile(u._id, file._id)}
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            title="Delete file"
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-green-600 italic">
                      No files uploaded
                    </div>
                  )}
                </td>
                <td className="p-4 align-top text-center">
                  <button
                    onClick={() => handleRemoveUser(u._id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    title="Delete user"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
