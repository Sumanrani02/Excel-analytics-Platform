import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const SmartInsightsView = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [insight, setInsight] = useState("");
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to see files.");
      return;
    }

    const fetchFiles = async () => {
      setLoadingFiles(true);
      try {
        const res = await axios.get("http://localhost:5000/api/files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data.files || []);
      } catch (err) {
        setError("Unable to load uploaded files.");
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();
  }, [token]);

const generateInsight = async () => {
  if (!selectedFileId) {
    setError("Please select a file.");
    return;
  }
  setError("");
  setInsight("");
  setLoadingInsight(true);

  try {
    const res = await axios.post(
      `http://localhost:5000/api/insights/files/${selectedFileId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setInsight(res.data.insight);
  } catch (error) {
    if (error.response) {
      // Server responded with a status outside 2xx
      setError(`Failed to generate insight. Status: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response
      setError("No response from server.");
    } else {
      // Something else happened
      setError("Error generating insight.");
    }
  } finally {
    setLoadingInsight(false);
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Smart Insights</h2>

      {loadingFiles ? (
        <p>Loading your files...</p>
      ) : (
        <>
          <label htmlFor="file-select" className="block mb-2 font-medium">
            Choose an uploaded file:
          </label>
          <select
            id="file-select"
            value={selectedFileId}
            onChange={(e) => setSelectedFileId(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="">-- Select a file --</option>
            {files.map(({ _id, originalname }) => (
              <option key={_id} value={_id}>
                {originalname}
              </option>
            ))}
          </select>

          <button
            onClick={generateInsight}
            disabled={loadingInsight || !selectedFileId}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700"
          >
            {loadingInsight ? "Generating Insight..." : "Get Insight"}
          </button>

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {insight && (
            <section className="mt-6 p-4 bg-gray-50 rounded border border-gray-300">
              <h3 className="font-semibold mb-2">Insight Summary</h3>
              <p>{insight}</p>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SmartInsightsView;
