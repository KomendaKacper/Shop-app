# Shop-App

An e-commerce web application designed to provide a seamless shopping experience. The project is divided into two key components: **Backend** and **Frontend**, developed collaboratively to follow industry standards and modern development practices.

- **Backend**: Handled by [KomendaKacper](https://github.com/KomendaKacper)
- **Frontend**: Handled by [Szymi611](https://github.com/Szymi611)

---

## Project Overview

Shop-App is a scalable e-commerce application where users can browse products, view product details, and manage their shopping cart. The app follows a microservices-based backend structure with a robust frontend built on React.

The backend API provides endpoints for product management, authentication, and other functionalities. The frontend consumes these APIs and presents an intuitive UI for users.

---

![image](https://github.com/user-attachments/assets/1c766ef1-3a99-48cd-8477-50e19a953566)

---

![image](https://github.com/user-attachments/assets/ce647d99-3749-40e9-b231-3ec17a4f6792)

---

![image](https://github.com/user-attachments/assets/91dcaaaa-0063-4a16-935e-aa072a477f10)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Backend](#backend)
- [Frontend](#frontend)
- [Key Features](#key-features)
- [Running the Application with Docker](#running-the-application-with-docker)
- [Future Improvements](#future-improvements)
- [Configuration Secrets](#configuration-secrets)

---


## Technologies Used

### Backend:

- **Java 21**: Backend development language, ensuring performance and modern Java features.
- **Spring Boot**: Simplifies REST API creation and microservice architecture.
- **MySQL**: Database used to store product, user, and cart data.
- **Spring Data JPA**: Simplifies database interactions.
- **Spring Security**: Provides authentication and role-based access.
- **Docker**: Containerized backend application for seamless deployment.
- **Maven**: Dependency and build management.
- **OpenAPI/Swagger**: API documentation for easy development and testing.

### Frontend:

- **React**: Component-based UI library for building the user interface.
- **Vite**: Lightweight and fast build tool for modern web applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Enables single-page application (SPA) navigation.
- **Stripe**: Integrated for secure payment processing.

### DevOps and Deployment:

- **Docker Compose**: Runs the backend and MySQL database locally.
- **Kubernetes** (Planned): Orchestration for running microservices efficiently.
- **GitHub**: Version control and collaboration.

---

## Backend

The backend, developed by **KomendaKacper**, focuses on:

1. **Product Management**: CRUD operations for products like clothes, accessories, and other items.
2. **Authentication**:
   - Role-based access control using **Spring Security**.
   - JWT-based authentication for secure user management.
   - **Google Authentication**: Users can authenticate using Google OAuth (Google Client ID and Secret are required).
3. **Database Management**:
   - **MySQL** is used to persist data.
   - **Spring Data JPA** manages data access.
4. **API Documentation**:
   - OpenAPI/Swagger generates comprehensive API documentation for testing.
5. **Microservices Structure**:
   - The backend is split into independent services to ensure scalability and separation of concerns.
6. **Admin Dashboard**: For product and order management.
7. **Payment Integration**: Integrated **Stripe** for secure payments.

---

## Frontend

The frontend, developed by **Szymi611**, is a modern React-based application with a clean and responsive UI.

### Core Features:

- **Product Display**:
  - Displays products fetched from the backend API.
  - Includes sorting, filtering (by name or category), and search functionalities.
- **Shopping Cart**: Users can add, update, and remove items.
- **Routing**: Handled by **React Router** for a seamless SPA experience.
- **Responsive Design**: Styled with **Tailwind CSS** for desktop and mobile compatibility.
- **Error Handling**: Includes an error page for handling invalid or missing content.
- **Stripe Payment Integration**: Secure payment processing integrated with **Stripe**.
- **Admin Dashboard**: Allows admin users to manage products and view orders.

---

## Key Features

1. **User Authentication**: Secure login and role-based access.
2. **Product Catalog**: Dynamic product listing from the backend.
3. **Cart Management**: Add, update, and delete items in a shopping cart.
4. **Modern UI**: Intuitive design for better user experience.
5. **API Documentation**: Easy testing and integration using Swagger.
6. **Containerized Deployment**: Backend and database using Docker Compose.
7. **Microservices Architecture**: Scalable design to handle various services independently.
8. **Payment Integration**: Integrated **Stripe** for secure payments.
9. **Admin Dashboard**: For managing products and orders.
10. **Search and Filtering**: Users can filter products by name or category.
11. **Error Page**: Custom error page for handling unexpected issues or routes.

---

## Running the Application with Docker

To run the entire application locally using Docker:

### Prerequisites:

- Docker & Docker Compose

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/KomendaKacper/Shop-app.git
   cd Shop-app
   ```
2. Run Docker Compose to build and start the backend, MySQL database, and frontend:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at:
   `http://localhost:5173`

---

## Future Improvements

- **Microservices on Kubernetes**: Deploy the backend microservices using Kubernetes for better orchestration.
- **Testing**: Add unit and integration tests for both frontend and backend.

---

## Configuration Secrets

To configure the application and get it running locally, you need to define the following secrets in a `.env` file in the root directory:

```dotenv
STRIPE_KEY_SECRET=your_stripe_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SPRING_MAIL_PASSWORD=your_spring_mail_password_here
```

Make sure you replace `your_stripe_key_here`, `your_google_client_id_here`, `your_google_client_secret_here`, and `your_spring_mail_password_here` with the actual credentials.

---

## Contributors

- **Backend**: [KomendaKacper](https://github.com/KomendaKacper)
- **Frontend**: [Szymi611](https://github.com/Szymi611)

---

## License

This project is licensed under the MIT License.

---

Thank you for visiting the project! 🎉
