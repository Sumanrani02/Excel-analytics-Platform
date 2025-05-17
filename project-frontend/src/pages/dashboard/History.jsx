import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Trash, CheckCircle } from "lucide-react";

const History = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming JWT
        const res = await axios.get("http://localhost:5000/api/files/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(res.data);
        setFilteredFiles(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(
      files.filter((file) =>
        file.originalname.toLowerCase().includes(query)
      )
    );
  };

  const getStatusIcon = () => <CheckCircle className="text-green-500" />;

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
          <p className="text-center text-gray-500">Loading file history...</p>
        ) : filteredFiles.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">File Name</th>
                <th className="border border-gray-300 px-4 py-2">Rows</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Uploaded At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file._id} className="text-gray-700">
                  <td className="border border-gray-300 px-4 py-2">
                    {file.originalname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {file.data.length}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {getStatusIcon()}
                  </td>
                   <td className="border border-gray-300 px-4 py-2">
                    {new Date(file.createdAt).toLocaleString()}
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
