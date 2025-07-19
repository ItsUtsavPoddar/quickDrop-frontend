# 🔐 QuickDrop

**Instant, no-login, room-based messaging — built for privacy, speed, and real-world use.**

QuickDrop is a secure and ephemeral messaging tool that lets users create or join chat rooms using just a 6-character alphanumeric code. No Google login. No email. Just pure, instant communication — anywhere, anytime.

Designed for classrooms, study groups, and impromptu collaboration — QuickDrop supports both persistent and self-destructing rooms, giving users full control over how their conversations live (or disappear).

---

## 🌐 Live Demo

- 🔗 Frontend: [https://chat.utsv.tech](https://chat.utsv.tech)
- ⚙️ Backend API: [https://api-dark.onrender.com/health](https://api-dark.onrender.com/health)

---

## ✨ Features

### 👤 Two Types of Users

- **Authenticated Users**:
  - Can create **public rooms** (persistent chat)
  - Can create **secret rooms** (auto-deleted when users leave)
  - Can join any room using 6-digit alphanumeric code

- **Anonymous Users**:
  - No signup or login required
  - Can only join or create **anonymous rooms**
  - Ideal for quick code sharing, one-time collaboration
 
 ### 💬 Ephemeral & Controlled Messaging

- Create or join rooms without creating an account
- Use a **6-digit code** to share access across devices
- Choose between:
  - **Public rooms** (persistent)
  - **Secret rooms** (messages are auto-deleted when all users leave)

### 🔐 Rooms & Access

- Each room has a **6-digit alphanumeric code**  
- Share across any device without logging in
- Multiple users can join the same room  
- Secret rooms are **ephemeral** and wiped clean once all users leave

### 💡 Why I Built It

As a student, I often needed a quick, private place to share code snippets or notes during college classes — without using social accounts or worrying about chat history. QuickDrop is that utility tool.

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Socket.IO (for real-time communication)

### ⚙️ Backend
- Node.js + Express.js
- Socket.IO (WebSocket server)
- MySQL for persistent storage
- Hosted on [Render](https://render.com/)  
  - Kept alive using GitHub Actions & CronJobs

---

## 🔮 Roadmap / Future Work

- 🧼 Full UI revamp for clarity and mobile support
- 📎 File sharing & multimedia messages
- 🧾 Message deletion/edit history
- 🌐 QR-code room join (share room in 1 scan)
- 🧠 Message auto-expiry for secret rooms

---

## 📷 Screenshots (coming soon...)

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fc9ecae0-9219-42b7-b700-94e51bc04ad4" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/719a60f5-1bcf-49e1-8fa6-8a2a074b36e9" />


---

## 🚀 Local Setup

### 🔹 Frontend

```bash
git clone https://github.com/ItsUtsavPoddar/quickDrop-frontend
cd quickDrop-frontend
npm install
npm run dev
