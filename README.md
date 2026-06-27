# 📋 JobTracker

A full-stack job application tracking platform built for both **Job Seekers** and **Recruiters**. Track every application, interview, and offer in one clean, professional dashboard.

![JobTracker](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Express](https://img.shields.io/badge/Express-4.x-lightgrey) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 🚀 Features

- 🔐 **Authentication** — Register & Login with JWT
- 👤 **Dual Role** — Job Seeker & Recruiter dashboards
- 📝 **Job Management** — Add, Edit, Delete applications
- 🏷️ **Status Tracking** — Applied → Interview → Offer → Rejected
- 📎 **Resume & Notes** — Attach resume link and notes per job
- 📊 **Dashboard** — Pie chart + Bar chart with live stats
- 🔍 **Filter** — Filter jobs by status instantly
- 📱 **Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | React Framework (App Router) |
| Tailwind CSS | Styling |
| Recharts | Dashboard Charts |
| Axios | API Calls |
| Context API | Auth State Management |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | REST API |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |

---

## 📁 Project Structure
job-tracker/

├── backend/

│   ├── models/

│   │   ├── User.js          # User schema

│   │   └── Job.js           # Job schema

│   ├── routes/

│   │   ├── auth.js          # Register & Login

│   │   └── jobs.js          # CRUD operations

│   ├── middleware/

│   │   └── auth.js          # JWT middleware

│   ├── .env                 # Environment variables

│   └── server.js            # Entry point

│

└── frontend/

├── app/

│   ├── layout.jsx        # Root layout

│   ├── page.jsx          # Landing page

│   ├── login/            # Login page

│   ├── register/         # Register page

│   ├── dashboard/        # Dashboard with charts

│   └── jobs/             # Jobs list, add, edit

├── components/

│   └── Navbar.jsx        # Navigation

├── context/

│   └── AuthContext.jsx   # Auth state

├── lib/

│   └── api.js            # Axios instance

└── .env.local            # Frontend env vars

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/job-tracker.git
cd job-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser
http://localhost:3000

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get token |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| POST | `/api/jobs` | Add new job |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |

---

## 🌐 Deployment

- **Frontend** → Vercel
- **Backend** → Railway
- **Database** → MongoDB Atlas

---

## 👨‍💻 Author

**Abu Bakar**
- GitHub: [@YOUR_USERNAME](https://github.com/Abubakar-webmaker)
- Location: Karachi, Pakistan

---

## 📄 License

MIT License — feel free to use this project for your portfolio!
