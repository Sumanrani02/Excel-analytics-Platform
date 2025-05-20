import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CheckCircle, FileText, XCircle } from "lucide-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State variables
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

//  username
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Fetch file history on mount
  useEffect(() => {
    const fetchHistory = async () => {
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
    };

    fetchHistory();
  }, []);

  // Sync `newfiles` with `setFiles`
  useEffect(() => {
    setFiles(newfiles);
  }, [newfiles]);

const fetchDashboardData = useCallback(async () => {
  setLoading(true);
  try {
    const [summaryRes, recentUploadsRes, chartDataRes] = await Promise.all([
      axios.get("http://localhost:5000/api/dashboard/summary"),
      axios.get("http://localhost:5000/api/dashboard/recent-uploads"),
      axios.get("http://localhost:5000/api/dashboard/chart-data"),
    ]);

    setSummary(summaryRes.data);
    setRecentUploads(recentUploadsRes.data);
    setChartData(chartDataRes.data);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    setLoading(false);
  }
}, []); // Empty array ensures fetchDashboardData remains stable.

  // Handle search functionality
    const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(
      files.filter((file) => file.originalname.toLowerCase().includes(query))
    );
  };

  //   handle browse
  const handlebrowse = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = selectedFiles.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      status: "pending",
    }));

    // Update newfiles state
    setNewfiles((prevNewFiles) => {
      const existingNames = prevNewFiles.map((f) => f.name);
      const filteredNewFiles = updatedFiles.filter(
        (file) => !existingNames.includes(file.name)
      );
      return [...prevNewFiles, ...filteredNewFiles];
    });

    // Update files state
    setFiles((prevFiles) => {
      const existingNames = prevFiles.map((f) => f.name);
      const filteredNewFiles = updatedFiles.filter(
        (file) => !existingNames.includes(file.name)
      );
      return [...prevFiles, ...filteredNewFiles];
    });

    setError(""); // Reset error message
  };

  // handle  upload
  const handleUpload = async () => {
    setUploading(true);

    // Create a deep copy to avoid mutating the original state
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "pending") {
        const formData = new FormData();
        formData.append("file", updatedFiles[i].file);

        try {
          const token = localStorage.getItem("token"); // or wherever you store it

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
          updatedFiles[i].response = response.data; // Save response for future use
        } catch (err) {
          console.error(err);
          updatedFiles[i].status = "error";
          updatedFiles[i].response = null; // Add null response to avoid undefined data
          setError("Failed to upload one or more files.");
        }
      }
    }

    setFiles(updatedFiles); // Update files state
    setUploading(false); // End uploading
  };

  const handleView = (fileId) => {
    window.open(`http://localhost:5000/api/files/view/${fileId}`, "_blank");
  };


  // Handle file download
    const handleDownload = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/files/download/${fileId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx"); // Change to dynamic filename if needed
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  // Handle file deletion
  const handleDelete = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/files/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles((prev) => prev.filter((file) => file._id !== fileId));
      setFilteredFiles((prev) => prev.filter((file) => file._id !== fileId));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };


  // Icon based on status
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

  // Context value
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
