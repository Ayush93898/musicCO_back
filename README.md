# 🎵 Music Streaming Backend API

A backend REST API for a music streaming platform with **JWT authentication**, **role-based access control**, and **cloud-based media uploads**.

---

## 🚀 Features
- User registration, login & logout
- JWT-based authentication
- Role-based access (**User / Artist**)
- Artist-only music & album upload APIs
- Cloud media storage using ImageKit
- Public APIs to fetch music & albums

---

## 🛠️ Tech Stack
- Node.js, Express.js  
- MongoDB, Mongoose  
- JWT Authentication  
- ImageKit  
- Postman  

---

## 📦 API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Artist (Protected)
- `POST /api/music/upload`
- `POST /api/album/create`

### Public
- `GET /api/music`
- `GET /api/albums`
- `GET /api/albums/:id`

---

## ▶️ Setup

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
