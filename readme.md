# 🚀 Project Documentation

## 📌 Overview
This project is a **Node.js + TypeScript** application with Express, MongoDB, and Docker integration.  
It follows a **modular architecture** with controllers, services, data access layers, and middlewares.

## 📂 Project Structure
```
├── .dockerignore
├── .env                # Environment variables
├── .gitignore          # Git ignored files
├── app.ts              # Main application entry point
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Docker build file
├── jest.config.js      # Jest test configuration
├── nginx.conf          # Nginx configuration file
├── package.json        # Node.js dependencies & scripts
├── tsconfig.json       # TypeScript configuration
└── src/                # Source code folder
    ├── config/         # Configuration files (e.g., database, environment settings)
    ├── controllers/    # Handles HTTP requests (API logic)
    ├── dal/           # Data Access Layer (Database interactions)
    ├── errors/        # Custom error handling classes
    ├── middleware/    # Express middlewares (e.g., authentication, logging)
    ├── models/        # Mongoose models (Database schemas)
    ├── routes/        # API route definitions
    ├── services/      # Business logic layer
    ├── utils/         # Utility/helper functions
    ├── validations/   # Request validation schemas
    └── __tests__/     # Unit and integration tests
```

## 🛠 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone <repo_url>
   cd <project_folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file and configure the required variables.

4. **Run the project**
   ```sh
   npm run dev   # Start the server in development mode
   ```

5. **Run with Docker**
   ```sh
   docker-compose up --build
   ```

## 📡 API Endpoints

| Method | Endpoint        | Description                 |
|--------|----------------|-----------------------------|
| POST   | `/auth/login`  | User login                  |
| POST   | `/auth/register` | User registration         |
| POST    | `/users/add/favorite`       | Add Favourite City               |
| GET    | `/users/fav-cities`   | List Favorite Cities By User            |
| GET    | `/weather`   | Get Weather By IP Address      |
| GET    | `/weather/:city`   | Get Weather By city      |

(For a full list of API endpoints, check the `routes/` folder.)

## 📂 Database Models
The project uses **MongoDB** with **Mongoose ORM**. The main models are:
- **User** (`User.model.ts`) - Handles user authentication and profile data.
- **Other models** (Check `models/` folder).

## 🧪 Running Tests
To run tests, use:
```sh
npm test
```

For test coverage:
```sh
npm run test:coverage
```

## 🚀 Deployment
- To deploy using Docker, use:
  ```sh
  docker-compose up --build -d
  ```

- To deploy manually, set up **Node.js, MongoDB**, then run:
  ```sh
  npm install && npm start
  ```
