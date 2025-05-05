#  SmartLockApp

SmartLockApp is a mobile application built with **React Native** to control a smart door lock system using **MQTT messaging** and a **Flask-based API backend**. It supports secure **user authentication**, **device locking/unlocking**, **reassignment of lock ownership**, and **real-time issue tracking** using an ESP32 device.

---

##  Features

- **Lock/Unlock Control** — Users can lock or unlock their smart door remotely.
- **Sign Up / Login** — Secure user registration and JWT-based authentication.
- **Role-Based Access** — Only **admin users** can reassign devices.
- **Reassign Lock Ownership** — Admins can transfer lock ownership to a new registered user.
- **Activity Logs** — Tracks door activity (lock/unlock) with error awareness (e.g. offline device).
- **Offline Detection** — Displays alerts when the ESP32 device is not reachable.
- **ESP32 Integration** — Sends MQTT commands to ESP32 to control the hardware lock.

---

##  Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Frontend      | React Native + Expo               |
| State/Storage | AsyncStorage, Context API         |
| Backend API   | Flask, Flask-JWT-Extended, Flask-MQTT |
| Database      | MongoDB Atlas (Cloud)             |
| Hardware      | ESP32 (MQTT Client)               |
| MQTT Broker   | HiveMQ Cloud / test.mosquitto.org |

---

##  Folder Structure (Simplified)

SmartLockApp/
├── components/
│ ├── HomeScreen.js
│ ├── LoginScreen.js
│ ├── SignUpScreen.js
│ ├── ReassignLockScreen.js
│ ├── StatusScreen.js
│ └── LogsContext.js
├── navigation/
│ ├── AppNavigator.js
│ └── TabNavigator.js
├── .gitignore
├── App.js
├── package.json
└── README.md

---

##  API Endpoints (Backend)

| Method | Endpoint                             | Description                        |
|--------|--------------------------------------|------------------------------------|
| POST   | `/api/signup`                        | Register a new user                |
| POST   | `/api/login`                         | Login with email/password, returns JWT |
| POST   | `/api/lock?device_id=device-1`       | Send command to lock the device    |
| POST   | `/api/unlock?device_id=device-1`     | Send command to unlock the device  |
| PUT    | `/locks/:device_id/reassign?new_owner=<username>` | Reassign lock to new owner (admin only) |
| GET    | `/logs/:device_id`                   | Get activity logs (if implemented) |

---

##  Setup Instructions

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- MongoDB Atlas database set up
- ESP32 device (optional for real hardware test)

### Running the Mobile App

```bash
git clone https://github.com/Nasifa97/SmartLockApp.git
cd SmartLockApp
npm install
npx expo start

### Admin Reassignment Flow

Only users with "is_admin": true in the MongoDB users collection can perform reassignment.

The new user must already exist in the database by signing up through the app.

Once the lock is reassigned, the admin loses access, and the new user becomes the owner.

The app shows proper access control and will prevent reassignment attempts from non-admins.

### Security Highlights

JWT tokens are securely stored using AsyncStorage.

Backend validates all lock/unlock requests using token and ownership check.

Admin-only routes (e.g., reassignment) are protected.
