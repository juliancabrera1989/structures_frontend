# Interactive Data Structure Visualizer & Learning Tool

> A full-stack educational web application designed to visually simulate and manipulate dynamic linear data structures in real-time. Built using the MERN stack and strictly typed with TypeScript.

[🔗 Live Demo Link](https://tusitioweb.com) | [📁 Technical Documentation](link-al-pdf)

---

## 🚀 Key Features

* **Dynamic Geometric Rendering:** Translates complex abstract coding logic into smooth, real-time geometric visual renders directly manipulating the DOM.
* **Full-Stack State Persistence:** Users can save, modify, and log their custom data structure states and learning progress via a dedicated backend.
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
* **Development Workflow:** AI-assisted engineering (ChatGPT/Gemini) leveraged for structural optimization, test-driven validation, and Vanilla JS to TypeScript architectural migration.

---

## 📊 Project Structure & Data Flow

