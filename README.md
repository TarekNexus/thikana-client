# 🏢 Thikana - Smart Building Management System

**Thikana** is a smart building management web app that allows users, members, and admins to manage apartments, rent, payments, coupons, and announcements through role-based dashboards.

---

## 🔗 Live Links

🌐 **Live Site:** https://thikana.netlify.app  
💻 **Backend Repo:** https://github.com/TarekNexus/thikana-server


> ⚠️ Replace the above links with your actual URLs.

---

## ✨ Features

### 👥 Role-Based Dashboards
- **User:**
  - View apartment listings
  - Filter apartments by rent range
  - Send agreement requests
- **Member:**
  - View assigned apartment info
  - Make monthly payments via Stripe
  - Apply discount coupons
  - View announcements
- **Admin:**
  - Approve/reject agreement requests
  - Manage apartment listings
  - Manage coupons
  - Post announcements
  - Track payments and stats

### 🏠 Apartment Management
- Paginated apartment listing
- Search by rent range
- Agreement request system

### 💳 Payment Integration
- Stripe Checkout
- Coupon application support
- Secure & fast payment system

### 🏷 Coupon Management
- Add, update, delete coupons (admin only)
- Real-time UI feedback via SweetAlert & Toast

### 📢 Announcement System
- Admin can publish building-wide announcements
- Members and users can view in real time

---

## 🛠 Tech Stack

| Frontend            | Backend              | Others                    |
|---------------------|----------------------|----------------------------|
| React + Vite        | Node.js + Express    | Firebase Auth (JWT)        |
| TailwindCSS + DaisyUI | MongoDB + Mongoose  | Stripe.js Integration      |
| React Router DOM    | Firebase Admin SDK   | React Query, Axios         |
| Swiper.js (Slider)  |                      | SweetAlert2, React-Toastify|

---
## 📦 NPM Packages Used

### Dependencies

- `@stripe/react-stripe-js` — React Stripe.js bindings for payment integration  
- `@stripe/stripe-js` — Stripe.js library  
- `@tailwindcss/vite` — Tailwind CSS plugin for Vite  
- `@tanstack/react-query` — Data fetching and caching library for React  
- `axios` — Promise based HTTP client  
- `daisyui` — Tailwind CSS component library  
- `firebase` — Firebase SDK for authentication and other services  
- `framer-motion` — Animation library for React  
- `leaflet` — Interactive maps library  
- `lucide-react` — Icon library for React  
- `react` — React core library  
- `react-dom` — React DOM rendering  
- `react-hook-form` — React forms library  
- `react-hot-toast` — Toast notifications for React  
- `react-icons` — Icon library for React  
- `react-leaflet` — React components for Leaflet maps  
- `react-router` — Routing library for React  
- `react-router-dom` — DOM bindings for React Router  
- `react-toastify` — Toast notifications for React  
- `react-tooltip` — Tooltips for React  
- `stripe` — Stripe API client  
- `sweetalert2` — Beautiful alerts for JavaScript  
- `swiper` — Modern mobile touch slider  
- `tailwindcss` — Utility-first CSS framework  


---

*This list reflects the packages used in the frontend client of Thikana.*


## ⚙️ Installation & Setup

### 1️⃣ Clone the repositories

```bash
git clone https://github.com/TarekNexus/thikana-client
git clone https://github.com/TarekNexus/thikana-server


- **Install dependencies:**
  - npm install
 
- **Create .env.local file in the root of thikana-client with your Firebase and Stripe keys:**
  - VITE_FIREBASE_API_KEY=
  - VITE_FIREBASE_AUTH_DOMAIN=
  - VITE_FIREBASE_PROJECT_ID=
  - VITE_FIREBASE_STORAGE_BUCKET=
  - VITE_FIREBASE_MESSAGING_SENDER_ID=
  - VITE_FIREBASE_APP_ID=
  - VITE_payment_key=
 - **Start the frontend dev server:**
  - npm run dev

- **Create .env file in the root of thikana-server with your environment variables:**
  - DB_PASS=
  - DB_USER=
  - PAYMENT_GATEWAY_KEY=
  - FB_SERVICE_KEY=

- **Start the backend server:**
  - nodemon index.js start
 
