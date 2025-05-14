// client/src/pages/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-green-700">EXCEL ANALYTICS</h1>
        </div>
        <div className="flex gap-4">
          <a href="/login" className="text-sm font-medium">Log in</a>
          <a
            href="/register"
            className="bg-green-700 text-white px-4 py-1 rounded-full hover:bg-green-800 text-sm"
          >
            Register
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-10">
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Analyze your Excel data</h2>
          <p className="text-gray-700 mb-6">
            Upload your Excel file and get smart insights with ease.
          </p>
        </div>

        {/* Visuals */}
        <div className="relative w-full max-w-md">
          <img
            src="/excel-screen.png"
            alt="Excel screen"
            className="w-full border-2 rounded-lg"
          />
        </div>
      </main>

      {/* Feature Card */}
      <section className="flex justify-center my-6">
        <div className="bg-green-100 rounded-lg p-6 text-center max-w-sm">
          <div className="text-green-700 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4 4h16v16H4V4z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Smart Insights</h3>
          <p className="text-sm text-gray-600">
            Gain valuable insights from your Excel data through automated analysis.
          </p>
        </div>
      </section>

    </div>
  );
}