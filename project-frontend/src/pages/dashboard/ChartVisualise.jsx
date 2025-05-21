import React, { useState, useEffect } from "react";
import { read, utils } from "xlsx";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import Bar3DChart from "./Bar3dChart";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ChartVisualise = () => {
  const { files } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Files from context:", files);
    if (files && files.length > 0) {
      const excelFile = files.find(
        (f) => f.filename?.endsWith(".xlsx") || f.filename?.endsWith(".xls")
      );
      console.log("Excel file found:", excelFile);
      if (excelFile && excelFile.data) {
        const uint8Array = new Uint8Array(excelFile.data);
        const workbook = read(uint8Array, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet);
        console.log("Parsed JSON data:", jsonData);
        setData(jsonData);
      }
    }
  }, [files]);

  const prepareChartData = () => {
    console.log("Data state in prepareChartData:", data);
    if (!data.length) return null;56

    const labels = data.map((item) => item[Object.keys(item)[0]]);
    const values = data.map((item) => parseInt(item[Object.keys(item)[1]], 10));
    console.log("Labels:", labels);
    console.log("Values:", values);

    return {
      labels,
      datasets: [
        {
          label: "Data",
          data: values,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Excel to Chart Converter</h2>
      {chartData && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Pie Chart</h3>
            <Pie data={chartData} />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Bar Chart</h3>
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">3D Chart</h3>
            <Bar3DChart data={chartData} />
          </div>
        </>
      )}
      {!chartData && (
        <p>
          No data available. Please upload an Excel file through the system
          context.
        </p>
      )}
    </div>
  );
};

export default ChartVisualise;

// import { Doughnut, Line, Pie } from "react-chartjs-2";
// import { useAuth } from "../../context/AuthContext"; // import your context hook
// import { useEffect } from "react";

// const ChartVisualise = () => {
//   const { chartData, loading, fetchDashboardData } = useAuth();

//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   // Wait for chartData from context
//   if (loading || !chartData) {
//     return (
//         <div className="flex items-center justify-center h-screen bg-green-100">
//       <p className="text-center text-gray-500 text-2xl">Loading visualizations...</p>
//       </div>
//     );
//   }

//   // Assuming your chartData looks like this (adjust according to your actual data structure):
//   // chartData = {
//   //   uploadStatus: { labels: [...], data: [...] },
//   //   uploadTrends: { labels: [...], data: [...] },
//   //   fileSizes: { labels: [...], data: [...] }
//   // };

//   // Prepare data for each chart:
//   const uploadStatusData = {
//     labels: chartData.uploadStatus.labels,
//     datasets: [
//       {
//         data: chartData.uploadStatus.data,
//         backgroundColor: ["#4caf50", "#f44336"],
//         hoverBackgroundColor: ["#66bb6a", "#e57373"],
//       },
//     ],
//   };

//   const uploadTrendsData = {
//     labels: chartData.uploadTrends.labels,
//     datasets: [
//       {
//         label: "Uploads",
//         data: chartData.uploadTrends.data,
//         borderColor: "#2196f3",
//         backgroundColor: "rgba(33, 150, 243, 0.1)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const fileSizeData = {
//     labels: chartData.fileSizes.labels,
//     datasets: [
//       {
//         data: chartData.fileSizes.data,
//         backgroundColor: ["#ff9800", "#4caf50", "#2196f3"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
//         Data Visualizations
//       </h1>

//       {/* Doughnut Chart - Upload Status */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Uploaded vs Failed Files
//         </h2>
//         <Doughnut data={uploadStatusData} />
//       </div>

//       {/* Line Chart - Upload Trends */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Upload Trends
//         </h2>
//         <Line data={uploadTrendsData} />
//       </div>

//       {/* Pie Chart - File Size Distribution */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           File Size Distribution
//         </h2>
//         <Pie data={fileSizeData} />
//       </div>
//     </div>
//   );
// };

// export default ChartVisualise;

// import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js";
// import * as THREE from "three";

// const ChartVisualise = () => {
//   const lineChartRef = useRef(null);
//   const barChartRef = useRef(null);
//   const pieChartRef = useRef(null);
//   const threeJsRef = useRef(null);

//   // Function to initialize charts with cleanup
//   const initializeChart = (chartRef, config) => {
//     let chartInstance;
//     if (chartRef.current) {
//       chartInstance = new Chart(chartRef.current, config);
//     }
//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   };

//   // Line Chart
//   useEffect(() => {
//     return initializeChart(lineChartRef, {
//       type: "line",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//         datasets: [
//           {
//             label: "Sales",
//             data: [400, 300, 200, 278, 189],
//             borderColor: "#4CAF50",
//             backgroundColor: "rgba(76, 175, 80, 0.3)",
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { position: "top" },
//           title: { display: true, text: "Monthly Sales Data" },
//         },
//       },
//     });
//   }, []);

//   // Bar Chart
//   useEffect(() => {
//     return initializeChart(barChartRef, {
//       type: "bar",
//       data: {
//         labels: ["Group A", "Group B", "Group C", "Group D"],
//         datasets: [
//           {
//             label: "Values",
//             data: [300, 600, 400, 200],
//             backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { position: "top" },
//           title: { display: true, text: "Group Comparison" },
//         },
//       },
//     });
//   }, []);

//   // Pie Chart
//   useEffect(() => {
//     return initializeChart(pieChartRef, {
//       type: "pie",
//       data: {
//         labels: ["Group A", "Group B", "Group C", "Group D"],
//         datasets: [
//           {
//             data: [400, 300, 300, 200],
//             backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { position: "top" },
//           title: { display: true, text: "Group Distribution" },
//         },
//       },
//     });
//   }, []);

//   // 3D Visualization using Three.js
//   useEffect(() => {
//     if (threeJsRef.current) {
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//       const renderer = new THREE.WebGLRenderer();
//       renderer.setSize(300, 300);
//       threeJsRef.current.appendChild(renderer.domElement);

//       const geometry = new THREE.BoxGeometry();
//       const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//       const cube = new THREE.Mesh(geometry, material);
//       scene.add(cube);

//       camera.position.z = 5;

//       const animate = () => {
//         requestAnimationFrame(animate);
//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.01;
//         renderer.render(scene, camera);
//       };

//       animate();

//       return () => {
//         threeJsRef.current.removeChild(renderer.domElement);
//       };
//     }
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Visualizations</h1>

//       {/* Line Chart */}
//       <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
//         <canvas ref={lineChartRef}></canvas>
//       </div>

//       {/* Bar Chart */}
//       <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
//         <canvas ref={barChartRef}></canvas>
//       </div>

//       {/* Pie Chart */}
//       <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
//         <canvas ref={pieChartRef}></canvas>
//       </div>

//       {/* Three.js 3D Chart */}
//       <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">3D Visualization</h2>
//         <div ref={threeJsRef} className="flex justify-center"></div>
//       </div>
//     </div>
//   );
// };

// export default ChartVisualise;
