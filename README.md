# Round-Robin Coupon Distribution with Admin Panel

## Project Overview
This project implements a web application for distributing coupons in a round-robin manner to guest users. It includes an admin panel for managing coupons and preventing abuse.

## Features
### Backend:
- **Database**: Uses MongoDB locally via Mongo Compass.
- **Coupon Management**:
  - Coupons can be generated and stored in the database.
  - Users can claim coupons without requiring an account.
- **Abuse Prevention**:
  - IP Tracking: Prevents multiple claims from the same IP within a cooldown period.
  - Cookie-Based Tracking: Restricts multiple claims from the same browser session.
- **Admin Functionality**:
  - Admin registration and login implemented.
  - Admin can toggle the availability status of coupons.
  - Coupons can be listed and updated.
- **Testing**: Verified backend functionality using Postman.

### Frontend:
- **User Panel**:
  - Users can view available coupons.
  - History of claimed coupons is visible.
  - Login and claim functionality work correctly.
- **Admin Panel**:
  - Admin can log in and view all coupons.
  - Admin can see user claim history.
  - Admin functionalities (like toggling coupon status) are implemented.
- **Issue**: The frontend does not display coupons from the database; instead, it shows hardcoded values.

## Known Issues
- **Backend Dependency on Mongo Compass**:
  - Since MongoDB is running locally, stopping Mongo Compass results in server errors.
- **Frontend-Backend Integration Issue**:
  - Backend is working independently, and coupons are stored in the database.
  - Frontend does not correctly fetch coupons from the backend and still displays hardcoded values.
  - Admin and user panels work separately but fail to sync live data.

## Setup Instructions
### Backend:
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the backend: `npm run server`
4. Ensure Mongo Compass is running before starting the server.

### Frontend:
1. Navigate to the frontend folder.
2. Install dependencies: `npm install`
3. Start the frontend: `npm start`
4. Ensure the backend is running before testing functionality.

## Next Steps
- Fix the frontend to fetch live coupons from the backend.
- Deploy both backend and frontend on a live server.
- Ensure smooth frontend-backend integration.

---
This project is currently under development

