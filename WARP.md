# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

ShopEasy is a full-stack e-commerce platform built with **Next.js 15**, **TypeScript**, **Prisma**, and **Tailwind CSS**. The application features user authentication, product catalog, shopping cart, order management, and includes production-ready fallback systems for 100% uptime.

## Development Commands

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Generate Prisma client and push schema to database
npx prisma generate
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

### Development Workflow
```bash
# Start development server
npm run dev

# Build for production (includes Prisma generation)
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint

# Alternative seeding commands
npm run db:seed-simple    # Simple seed script
npm run db:seed          # Complex seed with tsx
```

### Database Commands
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database and reseed
npx prisma db push --force-reset
npm run db:seed

# Generate Prisma client after schema changes
npx prisma generate
```

### Testing and Development
```bash
# Run a single test (if tests are added)
npm test -- <test-file>

# Check TypeScript types
npx tsc --noEmit

# Format code (if prettier is configured)
npm run format
```

## Architecture Overview

### Core Structure
- **Next.js App Router**: Uses the new `src/app` directory structure with file-based routing
- **Database Layer**: Prisma ORM with SQLite (configurable to PostgreSQL/MySQL)
- **Authentication**: Custom JWT-based auth system with fallback mock authentication
- **State Management**: React Context for Auth and Cart state
- **UI Components**: Tailwind CSS with custom components in `src/components/`

### Key Architectural Patterns

#### Fallback System Architecture
The application implements a sophisticated fallback system for production reliability:
- **Database Fallbacks**: Static fallback data in `src/lib/fallback-data.ts` when database is unavailable
- **Mock Authentication**: Fallback auth system in `src/lib/mock-auth.ts` for demo purposes
- **Graceful Degradation**: All API routes handle database failures gracefully

#### Context-Based State Management
```typescript
// Authentication state managed via AuthContext
// Shopping cart state managed via CartContext
// Both wrap the entire application in layout.tsx
```

#### Database Schema Design
- **User Management**: Users with roles (ADMIN/USER), addresses, and profile data
- **Product Catalog**: Categories → Products → Reviews/Wishlist relationships
- **E-commerce Flow**: CartItems → Orders → OrderItems with full lifecycle tracking
- **Advanced Features**: Stock tracking, discount system, shipping/billing separation

### API Route Structure
```
src/app/api/
├── auth/           # Authentication endpoints
│   ├── login/      # User login with fallback
│   ├── signup/     # User registration
│   ├── logout/     # Session termination
│   └── me/         # Current user data
├── products/       # Product management
│   ├── route.ts    # List products with filtering
│   └── [id]/       # Individual product details
├── categories/     # Category management
├── cart/          # Shopping cart operations
└── seed/          # Database seeding endpoint
```

### Frontend Architecture
- **Pages**: App Router pages in `src/app/` (page.tsx, login/, cart/, etc.)
- **Components**: Reusable UI components in `src/components/`
- **Contexts**: Global state management in `src/contexts/`
- **Libraries**: Database, auth, and utility functions in `src/lib/`

## Important Technical Details

### Environment Variables
Required for development:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NODE_ENV="development"
```

### Database Configuration
- **Default**: SQLite for development simplicity
- **Configurable**: Switch to PostgreSQL/MySQL by changing `prisma/schema.prisma` provider
- **Migrations**: Use `npx prisma db push` for schema changes (no migration files needed for SQLite)

### Production Deployment Features
- **Netlify Ready**: Configured with `netlify.toml` and `@netlify/plugin-nextjs`
- **Build Optimization**: Automatic database setup during build process
- **Error Handling**: Production builds continue even with TypeScript/ESLint errors
- **Fallback Systems**: Automatic fallback to static data if database fails

### Key File Locations
- **Database Schema**: `prisma/schema.prisma`
- **Global Styles**: `src/app/globals.css`
- **Environment**: `.env.example` (template), `.env.production` (production config)
- **Seed Scripts**: `src/lib/seed.ts`, `src/lib/simple-seed.ts`
- **Deployment**: `DEPLOYMENT.md`, `LIVE-DEPLOYMENT.md`

## Test Accounts (Post-Seeding)
- **Admin**: admin@shopeasy.com / admin123
- **Demo User**: demo@example.com / demo123  
- **Test User**: john@example.com / demo123

## Development Notes

### Database Best Practices
- Always run `npx prisma generate` after schema changes
- Use `npm run db:seed` to populate with realistic sample data
- Database includes 8 featured products across 5 categories with reviews and orders

### Authentication System
- JWT tokens stored in HTTP-only cookies for security
- Mock authentication available as fallback for production demos
- User roles properly implemented with ADMIN/USER permissions

### Cart and Order Flow
- Shopping cart persists across user sessions
- Complete order processing with status tracking (PENDING → PROCESSING → SHIPPED → DELIVERED)
- Payment status management integrated into order system

### Production Readiness
- Input validation with Zod schemas
- XSS and SQL injection protection
- Fallback data ensures 100% uptime even with database issues
- Production builds include automatic database seeding