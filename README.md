# Event Management System

## Overview
This is an event management application built with React and Spring Boot. The application allows users to sign up, log in, and manage events by viewing, creating, editing, and deleting them. It leverages modern libraries and frameworks for efficient development and robust features.

## Features
### Frontend (React)
- **User Authentication**: Sign up and login functionality.
- **Event Management**: 
  - View all events.
  - View details of a single event.
  - Create a new event.
  - Edit an existing event.
  - Delete an event.
- **State Management**: Redux Toolkit for managing application state.
- **Form Handling**: Formik for creating and validating forms.
- **API Integration**: TanStack Query for efficient data fetching and synchronization.
- **Routing**: React Router DOM for client-side routing.

### Backend (Spring Boot)
- **Authentication**: 
  - Form-based login with Spring Security.
  - Secure endpoints for authenticated access.
- **Authentication Endpoints**:
  - `POST /login`: User login.
  - `POST /signup`: User signup.
- **Event Endpoints**:
  - `GET /events/getAll`: Retrieve all events.
  - `GET /events/{eventId}`: Retrieve details of a single event.
  - `PUT /event/{eventId}`: Edit an event.
  - `DELETE /event/{eventId}`: Delete an event.


## Project Structure
### Frontend (React)
```
/src
  /components      # Reusable components
  /pages           # Application pages (e.g., Login, Sign Up, Event List, etc.)
  /store           # Redux store and slices
  /api             # API service functions
  /utils           # Utility functions
```

### Backend (Spring Boot)
```
/src/main/java/com/example/eventmanagement
  /controller      # REST controllers
  /service         # Business logic
  /repository      # Data access layer
  /entites          # Entity classes
  /config          # configurations
```

## Installation and Setup
### Prerequisites
- **Frontend**:
  - Node.js (v16 or above)
  - npm or yarn
- **Backend**:
  - Java 17
  - Maven
  - PostgreSQL Database

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/event_db
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

### Connecting Frontend and Backend
Update the API base URL in the frontend configuration (e.g., `.env` file or constants):
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

## Usage
1. Open the frontend application in your browser (default: `http://localhost:3000`).
2. Sign up for a new account or log in with existing credentials.
3. Use the dashboard to create, view, edit, or delete events.

## API Endpoints
### Authentication
- `POST /signup`: Register a new user.
- `POST /login`: Authenticate an existing user.

### Events
- `GET /events`: Retrieve all events.
- `GET /events/{eventId}`: Get details of a specific event.
- `PUT /event/{eventId}`: Update an event.
- `DELETE /event/{eventId}`: Delete an event.

## Technologies Used
### Frontend
- React
- Redux Toolkit
- Formik
- TanStack Query
- React Router DOM

### Backend
- Spring Boot
- Spring Security
- PostgreSQL
- Spring Data JPA
- SLF4J for logging

## Future Improvements
- Add role-based access control for event management.
- Implement search and filter functionality for events.
- Enhance UI/UX with additional components and animations.

## Contributing
Feel free to fork this repository and submit pull requests for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
