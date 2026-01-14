# Project KALINGA ASCEND
**Official Mission Dashboard & Technical Dossier**

## Mission Overview
Project KALINGA is a specialized Martian micro-UAV initiative designed for the **ISRO Robotics Challenge - URSC 2026**. This website serves as the central command dashboard, technical specification document, and mission timeline tracker.

**Mission Parameters:**
*   **Target Environment**: Martian Atmosphere (Legacy Code: Jezero Crater)
*   **Flight Mass Limit**: < 2000g (Current MTOW: 1655g)
*   **Propulsion**: 4x T-Motor 4006 / CubeOrange+ Flight Controller
*   **Autonomy**: Jetson Orin Nano + OAK-D Lite (GPS-Denied V-SLAM)

## Tech Stack
*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS (Glassmorphism + "Matte Obsidian" Theme)
*   **Animations**: Framer Motion
*   **3D Visualization**: React Three Fiber (`@react-three/drei`)
*   **Charts**: Chart.js (`react-chartjs-2`)

## Features
*   **Mission Governance Dashboard**: Real-time budget tracking and risk matrix.
*   **Interactive 3D Hangar**: View UAV and Base Station models.
*   **Team Dossier**: Interactive profiles of the 10-member mission crew.
*   **Novelty Matrix**: "Mars Laboratory" showcase of biomimetic prowess.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

3.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## Deployment
This project is optimized for deployment on **Vercel**.
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Deploy.

---
**Authorized by Mission Control • KIIT University**
