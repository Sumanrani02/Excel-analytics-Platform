# 📊 Excel Analytics Platform

A full-stack MERN-based web platform for uploading and analyzing Excel files (`.xls`, `.xlsx`), visualizing data through interactive 2D/3D charts, and generating downloadable reports. The platform includes user and admin authentication, upload history dashboard, and optional AI-generated insights.

---

## 🚀 Live Demo

COMING SOON

## 🧰 Tech Stack

**Frontend**:
- React.js
- Redux Toolkit
- Chart.js
- Three.js (for 3D charts)
- Tailwind CSS

**Backend**:
- Node.js
- Express.js
- MongoDB
- Multer (file upload)
- SheetJS / xlsx (Excel parsing)
- JWT (Authentication)

- OpenAI API (for AI insights)

---

## 🎯 Key Features

- ✅ User & Admin Authentication (JWT-based)
- ✅ Excel File Upload (.xls, .xlsx)
- ✅ Data Parsing with SheetJS
- ✅ Interactive Chart Rendering (bar, line, pie, scatter, 3D)
- ✅ Dynamic Axis Selection
- ✅ Upload History Dashboard
- ✅ Downloadable Graphs (PNG/PDF)
- ✅ Admin Dashboard for Managing Users/Files
- ✅ AI Summary (Optional OpenAI integration)

---

## 🗂️ Folder Structure

/backend
├── models/
├── routes/
├── middleware/
└── server.js

/frontend
├── src/
├── components/
├── pages/
├── redux/
├── services/
└── App.js


---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/excel-analytics-platform.git
cd excel-analytics-platform

Backend Setup

cd backend
npm install

##Create a .env file:

MONGO_URI=YOUR_DATABASE_URI
JWT_SECRET=YOUR_SECRET_KEY
SENDGRID_API_KEY=sendgrid_email_api key
EMAIL_FROM=your_company_email
CLIENT_URL=your_url
OPENAI_API_KEY=your_api_key

npm run dev

##Frontend Setup
cd frontend
npm install
npm start

📚 References
SheetJS
Chart.js
Three.js
OpenAI API Docs
Chart Studio (Inspiration)

🙌 Acknowledgements
Inspired by real-world analytics dashboards like Power BI and Chart Studio. Built as a 10-week full-stack MERN capstone project.

📬 Contact
Developer: Ayush Mishra
Email: mishraayush986@gmail.com
GitHub: github.com/itzayush7


