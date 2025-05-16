import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Trash, CheckCircle, XCircle } from "lucide-react";

const History = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch file history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/history");
        setFiles(response.data);
        setFilteredFiles(response.data);
      } catch (error) {
        console.error("Error fetching file history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(
      files.filter((file) =>
        file.name.toLowerCase().includes(query)
      )
    );
  };

  // Handle Filter by Status
  const handleFilterStatus = (status) => {
    setStatusFilter(status);
    setFilteredFiles(
      status
        ? files.filter((file) => file.status === status)
        : files
    );
  };

  // Status Icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle className="text-green-500" />;
      case "failed":
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-4">File History</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search files..."
            className="px-4 py-2 border border-green-300 rounded-md w-full md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => handleFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Status</option>
            <option value="uploaded">Uploaded</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* File Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading file history...</p>
        ) : filteredFiles.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">File Name</th>
                <th className="border border-gray-300 px-4 py-2">Size</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Uploaded At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="text-gray-700">
                  <td className="border border-gray-300 px-4 py-2">{file.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{file.size}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {getStatusIcon(file.status)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(file.uploadedAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <button className="text-green-500 hover:text-green-700">
                      <Eye />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <Download />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No files found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
