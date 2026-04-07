# Gadgets BD 🛒⚡

Gadgets BD is a full-stack, premium e-commerce platform built with Next.js App Router, TailWind CSS, and MongoDB. It supports dynamic inventory management, an advanced shopping cart with real-time checkout updates, role-based dashboards, and a robust vendor catalog.

## ✨ Features

### 👤 Customer Experience
- **Dynamic Product Browsing:** High-performance catalog with multi-dimensional filtering (Category, Brand, Price, Rating).
- **Dynamic Cart & Checkout:** Powered by Zustand for seamless state management. Includes an "Edit Order Details" modal to update shipping specs and quantities mid-checkout.
- **Account Area:** Track your order status automatically, review history, and download PDF invoices directly from `/bookings`.
- **Review System:** Add authenticated user reviews to delivered items.
- **Shop Directory:** Browse registered storefronts on `/shops` and view vendor-specific inventory.

### 🏪 Seller Central (Shop Owner Features)
- **Role-Based Access Control:** Exclusive dashboards restricted to Shop Owners via NextAuth (`getServerSession`).
- **Inventory Management:** Full CRUD capabilities (`/manage-list`) featuring live Toggle Publish / Unpublish, Search, and dynamic filters.
- **Customized Product Forms:** Intelligent "Add Product" (`/create`) form instantly adapts input fields based on category (e.g., Laptops vs. Wearables vs. Cameras) to store clean, specific MongoDB schemas.
- **Order Fulfillment:** Isolated, data-rich dispatch tools on the Orders page (`/bookings`) allow merchants to update fulfillment stages (Pending ➔ Confirmed ➔ Shipped ➔ Delivered ➔ Cancelled) pushing real-time tracking badge updates to customers.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **Database:** Mongoose / MongoDB
- **Authentication:** NextAuth.js v4 (Credentials & Google OAuth mapping to custom Role strings)
- **Global State:** Zustand (for Persistent UI cart interactions)

## 🗂️ Core Routes

### Public Endpoints
- `/` - Home Page
- `/products` - Browse all inventory with Sidebar Filters
- `/details/[id]` - Individual product spec page
- `/shops` - Vendor directory
- `/shops/[id]` - Dedicated dynamic public storefronts

### Protected / Checkout (Requires Login)
- `/cart` & `/payment-process` - Secure transactional flow
- `/bookings` - Order dashboard (View varies greatly by User vs. Shop Owner)
- `/review-modal` - Leave reviews on products

### Shop Owner Exclusive
- `/create` - Create new listings
- `/manage-list` - Interactive inventory UI

## 🚀 Getting Started

### 1. Requirements
Ensure you have `Node.js` (v18+) and your localized or Atlas `MongoDB` connection string ready.

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/gadgets??
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key
# Optional for Google Login:
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

### 3. Installation & Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the application in your browser!

### 4. Code Quality
```bash
npm run lint
npm run build
```

## 🤝 Contribution & License
Designed and developed dynamically for scaling modern tech marketplaces. All rights reserved by LWS.
