# 🧩 Interactive Data Structure Visualizer & Learning Tool

> A full-stack educational web application designed to visually simulate and manipulate dynamic linear data structures in real-time. Built using the MERN stack and strictly typed with TypeScript.

[🚀 Live Demo](https://structures-frontend.onrender.com) | [📄 Case Study (PDF)](https://juliancabrera1989.github.io/static-portfolio/projects.html/Structures.PDF)

---

## 🚀 Key Features

* **Dynamic Geometric Rendering:** Translates complex abstract coding logic into smooth, real-time geometric visual renders directly manipulating the DOM.
* **Full-Stack State Persistence:** Users can save, modify, and log their custom data structure states and learning progress via a dedicated backend REST API.
* **Strict Type Safety:** Completely refactored architecture ensuring robust memory simulation, preventing runtime errors during pointer mutations.

---

## 🧠 Core Engineering & Data Structures

This application visualizes the behavior of dynamic memory allocation and pointer manipulation across linear data structures. Every node mutation updates the UI dynamically using raw coordinates and geometric calculations.

### 1. Stack Simulation (LIFO - Last In, First Out)
* Simulates sequential memory allocation where insertion (`push`) and deletion (`pop`) are restricted to a single end (the top pointer).
* Renders continuous visual transformations to demonstrate pointer updates and memory stack tracking.

### 2. Queue Simulation (FIFO - First In, First Out)
* Models a linear structure managing insertions at the back (`enqueue`) and removals at the front (`dequeue`).
* Visualizes the shift of tracking pointers (`front` and `rear`) dynamically across the screen layout.

### 3. Singly Linked List Simulation
* Animates dynamic node instantiation where each object contains a data field and a structural pointer reference (`next`) linking to the adjacent node.
* Detailed visual representation of complex pointer reassignments during sequential insertion, mid-list deletion, and full structural traversal.

---

## 🛠️ Tech Stack & Architectural Design

* **Frontend:** React, TypeScript, Advanced Custom DOM Manipulation, CSS Keyframe Animations.
* **Backend:** Node.js, Express.js (RESTful API Architecture).
* **Database:** MongoDB (Persistent state caching managed via MongoDB Atlas).
* **Development Workflow:** AI-assisted engineering leveraged for structural optimization, test-driven validation, and Vanilla JS to TypeScript architectural migration.

---

## 📊 Project Structure & Data Flow

### Project Directory Structure
```text
structures-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/             # SVG icons, animations, and static media
│   ├── components/         # Reusable UI elements (Navbar, Controls, Visualizers)
│   ├── dataStructures/     # Core algorithms (Stack, Queue, LinkedList models)
│   ├── services/           # API client methods for Node.js/MongoDB interaction
│   ├── types/              # TypeScript interfaces and global type definitions
│   ├── App.tsx             # Main application orchestrator & routing
│   └── index.tsx           # React DOM entry point
├── .env.example
├── package.json
└── tsconfig.json
```

### Data Flow Architecture
1. **User Interaction & State Dispatch:** The user selects a data structure and triggers an action (e.g., `push`, `pop`, `enqueue`, `insertAt`).
2. **Local Algorithmic Execution:** The TypeScript engines inside `/dataStructures` calculate the mutation, updating pointer locations and DOM coordinate maps in real time.
3. **Visual Engine Render:** React components re-render the dynamic geometric nodes using CSS keyframe animations based on the updated coordinates.
4. **Backend State Persistence:** An asynchronous HTTP request is sent via `/services` to the Node.js/Express API to log or store the user's progress and custom structural state in MongoDB Atlas.

## ⚙️ Local Setup
This repository contains the client-side code. To run the full-stack application locally, you need to spin up both the Frontend and the Backend servers simultaneously in separate terminal windows.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* A MongoDB Atlas connection URI (or local MongoDB instance)

### Step-by-Step Installation
#### 1. Backend Setup
```bash
# Clone the backend repository
git clone https://github.com/juliancabrera1989/structures-backend.git
cd structures-backend

# Install dependencies
npm install

# Create a .env file in the root directory and add:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string

# Start the development server
npm run dev
```
#### 2. Frontend Setup (This Repository)

```bash
# In a NEW terminal window, clone the frontend repository
git clone https://github.com/juliancabrera1989/structures-frontend.git
cd structures-frontend

# Install dependencies
npm install

# Create a .env file in the root directory and add:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React development server
npm start
```
Once both servers are running, open `http://localhost:3000` in your browser to interact with the application.