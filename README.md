# TrailMate

TrailMate is a comprehensive hiking platform that leverages user-contributed data, third-party APIs, and machine learning to offer personalized trail recommendations, safety alerts, and real-time updates about trail conditions. The platform includes social features to enhance the hiking experience, creating a community-driven environment for hikers worldwide.

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Machine Learning Service Setup](#machine-learning-service-setup)
- [Usage](#usage)
- [APIs and Integrations](#apis-and-integrations)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Personalized Trail Recommendations**: Machine learning-powered suggestions based on user preferences and hiking history.
- **Real-Time Trail Conditions**: User-submitted reports and third-party data provide up-to-date trail conditions.
- **Social Features**: Follow other hikers, join groups, share photos and stories.
- **Advanced Search and Filters**: Find trails by location, difficulty, duration, and specific attributes like "kid-friendly" or "wheelchair accessible."
- **User Dashboard**: View personalized recommendations, past hikes, and contributions.
- **Gamification**: Earn badges and climb leaderboards to enhance engagement.

---

## Architecture Overview

- **Frontend**: React.js application for the user interface.
- **Backend**: Node.js/Express.js server providing RESTful APIs.
- **Database**: MongoDB for storing user profiles, trail data, and user-generated content.
- **Machine Learning**: Recommendation engine using collaborative filtering.
- **Third-Party APIs**: Integration with weather and trail data APIs.
- **Deployment**: Containerized using Docker, scalable via cloud services like AWS.

![Architecture Diagram](architecture_diagram.png) <!-- Include an actual architecture diagram if available -->

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **NPM** or **Yarn**
- **Python** (3.6 or higher) for the machine learning service
- **MongoDB** database instance
- **Docker** and **Docker Compose** (optional, for containerization)
- **API Keys** for third-party services:
  - **OpenWeatherMap API Key**
  - **Hiking Project API Key** (or any other trail data API)

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/trailmate.git
   cd trailmate/trailmate-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `trailmate-backend` directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   HIKING_PROJECT_API_KEY=your_hiking_project_api_key
   ```

4. **Run the backend server**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd ../trailmate-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `trailmate-frontend` directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the frontend application**

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

### Machine Learning Service Setup

1. **Navigate to the ML service directory**

   ```bash
   cd ../trailmate-ml
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Unix/Linux
   venv\Scripts\activate     # For Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the ML service**

   ```bash
   python app.py
   ```

   The ML service should now be running on `http://localhost:5001`.

---

## Usage

- **Access the app**: Open your browser and navigate to `http://localhost:3000`.
- **Register**: Create a new account by clicking on the "Register" button.
- **Explore Trails**: Use the search and filter options to find trails.
- **View Trail Details**: Click on a trail to view detailed information, including current conditions and weather.
- **Submit Trail Reports**: After hiking, contribute by submitting trail conditions and reviews.
- **Follow Users**: Enhance your experience by following other hikers and joining groups.
- **Earn Badges**: Participate actively to earn badges and appear on leaderboards.

---

## APIs and Integrations

- **Weather Data**: Integrated with OpenWeatherMap API to provide real-time weather conditions.
- **Trail Data**: Uses Hiking Project API to fetch trail information.
- **User Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Real-Time Updates**: Implemented using Socket.IO for live trail condition reporting.

---



### Deployment to AWS

- **Frontend**: Deploy to AWS Amplify or host on S3 with CloudFront.
- **Backend**: Use AWS Elastic Beanstalk or ECS for container orchestration.
- **Database**: Use AWS DocumentDB or MongoDB Atlas.
- **Machine Learning Service**: Deploy using AWS ECS or SageMaker.

*(Detailed deployment instructions are available in the [Deployment Guide](deployment_guide.md).)*

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.

2. **Create a new branch** for your feature or bug fix.

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Commit your changes**.

   ```bash
   git commit -m "Description of my feature"
   ```

4. **Push to your branch**.

   ```bash
   git push origin feature/my-feature
   ```

5. **Submit a pull request**.

Please ensure your code follows the project's coding standards and includes appropriate tests.



## Contact

For questions or support, please contact:

- **Email**: yzjandali@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/trailmate/issues)

---

*Happy Hiking with TrailMate!* 🌲🏞️👣

---

**Note**: This project is under active development. Features and instructions may change over time.
