import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

function calculateMedian(numbers) {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function SmartInsight() {
  const { files, columns } = useAuth();

  const numericColumns = useMemo(() => {
    if (!columns || columns.length === 0 || files.length === 0) return [];
    return columns.filter((col) =>
      files.some((row) => !isNaN(parseFloat(row[col])))
    );
  }, [columns, files]);

  const insights = useMemo(() => {
    if (!files || files.length === 0) return [];
    return numericColumns.map((col) => {
      const values = files
        .map((row) => parseFloat(row[col]))
        .filter((v) => !isNaN(v));

      const missingCount = files.length - values.length;
      if (values.length === 0) {
        return {
          column: col,
          insight: "No numeric data available",
        };
      }

      const sum = values.reduce((acc, v) => acc + v, 0);
      const mean = sum / values.length;
      const median = calculateMedian(values);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const variance =
        values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;
      const stdDev = Math.sqrt(variance);
      const outlier = max > mean + 2 * stdDev;

      return {
        column: col,
        insight: (
          <>
            <p>
              <strong>{col}</strong>: Mean = {mean.toFixed(2)}, Median ={" "}
              {median.toFixed(2)}, Min = {min}, Max = {max}
              {missingCount > 0 && <>, Missing values = {missingCount}</>}
            </p>
            {outlier && (
              <p style={{ color: "red" }}>
                Notice: Max value is significantly higher than average
                (possible outlier).
              </p>
            )}
          </>
        ),
      };
    });
  }, [files, numericColumns]);

  if (!files || files.length === 0) {
    return (
      <div className="p-4 my-4 bg-white rounded-lg shadow-md text-center text-gray-600">
        No data loaded to generate insights.
      </div>
    );
  }

  return (
    <div className="p-6 my-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-green-800">
        Smart Insights
      </h3>
      {insights.length === 0 && (
        <p className="text-gray-600">
          No numeric columns available for analysis.
        </p>
      )}
      <div className="space-y-4 max-h-96 overflow-auto">
        {insights.map((ins, idx) => (
          <div
            key={idx}
            className="border border-green-200 rounded-md p-3 bg-green-50"
          >
            {ins.insight}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartInsight;
