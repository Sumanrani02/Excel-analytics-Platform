import React, { useState, useMemo, useRef } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Canvas } from "@react-three/fiber";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (n) => {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = (i * (360 / n)) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

export default function ChartVisualise() {
  const {
    filteredFiles,
    excelData,
    columns,
    error,
    loading,
    fetchAndParseFile,
  } = useAuth();

  const [selectedFileId, setSelectedFileId] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null); // Reference to the chart

  const handleFileChange = async (fileId) => {
    setSelectedFileId(fileId);
    const file = filteredFiles.find((f) => f._id === fileId);
    setSelectedFileName(file ? file.originalname || file.name || "" : "");
    if (fileId) {
      await fetchAndParseFile(fileId, localStorage.getItem("token"));
    }
  };

  const chartData = useMemo(() => {
    if (!xKey || !yKey || excelData.length === 0) return null;

    const labels = excelData.map((item) => item[xKey]);
    const yValues = excelData.map((item) => Number(item[yKey]) || 0);

    if (chartType === "pie") {
      return {
        labels,
        datasets: [
          {
            data: yValues,
            backgroundColor: generateColors(labels.length),
          },
        ],
      };
    }

    return {
      labels,
      datasets: [
        {
          label: yKey,
          data: yValues,
          backgroundColor: "#3B82F6",
        },
      ],
    };
  }, [xKey, yKey, excelData, chartType]);

  const downloadChart = () => {
    if (chartRef.current) {
      const chartImage = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = chartImage;
      link.download = `${selectedFileName || "chart"}.${chartType === "bar" ? "png" : "jpg"}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-green-100">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-8">
          Uploaded Files Chart Viewer
        </h2>

        {filteredFiles.length === 0 ? (
          <p className="text-center text-gray-500 text-2xl">
            No Uploaded files Available!!!
          </p>
        ) : (
          <>
            <label
              htmlFor="file-select"
              className="block mb-2 text-gray-700 font-semibold"
            >
              Select Uploaded Excel File:
            </label>
            <select
              id="file-select"
              className="w-full mb-6 px-3 py-2 border border-green-300 rounded-lg"
              value={selectedFileId}
              onChange={(e) => handleFileChange(e.target.value)}
            >
              <option value="">-- Select a file --</option>
              {filteredFiles.map((file) => (
                <option key={file._id} value={file._id}>
                  {file.originalname || file.name || "Unnamed file"}
                </option>
              ))}
            </select>

            {loading && (
              <p className="text-blue-600 font-semibold mb-4">
                Loading and parsing file data...
              </p>
            )}
            {error && (
              <p className="text-red-600 font-semibold mb-4">{error}</p>
            )}

            {columns.length > 0 && !loading && (
              <>
                <label
                  htmlFor="xkey"
                  className="block mb-2 text-gray-700 font-semibold"
                >
                  Select X-axis:
                </label>
                <select
                  id="xkey"
                  className="w-full mb-6 px-3 py-2 border border-green-300 rounded-lg"
                  value={xKey}
                  onChange={(e) => setXKey(e.target.value)}
                >
                  <option value="">-- Select X-axis --</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="ykey"
                  className="block mb-2 text-gray-700 font-semibold"
                >
                  Select Y-axis:
                </label>
                <select
                  id="ykey"
                  className="w-full mb-6 px-3 py-2 border border-green-300 rounded-lg"
                  value={yKey}
                  onChange={(e) => setYKey(e.target.value)}
                >
                  <option value="">-- Select Y-axis --</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="charttype"
                  className="block mb-2 text-gray-700 font-semibold"
                >
                  Select Chart Type:
                </label>
                <select
                  id="charttype"
                  className="w-full mb-8 px-3 py-2 border border-green-300 rounded-lg"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>

                <button
                  onClick={downloadChart}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download Chart
                </button>

                {chartType === "bar" && chartData && (
                  <Bar ref={chartRef} data={chartData} />
                )}
                {chartType === "pie" && chartData && (
                  <div className="w-[50%] mx-auto">
                    <Pie ref={chartRef} data={chartData} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
