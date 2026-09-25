# 🛍️ Online Shop

A modern, full-featured e-commerce web app built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Zustand**.  
Browse products, filter by category, manage a shopping cart, and complete checkout — all with a clean, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🛒 **Product Catalog** — Browse a curated list of products with images, prices, and ratings
- 🔍 **Live Search** — Instant search across product names and descriptions
- 🏷️ **Category Filters** — Filter by Bags & Shoes, Electronics, Computers, Books, Beauty
- 👤 **User Authentication** — Register & login with per-user data
- 🛍️ **Shopping Cart** — Add, update quantity, remove items
- 💾 **Per-User Cart** — Each user gets their own persistent cart
- 📋 **Checkout Flow** — Delivery form + order summary + success confirmation
- 🎨 **Modern UI** — Gradient backgrounds, glassmorphism, smooth transitions
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **Zustand** | Global state (cart, user, filters) |
| **react-icons** | Icon library |
| **localStorage** | Client-side persistence |

> **No backend required** — Everything runs client-side using `localStorage`.

---

## 📦 Installation

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Afshin1400-n/online-shop.git

# 2. Navigate into the project
cd online-shop

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev