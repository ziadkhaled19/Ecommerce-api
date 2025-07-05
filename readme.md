# 🛒 E-Commerce REST API

A robust and scalable e-commerce REST API built with Node.js, Express, and MongoDB. This API provides comprehensive functionality for managing products, users, shopping carts, and orders with integrated payment processing.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (User/Admin)
- Password reset functionality via email
- Secure cookie-based session management
- Password encryption using bcrypt

### 📦 Product Management
- CRUD operations for products
- Image upload and processing with Sharp
- Advanced filtering, sorting, and pagination
- Field limiting and query optimization
- Category and inventory management

### 🛍️ Shopping Cart
- Add/remove products from cart
- Update product quantities
- Clear cart functionality
- User-specific cart management

### 💳 Payment Integration
- Stripe payment processing
- Checkout session creation
- Webhook handling for payment confirmations
- Order creation upon successful payment

### 📧 Email Service
- Password reset emails
- Transactional email support using Nodemailer
- Customizable email templates

### 🔒 Security Features
- Helmet.js for security headers
- Input validation and sanitization
- Error handling middleware
- Rate limiting ready infrastructure

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe API
- **Image Processing**: Sharp
- **Email**: Nodemailer
- **Security**: Helmet, bcrypt
- **File Upload**: Multer
- **Validation**: Validator.js

## 📁 Project Structure

```
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── errorController.js     # Error handling middleware
│   └── factoryHandler.js      # Generic CRUD operations
├── models/
│   ├── userModel.js          # User schema and methods
│   ├── productModel.js       # Product schema
│   ├── cartModel.js          # Shopping cart schema
│   └── orderModel.js         # Order schema
├── routes/
│   ├── userRoutes.js         # User-related endpoints
│   ├── productRoutes.js      # Product management endpoints
│   ├── cartRoutes.js         # Shopping cart endpoints
│   ├── orderRoutes.js        # Order management endpoints
│   └── stripeRoutes.js       # Payment processing endpoints
├── utils/
│   ├── AppError.js           # Custom error class
│   ├── catchAsync.js         # Async error wrapper
│   ├── Email.js              # Email service
│   └── apiFeatures.js        # API query features
├── app.js                    # Express app configuration
└── server.js                 # Server startup and database connection
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=8000
   DATABASE=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   
   # Email Configuration
   HOST=smtp.gmail.com
   EPORT=587
   USERNAME=your-email@gmail.com
   PASSWORD=your-app-password
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-webhook-secret
   ```

4. **Start the application**
   ```bash
   # Development
   npm start
   
   # Production
   npm run start:prod
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/users/signup` - User registration
- `GET /api/v1/users/login` - User login
- `PATCH /api/v1/users/logout` - User logout
- `PATCH /api/v1/users/forgotPassword` - Request password reset
- `PATCH /api/v1/users/resetPassword/:token` - Reset password

### Products
- `GET /api/v1/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product (Admin only)
- `PATCH /api/v1/products/:id` - Update product (Admin only)
- `DELETE /api/v1/products/:id` - Delete product (Admin only)

### Shopping Cart
- `GET /api/v1/carts/myCart` - Get user's cart
- `PATCH /api/v1/carts/addProductToCart` - Add product to cart
- `PATCH /api/v1/carts/removeProductFromCart/:productCartId` - Remove product from cart
- `PUT /api/v1/carts/clearCart` - Clear cart

### Orders
- `GET /api/v1/orders` - Get all orders (Admin only)
- `GET /api/v1/orders/:id` - Get single order
- `PATCH /api/v1/orders/:id` - Update order
- `DELETE /api/v1/orders/:id` - Delete order

### Payment
- `POST /api/v1/stripe/create-checkout-session` - Create Stripe checkout session
- `POST /api/v1/stripe/webhook` - Handle Stripe webhooks

## 🔍 API Features

### Advanced Querying
- **Filtering**: `?price[gte]=100&category=electronics`
- **Sorting**: `?sort=price,-createdAt`
- **Field Limiting**: `?fields=name,price,description`
- **Pagination**: `?page=2&limit=10`

### Example Requests

**Get products with filtering:**
```bash
GET /api/v1/products?price[gte]=50&price[lte]=200&sort=price&fields=name,price,image
```

**Add product to cart:**
```bash
PATCH /api/v1/carts/addProductToCart
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "productId": "64f8d4b2c1234567890abcde",
  "quantity": 2
}
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

Or the API will automatically read from the `jwt` cookie if present.

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token expiration
- HTTP security headers via Helmet
- Input validation and sanitization
- Error handling without information leakage
- Role-based access control

## 🚀 Deployment

The application is configured for both development and production environments:

- Development: Detailed error messages and logging
- Production: Secure error handling and optimized performance

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact

For questions or support, please contact [ziadkhaledwahba219@gmail.com]

---

Built with ❤️ using Node.js and Express