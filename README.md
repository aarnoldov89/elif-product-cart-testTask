## Elif Food Delivery App - Vite + Express.js

## General deployed link to application, deployed on Vercel
## Left console.logs, that DB connection could be checked by reviewers
## *
## Gained level: Middle Level
## *
https://elif-product-cart-test-task.vercel.app/

## DB check
## *
https://elif-product-cart-test-task.vercel.app/api/health
https://elif-product-cart-test-task.vercel.app/api/products
https://elif-product-cart-test-task.vercel.app/api/orders

A full-stack food delivery application built with **Vite**, **React**, **TypeScript**, **Express.js**, and **MongoDB** with localStorage fallbacks.

## 🚀 Architecture

**Frontend (Vite + React):**
- Vite development server on `http://localhost:5173`
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation

**Backend (Express.js API):**
- Express server on `http://localhost:5000`
- MongoDB integration with fallbacks
- RESTful API endpoints
- CORS enabled for development

## 🛠️ Technologies Used

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, React Router
- **Backend**: Express.js, MongoDB, Node.js
- **Database**: MongoDB Atlas (with localStorage fallback)
- **Development**: Nodemon for backend hot reload

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (optional, app works with fallbacks)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aarnoldov89/elif-product-cart-testTask.git
   cd elif-product-cart-testTask
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   **Frontend (.env.local):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **Backend (backend/.env):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elif_food_delivery
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run server
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:5173](http://localhost:5173)

## 🔧 API Endpoints

- `GET /api/health` - Server health check
- `GET /api/products` - Get all products (MongoDB → fallback to mock)
- `GET /api/shops` - Get all shops (MongoDB → fallback to mock)
- `POST /api/orders` - Create new order (MongoDB → fallback to localStorage)
- `GET /api/orders` - Get all orders (MongoDB only)

## 🎯 Fallback Strategy

The app gracefully handles API/backend failures:

1. **Products**: API → mock-data.json
2. **Orders**: API → localStorage → console output
3. **Development**: Clear error messages and fallback indicators

## 🚦 Development Commands

```bash
# Frontend development
npm run dev             # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Backend development  
npm run server          # Start Express server

# Full development (run in separate terminals)
npm run dev
npm run server
```

---

**Repository**: https://github.com/aarnoldov89/elif-product-cart-testTask

## Available Scripts

- `npm start` - Start the development server (production ready)
- `npm run dev` - Start the development server (alias for start)
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar with cart counter
│   ├── ProductCard.tsx  # Individual product display
│   └── ShopsSidebar.tsx # Shop selection sidebar
├── context/             # React Context for state management
│   └── CartContext.tsx  # Shopping cart state and actions
├── pages/               # Main application pages
│   ├── CartPage.tsx     # Shopping cart page
│   └── ShopsPage.tsx    # Main shops and products page
├── types.ts            # TypeScript type definitions
├── mock-data.json      # Sample data for products and shops
├── main.tsx           # Application entry point
├── App.tsx            # Main application component
└── index.css          # Global styles with Tailwind
```

## How to Use

1. **Browse Shops**: Select a shop from the left sidebar to view their products
2. **View Products**: Product cards display with image, description, price, and action buttons
3. **Add to Cart**: Click "Add to Cart" on any product to add it to your shopping cart
4. **Manage Cart**: Visit the cart page to view items, adjust quantities, or remove items
5. **Checkout**: Use the checkout button to proceed with your order

## Mock Data

The app uses mock data stored in `src/mock-data.json` which includes:
- 5 different shops (Fresh Market, Fruit Paradise, Pizza Palace, Burger House, Drink Station)
- 15 products across categories (vegetables, fruits, pizza, burgers, drinks)
- Each product includes name, description, price, and category information

## Development

The project is set up with:
- Hot module replacement for fast development
- TypeScript strict mode for better code quality
- ESLint configuration for consistent code style
- Tailwind CSS for rapid UI development

## Future Enhancements

- Replace mock data with real database integration
- Add product images (currently using emoji placeholders)
- Add order history and tracking
- Integrate payment processing
- Add search and filtering capabilities

## License

This project is designed for learning and demonstration purposes.