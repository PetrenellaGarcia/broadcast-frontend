# Full-Stack Broadcast Management System

A web-based broadcast management platform with a mock backend, built for technical exercise purposes.  
The system allows users to create, send, and manage broadcast messages with real-time updates simulated using a subscription mechanism.

---
### Folder Structure and Organization
To keep the project clean and maintainable, the frontend code was organized as follows: 
- `components/ui`: Holds generic, reusable UI elements (modals, headers, buttons).  
- `components/custom`: Holds feature-specific components, such as modals related to broadcasts.  
- `features/broadcast/services`: Contains the **mock backend logic** simulating the Rails API, allowing frontend testing without a live backend.  
- `pages`: Contains high-level page components representing full views/screens.  
This structure promotes separation of concerns, making it easier to scale, maintain, and eventually replace the mock backend with a real Rails API or add mobile-specific logic.  

---
## **Table of Contents**

- [Overview](#overview)  
- [Architecture](#architecture)  
- [Features](#features)  
- [Technical Stack](#technical-stack)  
- [Setup Instructions](#setup-instructions)  
- [Future Work](#future-work)  

---

## **Overview**

This project simulates a three-part broadcast system:

1. **Backend API** – Planned with Ruby on Rails. Currently mocked for frontend testing.  
2. **Web Frontend** – React app with dashboard, create/send/delete broadcasts, and real-time updates.  
3. **Mobile App** – Planned with Flutter to receive push notifications.

The mock backend allows testing all frontend functionalities before connecting a live Rails API.

---

## **Architecture**

- **Frontend (React)**  
  - Components: LoginPage, SignupPage, DashboardPage, CreateBroadcastModal  
  - Uses React Router v6 for navigation  
  - Dashboard updates in real-time via a mock `subscribe` function simulating WebSocket behavior  

- **Backend (Mock Service)**  
  - `broadcastService.jsx` handles in-memory storage of broadcasts  
  - Methods: `getBroadcasts`, `createBroadcast`, `sendBroadcast`, `deleteBroadcast`  
  - Real-time updates with `subscribe(callback)` for automatic dashboard refresh  

- **Real-Time Updates (Mock WebSocket)**  
```js
export function subscribe(callback) {
  subscribers.push(callback);
  callback([...broadcasts]);
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
}

## Features

- User signup/login (mock)  
- Dashboard with broadcast list, status, and action buttons  
- Create broadcast via modal  
- Send broadcast (updates status)  
- Delete broadcast  
- Real-time dashboard updates with mock subscription  

---

## Technical Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons, react-hot-toast, React Router v6  
- **Backend (Planned):** Ruby on Rails API (currently mocked)  
- **Real-Time Simulation:** Mock WebSocket via `subscribe` function  
- **Notifications:** Toast notifications for user feedback  

## Setup Instructions

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone <repo-url>
cd broadcast-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at [http://localhost:3000]

---

## Using the App

* **Signup/Login:** Create a new user or login (mock authentication)
* **Dashboard:** View broadcasts, their status, and action buttons
* **Create Broadcast:** Open modal and add a new message
* **Send Broadcast:** Click the “Send” button to change status to Sent
* **Delete Broadcast:** Click “Delete” to remove a broadcast
* **Real-Time Updates:** Newly created broadcasts automatically appear in the dashboard via subscription

---

## Notes

* Backend is currently mocked in `broadcastService.jsx`
* Replace mock methods with Rails API endpoints for production
* Toast notifications provide feedback for broadcast actions

---

