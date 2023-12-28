# Gocabs - Cab Booking Application

Gocabs is a comprehensive cab booking application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features a user-friendly Material UI interface, secure authentication, admin roles, and optimal routing with the Dijkstra algorithm.

## Deployed Links
   - Server: https://gocabsbackend.onrender.com/
   - Client: https://gocabs-rho.vercel.app/

## Features

- **User Registration and Authentication:**
  - Users can register on the platform securely.
  - JWT (JSON Web Token) and bcryptjs are used for secure authentication.

- **Cab Booking:**
  - Users can book cabs easily through the intuitive interface.
  - Booking confirmation emails are sent using Nodemailer for user convenience.

- **Admin Roles and Management:**
  - Admins have distinct roles with the ability to modify cabs, add new cabs, update paths, and add new routes.

- **Optimal Routing:**
  - Dijkstra algorithm is implemented to calculate and display the optimal route for cab bookings.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daksh-Prajapati-49/GoCabs.git
   cd gocabs

2. Install dependencies for the backend and frontend:
   ```bash
   cd server
   npm install

   cd ../client
   npm install

3. Set up the MongoDB database, Mail Credentials and update the configuration in 
   ```bash
   server/.env
   client/.env

4. Run the application:
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend
   cd ../client
   npm start

5. Open your browser and visit **http://localhost:3000** to access the Gocabs application.



## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)