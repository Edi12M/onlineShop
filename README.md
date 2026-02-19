# MyShop — E-Commerce Platform

A full-stack e-commerce web application built with **React** and **ASP.NET Core**, featuring role-based access control with separate Admin and User dashboards.

---

## Features

### User Features

- Browse products with category filtering and search
- View detailed product pages with stock availability
- Add to cart with quantity selection
- Shopping cart with order summary
- Responsive design for all devices

### Admin Features

- Dashboard with inventory statistics (total products, stock, value, categories)
- Add, edit, and delete products with image upload
- Search products by name, ID, or category
- Role-protected routes — only admins can manage products

### Authentication & Security

- JWT-based authentication with token expiry
- Role-based route protection (Admin / User)
- Duplicate username and email detection on signup
- Admin accounts are created via server seed only — signup always assigns the User role

---

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React 19, Vite 7, React Router DOM 7, Axios |
| Styling  | Bootstrap 5.3, Bootstrap Icons, Custom CSS  |
| Backend  | ASP.NET Core 9 (.NET 9), C#                 |
| Database | SQL Server (LocalDB), Entity Framework Core |
| Auth     | JWT Bearer Tokens                           |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- SQL Server LocalDB (included with Visual Studio)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/onlineShop.git
cd onlineShop
```

### 2. Set up the backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

The API will start at **http://localhost:5145**.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start at **http://localhost:5173** (default Vite port).

---

## Admin Login

An admin account is seeded automatically on first run:

| Field    | Value     |
| -------- | --------- |
| Username | `manager` |
| Password | `12`      |

> Admin accounts cannot be created through the signup page. Only the seeded admin has access to the Admin Panel.

---

## Project Structure

```
onlineShop/
├── backend/
│   ├── controllers/        # API endpoints (Auth, Products)
│   ├── data/               # Entity Framework DbContext
│   ├── Migrations/         # EF Core migrations
│   ├── Models/             # User and Product models
│   ├── wwwroot/uploads/    # Uploaded product images
│   ├── Program.cs          # App entry point, middleware, seed
│   └── appsettings.json    # Configuration (DB, JWT)
│
├── frontend/
│   └── src/
│       ├── adminDashboardComponents/   # Admin panel pages
│       ├── userDashboardComponents/    # User shop pages
│       ├── logInComponents/            # Login & signup UI
│       ├── components/                 # Shared components (Footer, Toast, Spinner, ProtectedRoute)
│       ├── context/                    # AuthContext, CartContext
│       ├── config.js                   # API base URL
│       ├── App.jsx                     # Route definitions
│       └── App.css                     # All custom styles
│
└── onlineShop.sln          # Solution file
```

---

## API Endpoints

| Method | Endpoint               | Auth   | Description           |
| ------ | ---------------------- | ------ | --------------------- |
| POST   | `/api/auth/login`      | Public | Login and receive JWT |
| POST   | `/api/auth/signup`     | Public | Create a new user     |
| GET    | `/api/products`        | Public | List all products     |
| GET    | `/api/products/{id}`   | Public | Get a single product  |
| POST   | `/api/products/upload` | Admin  | Upload a new product  |
| PUT    | `/api/products/{id}`   | Admin  | Update a product      |
| DELETE | `/api/products/{id}`   | Admin  | Delete a product      |

---

## Configuration

### Backend — `appsettings.json`

- **ConnectionStrings:DefaultConnection** — SQL Server connection string
- **Jwt:Key** — Secret key for signing tokens
- **Jwt:Issuer** / **Jwt:Audience** — Token validation parameters

### Frontend — `src/config.js`

- **API_BASE_URL** — Backend API address (default: `http://localhost:5145`)

---

## License

This project is for educational purposes.
