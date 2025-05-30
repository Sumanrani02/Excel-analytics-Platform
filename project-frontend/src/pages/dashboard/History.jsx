import { Download, Eye, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Visualize from "./Visualize";
import { useAuth } from "../../context/AuthContext";

const History = () => {
  const {
    filteredFiles,
    searchQuery,
    loading,
    handleSearch,
    handleView,
  handleDeletefile,
    getStatusIcon,
  } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-4">File History</h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search files..."
            className="px-4 py-2 border border-green-300 rounded-md w-full md:w-1/2"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-screen bg-green-100">
            <p className="text-center text-gray-500 text-2xl">
              Loading File History...
            </p>
          </div>
        ) : filteredFiles.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-green-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-green-300 px-4 py-2 text-green-500">
                  File Name
                </th>
                <th className="border border-green-300 px-4 py-2 text-green-500">
                  Rows
                </th>
                <th className="border border-green-300 px-4 py-2 text-green-500">
                  Status
                </th>
                <th className="border border-green-300 px-4 py-2 text-green-500">
                  Uploaded At
                </th>
                <th className="border border-green-300 px-4 py-2 text-green-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file._id} className="text-gray-700">
                  <td className="border border-green-300 px-4 py-2">
                    {file.originalname}
                  </td>
                  <td className="border border-green-300 px-4 py-2">
                    {file.data.length}
                  </td>
                  <td className="border border-green-300 px-4 py-2">
                    {getStatusIcon("uploaded")}
                  </td>
                  <td className="border border-green-300 px-4 py-2">
                    {new Date(file.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-green-300 px-4 py-2 flex justify-center gap-4">
                    <button
                      onClick={() => handleView(file._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye />
                    </button>
                    <button
                      onClick={() => handleDeletefile(file._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-screen bg-green-100">
            <p className="text-center text-gray-500 text-2xl">No Files Found</p>
          </div>
        )}
      </div>
      {!loading && <Visualize files={filteredFiles} loading={loading} />}
    </div>
  );
};

export default History;
