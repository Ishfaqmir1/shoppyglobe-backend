# ShoppyGlobe Backend

##  Project Overview
ShoppyGlobe is a backend e-commerce API built with Node.js, Express, and MongoDB.  
It supports product management, shopping cart operations, and user authentication.

## Features
- User Registration & Login (JWT Authentication)  
- Products API (List, View details)  
- Cart API (Add, Update, Remove items)  
- MongoDB Integration with Mongoose  
- Error handling & validation  
- Tested using ThunderClient

##  Project Structure
- models/ → MongoDB models (User, Product, Cart)  
- routes/ → Express routes for products, cart, and auth  
- middleware/ → JWT authentication middleware  
- server.js → Entry point of the app  

##  API Endpoints
- GET /products → Fetch all products  
- GET /products/:id → Fetch product by ID  
- POST /cart → Add item to cart (Protected)  
- PUT /cart/:id → Update cart item (Protected)  
- DELETE /cart/:id → Remove item from cart (Protected)  
- POST /register → Register user  
- POST /login → Login user and get JWT token  

## Tech Stack
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- ThunderClient for testing  

## Submission
- Include ThunderClient API test screenshots  
- Include MongoDB Compass screenshots (Products & Cart collections)  

# github link
https://github.com/Ishfaqmir1/shoppyglobe-backend.git

## Setup
1. Clone repo  
   ```bash
   git clone https://github.com/Ishfaqmir1/shoppyglobe-backend.gitbackend-shoppy.git
   cd backend-shoppy

   install dependencies

npm install
# author 
ishfaq ahmad mir