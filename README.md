# Ahmed Shop

A modern e-commerce management system built with React, Vite, and Tailwind CSS. This application provides a comprehensive product management interface with advanced search and filtering capabilities.

## Features

- 🔍 **Advanced Search & Filtering**: Real-time search by product name with category and price range filters
- 🗂️ **Product Categories**: Organized product management with predefined categories
- 📱 **Responsive Design**: Mobile-friendly interface that works on all devices
- 🎨 **Modern UI**: Clean, intuitive design with smooth animations
- 🔐 **User Authentication**: Secure login system with user management
- 📊 **Product Management**: Add, edit, delete, and view product details
- 👤 **User Profile**: Personal profile management system

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Notifications**: React Toastify
- **Backend**: JSON Server (for development)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Start JSON Server** (in a separate terminal)
   ```bash
   npm run server
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Default Login Credentials

- **Email**: ahmed@gmail.com
- **Password**: ahmed123

## Project Structure

```
src/
├── API/                 # API service functions
├── assets/             # Static assets
├── components/         # Reusable components
├── constants/          # Application constants
├── pages/             # Page components
│   ├── login/         # Authentication pages
│   ├── products/      # Product management pages
│   └── profile/       # User profile pages
├── router/            # Routing configuration
├── App.jsx           # Main application component
├── Footer.jsx        # Footer component
├── Navbar.jsx        # Navigation component
└── RootLayout.jsx    # Root layout wrapper
```

## Features in Detail

### Search & Filtering
- Real-time search by product name
- Filter by category (Furniture, Electronics, Books, Clothing, etc.)
- Price range filtering (min/max)
- Collapsible filter interface
- Clear filters functionality

### Product Categories
- Predefined categories with color coding
- Dropdown selection in forms
- Visual category badges on product cards
- Dynamic category filtering

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized for tablets and desktops

## Development

This project uses modern React patterns and best practices:

- **Hooks**: Functional components with React hooks
- **Form Validation**: Zod schema validation
- **State Management**: React state and context
- **Error Handling**: Comprehensive error handling with user feedback
- **Performance**: Optimized with useMemo and proper re-rendering

## License

© 2025 Ahmed Shop. All rights reserved.
"# ITI-GP-" 
