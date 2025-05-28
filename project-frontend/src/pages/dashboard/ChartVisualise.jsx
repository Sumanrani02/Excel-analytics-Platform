import React, { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Canvas } from "@react-three/fiber";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

// 3D Bar Chart Component
function Bar3DChart({ data, xKey, yKey }) {
  const maxHeight =
    Math.max(...data.map((item) => Number(item[yKey]) || 0)) || 1;

  return (
    <Canvas
      style={{ height: 400, borderRadius: 10, background: "#fff" }}
      camera={{ position: [0, 5, 15], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 10, 5]} intensity={1} />
      <group position={[-(data.length - 1) / 2, 0, 0]}>
        {data.map((item, idx) => {
          const height = ((Number(item[yKey]) || 0) / maxHeight) * 5;
          return (
            <mesh key={idx} position={[idx * 1.5, height / 2, 0]}>
              <boxGeometry args={[1, height, 1]} />
              <meshStandardMaterial color="#3B82F6" />
            </mesh>
          );
        })}
      </group>
    </Canvas>
  );
}

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

  const handleFileChange = async (fileId) => {
    setSelectedFileId(fileId);
    const file = filteredFiles.find((f) => f._id === fileId);
    setSelectedFileName(file ? file.originalname || file.name || "" : "");
    if (fileId) {
      await fetchAndParseFile(fileId, localStorage.getItem("token"));
    }
  };

  const generateColors = (n) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
      const hue = (i * (360 / n)) % 360;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
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
                  <option value="3d">3D Bar Chart</option>
                </select>

                {chartType === "bar" && chartData && <Bar data={chartData} />}
                {chartType === "pie" && chartData && (
                  <div className="w-[50%] mx-auto">
                    <Pie data={chartData} />{" "}
                  </div>
                )}
                {chartType === "3d" && xKey && yKey && (
                  <Bar3DChart data={excelData} xKey={xKey} yKey={yKey} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
