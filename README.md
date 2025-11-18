# CRUD-PERN (PostgreSQL • Express • React • Node) 🚀

A clean and minimal PERN-stack CRUD application with authentication and
**react-toastify notifications**.

![Demo GIF](./demo.gif)

------------------------------------------------------------------------

## 📦 Overview

This repository contains: - **backend/** → Express server + PostgreSQL
CRUD APIs\
- **frontend/** → React app with authentication + toast notifications\
- Fully working **CRUD**, **JWT auth**, and **react-toastify alerts** 🎉

------------------------------------------------------------------------

## ⭐ Features

-   🔐 JWT Authentication\
-   🔔 react-toastify Notifications\
-   🔄 CRUD (Create / Read / Update / Delete) operations\
-   📦 Clean folder structure\
-   🧪 Beginner‑friendly and extendable

------------------------------------------------------------------------

## 🛠 Tech Stack

**Frontend:** React, Context API, react-toastify\
**Backend:** Node.js, Express, PostgreSQL\
**Database:** PostgreSQL (local or Neon cloud)

------------------------------------------------------------------------

## 📁 Project Structure

    backend/
      src/
        controllers/
        routes/
        db/
        server.js
      .env
    frontend/
      src/
        components/
        pages/
        context/
        styles/
      .env
    README.md

------------------------------------------------------------------------

## 🔐 Environment Variables

### Backend `.env`

    PORT =
    PGUSER =
    PGPASSWORD =
    PGHOST =
    PGPORT =
    PGDATABASE =
    JWT_SECRET=your_secret_here
    DATABASE_URL=postgres://user:password@localhost:5432/dbname

### Frontend `.env.development`

    REACT_APP_API_URL=http://localhost:5001
    REACT_APP_ENV=development 

### Frontend `.env.production`

    REACT_APP_API_URL=http://localhost:5001
    REACT_APP_ENV=production

------------------------------------------------------------------------

## 💻 Frontend Setup

``` bash
cd frontend
npm install
npm start
npm run build
```

------------------------------------------------------------------------

## ▶ Backend Setup

``` bash
cd server
npm install
npm run dev
```

------------------------------------------------------------------------

## 🗄 Database Commands

``` bash
CREATE DATABASE perntodo;

\c perntodo

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)

ALTER TABLE todo
ADD COLUMN user_id INT REFERENCES users(user_id);

```

------------------------------------------------------------------------

## 🌍 Deployment Notes

-   **Frontend** → Vercel / Netlify\
-   **Backend** → Render / Railway / Fly.io\
-   Set correct environment variables in dashboard\
-   Enable CORS if deploying separately

