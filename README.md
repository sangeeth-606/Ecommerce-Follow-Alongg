# Project Title: 
E-Commerce Application 

## Project Overview
This project is a comprehensive e-commerce platform designed to provide a fully functional online shopping experience. It includes features like user authentication, product management, and order handling. The purpose is to build a robust and scalable application that demonstrates full-stack development skills using the MERN stack.

## Key Features
- *REST API Creation* for user authentication, product management, and order handling.
- *Secure login and registration functionality* using JWT and password hashing.
- *Structured MongoDB schemas* for users, products, and orders.
- *Robust server-side logic* with Node.js and Express.
- *Interactive and responsive user interface* built with React.

## Tech Stack
- *Frontend*: React.js
- *Backend*: Node.js with Express
- *Database*: MongoDB (using Mongoose for schema design)
- *Deployment*: GitHub Pages (frontend) and Render/Heroku (backend)
- *Additional Tools*: Postman for API testing, JWT for authentication, and bcrypt for password hashing.

## Why This Project
I chose this project because it provides an opportunity to practice and demonstrate a wide range of development skills, including frontend and backend development, database schema design, and secure authentication. Building an e-commerce platform is both challenging and rewarding, as it allows me to explore real-world scenarios and enhance my ability to create scalable web applications.

##  Milestone 2:
Implemented a user login page with username and password fields. Styled using Tailwind CSS for a clean, responsive design. Validates input and handles user authentication upon form submission.


## Milestone 3: Server Setup
Set up the server with express for HTTP requests and mongoose for MongoDB. Configured routing and database connections, providing endpoints for user authentication and other functionalities.

## Milestone 4: User Model, Controller, and File Upload

In this milestone, we added user management and file upload functionality:

### Key Points:
1. **User Model**: Created a `User` model for storing user data (name, email, password) in the database.
2. **User Controller**: Built a controller for handling user-related requests (adding and retrieving users).
3. **File Upload**: Integrated **Multer** to handle file uploads, allowing users to upload images to the `uploads/` directory.
4. **Server Updates**: Enhanced `server.js` to support user routes and file upload functionality.
5. **Testing**: Verified file upload using **Postman**, with successful uploads stored in the `uploads/` folder.


# Milestone 5: Building the Sign-Up Page 🌟

## Overview
In this milestone, we focused on creating the **Sign-Up Page** for our application, implementing **form validation**, and adding **routing/navigation** to ensure a smooth and user-friendly registration experience. This milestone is a crucial step in building a functional frontend for user onboarding and improving app navigation.

---

## Goals Achieved 🎯
1. **Sign-Up Page Development**:
   - Designed and developed a clean and responsive UI with input fields for:
     - **Name**
     - **Email**
     - **Password**

2. **Form Validation**:
   - Implemented validation logic to ensure:
     - All fields are filled.
     - The email format is valid.
     - The password meets the minimum length of 6 characters.
   - Displayed error messages for invalid inputs to guide the user.

3. **UI Design Improvements**:
   - Created a visually appealing design with proper colors, spacing, and typography.
   - Added user-friendly elements like clear error messages and styled buttons.

4. **Routing and Navigation**:
   - Added a **Landing Page** with two buttons:
     - **SignUp** button that navigates users to the Sign-Up Page.
     - **Login** button to navigate users to the Login Page.
   - Implemented routing using `useNavigate` from `react-router-dom` to handle page navigation and improve the user experience.

