import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../../context/AuthContext";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Visualize = () => {
  const { files, loading } = useAuth();
  console.log("Received files in Visualize:", files);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (files.length === 0) {
    return <p>No data available for visualization.</p>;
  }

  // Prepare data for the chart
  const data = {
    labels: files.map((file) => file.originalname || "Unknown File"),
    datasets: [
      {
        label: "Number of Rows",
        data: files.map((file) => (file.data ? file.data.length : 0)), // Safely check for data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "File Names",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Rows",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-green-600 mb-4">
        File Data Visualization
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Visualize;

// import { useEffect, useState } from "react";
// import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement } from "chart.js";
// import axios from "axios";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement);

// const Visualize = () => {
//   const [uploadStatusData, setUploadStatusData] = useState(null);
//   const [uploadTrendsData, setUploadTrendsData] = useState(null);
//   const [fileSizeData, setFileSizeData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVisualizationData = async () => {
//       try {
//         const [statusRes, trendsRes, sizeRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/visualization/upload-status"),
//           axios.get("http://localhost:5000/api/visualization/upload-trends"),
//           axios.get("http://localhost:5000/api/visualization/file-sizes"),
//         ]);

//         setUploadStatusData({
//           labels: statusRes.data.labels,
//           datasets: [
//             {
//               data: statusRes.data.data,
//               backgroundColor: ["#4caf50", "#f44336"],
//               hoverBackgroundColor: ["#66bb6a", "#e57373"],
//             },
//           ],
//         });

//         setUploadTrendsData({
//           labels: trendsRes.data.labels,
//           datasets: [
//             {
//               label: "Uploads",
//               data: trendsRes.data.data,
//               borderColor: "#2196f3",
//               backgroundColor: "rgba(33, 150, 243, 0.1)",
//               borderWidth: 2,
//             },
//           ],
//         });

//         setFileSizeData({
//           labels: sizeRes.data.labels,
//           datasets: [
//             {
//               data: sizeRes.data.data,
//               backgroundColor: ["#ff9800", "#4caf50", "#2196f3"],
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching visualization data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVisualizationData();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading visualizations...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Data Visualizations</h1>

//       {/* Doughnut Chart - Upload Status */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Uploaded vs Failed Files</h2>
//         <Doughnut data={uploadStatusData} />
//       </div>

//       {/* Line Chart - Upload Trends */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Upload Trends</h2>
//         <Line data={uploadTrendsData} />
//       </div>

//       {/* Pie Chart - File Size Distribution */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">File Size Distribution</h2>
//         <Pie data={fileSizeData} />
//       </div>
//     </div>
//   );
// };

// export default Visualize;
