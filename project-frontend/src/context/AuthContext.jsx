import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CheckCircle, FileText, XCircle } from "lucide-react";

const AuthContext = createContext();

const API_BASE_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [newfiles, setNewfiles] = useState([]);
  const [summary, setSummary] = useState({});
  const [recentUploads, setRecentUploads] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [userName, setUserName] = useState("User");

  // Helper to get auth headers
  const authHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Fetch file history on mount
  const fetchFileHistory = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/files/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
      setFilteredFiles(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFileHistory();
  }, [fetchFileHistory]);

  // Sync newfiles with files state
  useEffect(() => {
    setFiles(newfiles);
  }, [newfiles]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const [summaryRes, recentUploadsRes, chartDataRes] = await Promise.all([
        axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/dashboard/recent-uploads", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/dashboard/chart-data", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSummary(summaryRes.data);
      setRecentUploads(recentUploadsRes.data);
      setChartData(chartDataRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(
      files.filter((file) => file.originalname.toLowerCase().includes(query))
    );
  };

  // Browse handler for new file selection (if needed)
  const handlebrowse = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = selectedFiles.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      status: "pending",
    }));

    setNewfiles((prevNewFiles) => {
      const existingNames = prevNewFiles.map((f) => f.name);
      const filteredNewFiles = updatedFiles.filter(
        (file) => !existingNames.includes(file.name)
      );
      return [...prevNewFiles, ...filteredNewFiles];
    });

    setFiles((prevFiles) => {
      const existingNames = prevFiles.map((f) => f.name);
      const filteredNewFiles = updatedFiles.filter(
        (file) => !existingNames.includes(file.name)
      );
      return [...prevFiles, ...filteredNewFiles];
    });

    setError("");
  };

  // Upload handler
  const handleUpload = async () => {
    setUploading(true);
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "pending") {
        const formData = new FormData();
        formData.append("file", updatedFiles[i].file);

        try {
          const token = localStorage.getItem("token");

          const response = await axios.post(
            "http://localhost:5000/api/files/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          updatedFiles[i].status = "uploaded";
          updatedFiles[i].response = response.data;
        } catch (err) {
          console.error(err);
          updatedFiles[i].status = "error";
          updatedFiles[i].response = null;
          setError("Failed to upload one or more files.");
        }
      }
    }

    setFiles(updatedFiles);
    setUploading(false);
  };

  // View file handler
  const handleView = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/files/view/${id}`, { headers: authHeader() });
      // Open file view in new tab
      const newWindow = window.open();
      newWindow.document.write(res.data);
      newWindow.document.close();
    } catch (error) {
      console.error("Error viewing file:", error);
    }
  };

  // Download file handler
const handleDownload = async (fileId, originalName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/files/download/${fileId}`, {
      responseType: 'blob', // VERY IMPORTANT
    });

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', originalName); // Excel name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Download error:', err);
  }
};



  // Delete file handler
 const handleDelete = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/files/delete/${id}`, {
      headers: authHeader(),
    });
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    setFilteredFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

  // Status icon helper
  const getStatusIcon = (status) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle className="text-green-500" />;
      case "pending":
        return <FileText className="text-yellow-500" />;
      case "error":
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const value = {
    files,
    newfiles,
    setNewfiles,
    filteredFiles,
    uploading,
    loading,
    error,
    summary,
    recentUploads,
    chartData,
    setUserName,
    userName,
    handleSearch,
    handlebrowse,
    handleUpload,
    handleView,
    handleDownload,
    handleDelete,
    getStatusIcon,
    fetchDashboardData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
