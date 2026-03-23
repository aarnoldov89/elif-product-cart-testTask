# Elif Food Delivery App

A modern food delivery application built with React, TypeScript, Vite, React Router, and Tailwind CSS.

## Features

- **Shop Selection**: Browse different food shops including Fresh Market, Fruit Paradise, Pizza Palace, Burger House, and Drink Station
- **Product Catalog**: View products organized by shop with detailed descriptions and pricing
- **Shopping Cart**: Add items to cart, adjust quantities, and manage your order
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface
- **Type Safety**: Full TypeScript support for enhanced development experience

## Tech Stack

- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## Quick Start

To run the app, simply use:

```bash
npm start
```

This command will start the development server and open the app at [http://localhost:5173](http://localhost:5173).

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