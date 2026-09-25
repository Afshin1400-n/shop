// app/page.tsx
"use client"
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BtnFilter from "./component/BtnFilter";
import { useFilterStore } from "./store/filterStore";
import { useCartStore } from "./store/cartStore";
import { useUserStore } from "./store/userStore";

const products = [
  {
    id: 1,
    name: "Handmade Leather Bag",
    price: 45,
    description: "Natural leather bag with excellent quality",
    category: "Bags & Shoes",
    rating: 4.5,
    stock: 10
  },
  {
    id: 2,
    name: "Apple Watch Smartwatch",
    price: 1000,
    description: "Apple Watch Series 8 with advanced features",
    category: "Electronics",
    rating: 4.8,
    stock: 5
  },
  {
    id: 3,
    name: "Sony Wireless Headphones",
    price: 190,
    description: "Noise-cancelling headphones with amazing sound quality",
    category: "Electronics",
    rating: 4.6,
    stock: 8
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 3,
    description: "Gaming keyboard with blue switches and RGB lighting",
    category: "Computers",
    rating: 4.3,
    stock: 15
  },
  {
    id: 5,
    name: "Chanel Men's Perfume",
    price: 10,
    description: "Men's perfume with woody and citrus notes",
    category: "Beauty",
    rating: 4.7,
    stock: 12
  },
  {
    id: 6,
    name: "Success Audiobook",
    price: 50,
    description: "Audiobook of 100 Rules of Success",
    category: "Books",
    rating: 4.9,
    stock: 20
  }
];

export default function Home() {
  const router = useRouter();

  const { user, isLoggedIn } = useUserStore();
  const { filter, searchTerm, setFilter, setSearchTerm } = useFilterStore();
  const { addToCart, totalItems } = useCartStore();
  const { setUserId } = useCartStore();

  // ✅ When user logs in, load their cart
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      setUserId(user.id)
    }
  }, [isLoggedIn, user, setUserId])

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const getInitial = (name: string | undefined) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filter !== "ALL") {
      result = result.filter((product) => product.category === filter);
    }

    if (searchTerm.trim() !== "") {
      const search = searchTerm.trim().toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
      );
    }

    return result;
  }, [filter, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">

      {/* ====== Header ====== */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              🛍️ Shop
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl 
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                  text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right buttons */}
            <div className="flex items-center gap-3">

              {/* Cart - conditional */}
              {isLoggedIn ? (
                <Link href="/cart" className="relative p-2 text-slate-500 hover:text-emerald-500 transition-colors">
                  🛒
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                      {totalItems()}
                    </span>
                  )}
                </Link>
              ) : (
                <Link href="/login" className="relative p-2 text-slate-400 hover:text-emerald-500 transition-colors">
                  🛒
                </Link>
              )}

              {/* User profile */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-500/20">
                  {getInitial(user?.username || user?.name)}
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium text-slate-700">
                    {user?.username || user?.name || "Guest"}
                  </p>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="text-[10px] text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====== Main content ====== */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-700">
            🛍️ Products
          </h1>
          <div className="flex flex-wrap gap-2">
            <BtnFilter text="All" filter={filter} setFilter={setFilter} value="ALL" />
            <BtnFilter text="Bags & Shoes" filter={filter} setFilter={setFilter} value="Bags & Shoes" />
            <BtnFilter text="Electronics" filter={filter} setFilter={setFilter} value="Electronics" />
            <BtnFilter text="Computers" filter={filter} setFilter={setFilter} value="Computers" />
            <BtnFilter text="Books" filter={filter} setFilter={setFilter} value="Books" />
            <BtnFilter text="Beauty" filter={filter} setFilter={setFilter} value="Beauty" />
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          {filteredProducts.length} products found
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-200/50 hover:border-emerald-200/50">

                <div className="h-48 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 flex items-center justify-center text-5xl relative">
                  {product.name.charAt(0)}
                  <div className="absolute top-3 right-3 bg-emerald-500/10 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-700 group-hover:text-emerald-600 transition line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{product.description}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-emerald-600">
                      {product.price.toLocaleString()} $
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      ⭐ {product.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600 active:scale-[0.97]
                    text-white font-medium rounded-xl transition-all duration-200 text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg cursor-pointer"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h2 className="text-xl font-medium text-slate-500">No products found</h2>
            <p className="text-sm text-slate-400 mt-1">
              {searchTerm ? `No results for "${searchTerm}"` : "Try searching with different keywords"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © 2025 Online Shop - All rights reserved
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-emerald-500 transition-colors">About Us</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}