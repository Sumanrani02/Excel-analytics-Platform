import React from 'react'

const Visualize = () => {
  return (
    <div>
      visualization
    </div>
  )
}

export default Visualize





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
