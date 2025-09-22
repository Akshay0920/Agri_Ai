# 🌱 Agri-AI: AI-Powered Crop Recommendation System

<p align="center">
  <img src="https://i.imgur.com/your-demo-gif-url.gif" alt="Agri-AI Demo" width="700"/>
  </p>

A full-stack web application developed for the **Smart India Hackathon 2025** to provide farmers with data-driven, multilingual crop recommendations by analyzing real-time environmental data.

---

## ✨ Key Features

* **🤖 AI-Powered Recommendations:** Utilizes a scikit-learn (RandomForest) model to deliver accurate, real-time crop predictions.
* **📍 Live Geolocation Data:** Fetches live, hyper-local weather conditions using the user's location via the WeatherAPI.com service.
* **🌐 Multilingual Interface:** Full support for English, Hindi, and Telugu to ensure accessibility for farmers across different regions.
* **🔒 Secure Authentication:** A complete user management system powered by Firebase Authentication, including signup, login, and profile management.
* **👤 Functional Profile Page:** Allows users to view their details, update their display name, and securely change their password.
* **📱 Modern & Responsive UI:** A professional, mobile-first interface built with React, featuring a clean design, smooth animations, and glassmorphism effects.

---

## 🛠️ Technology Stack

| Category      | Technology                                                                                                  |
| :------------ | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | `React.js`, `React Router`, `Axios`, `react-i18next`                                                          |
| **Backend** | `Python`, `Flask`                                                                                           |
| **AI/ML** | `scikit-learn`, `pandas`, `joblib`                                                                            |
| **Auth** | `Firebase Authentication`                                                                                   |
| **Database** | `Cloud Firestore` (for user profile data)                                                                   |
| **APIs** | `WeatherAPI.com`, `REST`                                                                                    |
| **Dev Tools** | `Git`, `VS Code`                                                                                            |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed
* Python and pip installed
* A Firebase project created with Authentication and Firestore enabled
* An API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/agri-ai-app.git](https://github.com/your-username/agri-ai-app.git)
    cd agri-ai-app
    ```

2.  **Setup the Backend:**
    ```sh
    cd backend
    # Create and activate a virtual environment
    python -m venv venv
    .\venv\Scripts\activate
    # Install required packages
    pip install -r requirements.txt 
    # (Note: You may need to create a requirements.txt file by running 'pip freeze > requirements.txt')
    ```

3.  **Setup the Frontend:**
    ```sh
    cd ../frontend
    # Install npm packages
    npm install
    ```

4.  **Configure Environment Variables:**
    * In the `frontend` directory, create a file named `.env`.
    * Add your Firebase and WeatherAPI credentials:
        ```
        # Firebase Config
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        
        # WeatherAPI.com Key
        REACT_APP_WEATHERAPI_KEY=your_weatherapi_key
        ```

### Running the Application

1.  **Start the Backend Server:**
    * In your backend terminal (with venv activated):
        ```sh
        python app.py
        ```
    * The server will be running on `http://127.0.0.1:5000`.

2.  **Start the Frontend Server:**
    * In your frontend terminal:
        ```sh
        npm start
        ```
    * Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🔮 Future Scope

* **Live Soil Data:** Integrate a geospatial API like SoilGrids to fetch real-time soil data instead of using representative values.
* **Market Price Integration:** Connect to market APIs (e.g., Agmarknet) to provide profit forecasting alongside crop recommendations.
* **Image-Based Disease Detection:** Implement a feature allowing farmers to upload photos of crops for AI-powered disease diagnosis.
* **Offline Functionality:** Develop a progressive web app (PWA) with offline capabilities for use in low-connectivity areas.

---

## 🤝 Contact

Akshay – [akshaysainam6.com](mailto:akshaysainam6.com)

Project Link: [https://github.com/your-username/agri-ai-app](https://github.com/your-username/agri-ai-app)
