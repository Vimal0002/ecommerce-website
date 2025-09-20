# E-Commerce Website

A modern e-commerce website built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

### Backend Features
- **JWT Authentication**: Secure user registration and login system
- **REST API**: Complete CRUD operations for products and categories
- **Advanced Filtering**: Filter products by price range and categories
- **Cart Management**: Add, remove, and update cart items with persistence
- **Database**: SQLite database with Prisma ORM

### Frontend Features
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **User Authentication**: Signup and login pages with form validation
- **Product Listing**: Grid layout with search and filtering capabilities
- **Shopping Cart**: Full cart functionality with quantity management
- **Persistent Cart**: Cart items persist after logout and login
- **Professional UI**: Modern, clean interface with loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📱 Usage

### For Users
1. **Browse Products**: Visit the homepage to see all available products
2. **Filter Products**: Use the search bar and filters to find specific products
3. **Create Account**: Sign up for a new account or log in to an existing one
4. **Add to Cart**: Click the "Add" button on any product to add it to your cart
5. **Manage Cart**: Visit the cart page to update quantities or remove items
6. **Persistent Cart**: Your cart items will be saved even after logging out

### For Developers
1. **API Endpoints**:
   - `POST /api/auth/signup` - User registration
   - `POST /api/auth/login` - User login
   - `POST /api/auth/logout` - User logout
   - `GET /api/auth/me` - Get current user
   - `GET /api/products` - Get products with filtering
   - `POST /api/products` - Create new product (authenticated)
   - `GET /api/categories` - Get all categories
   - `GET /api/cart` - Get user's cart items
   - `POST /api/cart` - Add item to cart
   - `PUT /api/cart/[id]` - Update cart item quantity
   - `DELETE /api/cart/[id]` - Remove item from cart

## 🗄️ Database Schema

- **User**: User accounts with authentication
- **Category**: Product categories
- **Product**: Products with prices, descriptions, and categories
- **CartItem**: Shopping cart items with quantities

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

3. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Add environment variables in Netlify dashboard
   - For production, use a cloud database (PostgreSQL, MySQL, etc.)

4. **Environment Variables for Production**
   ```env
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="your-production-jwt-secret"
   NEXTAUTH_SECRET="your-production-nextauth-secret"
   NEXTAUTH_URL="https://your-site-name.netlify.app"
   NODE_ENV="production"
   ```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🔧 Configuration

### Database
The application uses SQLite for development. For production, update the `DATABASE_URL` in your environment variables to use PostgreSQL, MySQL, or another supported database.

### Authentication
JWT tokens are stored in HTTP-only cookies for security. The tokens expire after 7 days by default.

### Styling
The application uses Tailwind CSS for styling. You can customize the design by modifying the Tailwind configuration or adding custom CSS.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or support, please create an issue in the repository.
