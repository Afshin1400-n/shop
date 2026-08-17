// app/page.tsx
"use client"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BtnFilter from "./component/BtnFilter";
import { useFilterStore } from "./store/filterStore";
import { useCartStore } from "./store/cartStore";
import { useUserStore } from "./store/userStore"; // ✅ اضافه شد

const products = [
  {
    id: 1,
    name: "کیف چرمی دست‌ساخت",
    price: 450000,
    description: "کیف چرمی طبیعی با کیفیت عالی",
    category: "کیف و کفش",
    rating: 4.5,
    stock: 10
  },
  {
    id: 2,
    name: "ساعت هوشمند اپل واچ",
    price: 1200000,
    description: "اپل واچ سری ۸ با قابلیت‌های پیشرفته",
    category: "الکترونیک",
    rating: 4.8,
    stock: 5
  },
  {
    id: 3,
    name: "هدفون بی‌سیم سونی",
    price: 350000,
    description: "هدفون حذف نویز با کیفیت صدای فوق‌العاده",
    category: "الکترونیک",
    rating: 4.6,
    stock: 8
  },
  {
    id: 4,
    name: "کیبورد مکانیکی",
    price: 280000,
    description: "کیبورد گیمینگ با سوئیچ آبی و نور RGB",
    category: "کامپیوتر",
    rating: 4.3,
    stock: 15
  },
  {
    id: 5,
    name: "عطر مردانه شنل",
    price: 320000,
    description: "عطر مردانه با رایحه چوبی و مرکبات",
    category: "زیبایی",
    rating: 4.7,
    stock: 12
  },
  {
    id: 6,
    name: "کتاب صوتی موفقیت",
    price: 95000,
    description: "کتاب صوتی ۱۰۰ قانون موفقیت",
    category: "کتاب",
    rating: 4.9,
    stock: 20
  }
];

export default function Home() {
  const router = useRouter();
  
  // ✅ گرفتن از Zustand
  const { user, isLoggedIn } = useUserStore(); // ✅ درست
  const { filter, searchTerm, setFilter, setSearchTerm } = useFilterStore();
  const { items, addToCart, totalItems } = useCartStore();

  // ❌ حذف useState اضافی
  // const [user, setUser] = useState(null); // ❌ حذف شد

  const handleOutUser = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const filteredTasks = useMemo(() => {
    let result = products;

    if (filter !== "ALL") {
      result = result.filter((task) => task.category === filter);
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
  }, [products, filter, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      
      {/* ====== هدر ====== */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              🛍️ فروشگاه
            </Link>

            {/* ✅ سرچ با value و دکمه پاک کردن */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm} // ✅ اضافه شد
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجوی محصول..."
                  className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl 
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                  text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>
                {/* ✅ دکمه پاک کردن سرچ */}
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

            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative p-2 text-slate-500 hover:text-emerald-500 transition-colors">
                🛒
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                    {totalItems()}
                  </span>
                )}
              </Link>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-500/20">
                  {getInitial(user?.username || user?.name)}
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium text-slate-700">
                    {user?.username || user?.name || "کاربر مهمان"}
                  </p>
                  {isLoggedIn ? (
                    <button 
                      onClick={handleOutUser}
                      className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                    >
                      خروج
                    </button>
                  ) : (
                    <Link 
                      href="/login"
                      className="text-[10px] text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      ورود / ثبت‌نام
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====== محتوای اصلی ====== */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-700">
            🛍️ محصولات
          </h1>
          <div className="flex flex-wrap gap-2">
            <BtnFilter text="همه" filter={filter} setFilter={setFilter} value="ALL" />
            <BtnFilter text="کیف و کفش" filter={filter} setFilter={setFilter} value="کیف و کفش" />
            <BtnFilter text="الکترونیک" filter={filter} setFilter={setFilter} value="الکترونیک" />
            <BtnFilter text="کامپیوتر" filter={filter} setFilter={setFilter} value="کامپیوتر" />
            <BtnFilter text="کتاب" filter={filter} setFilter={setFilter} value="کتاب" />
            <BtnFilter text="زیبایی" filter={filter} setFilter={setFilter} value="زیبایی" />
          </div>
        </div>

        {/* ✅ نمایش تعداد نتایج */}
        <p className="text-sm text-slate-400 mb-4">
          {filteredTasks.length} محصول یافت شد
        </p>

        {/* لیست محصولات */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTasks.map((product) => (
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
                      {product.price.toLocaleString()} تومان
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      ⭐ {product.rating}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600 active:scale-[0.97]
                    text-white font-medium rounded-xl transition-all duration-200 text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg"
                  >
                    🛒 افزودن به سبد
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h2 className="text-xl font-medium text-slate-500">محصولی یافت نشد</h2>
            <p className="text-sm text-slate-400 mt-1">
              {searchTerm ? `برای "${searchTerm}" نتیجه‌ای پیدا نشد` : "سعی کنید با کلمات دیگر جستجو کنید"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                پاک کردن جستجو
              </button>
            )}
          </div>
        )}

      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © ۱۴۰۴ فروشگاه آنلاین - تمامی حقوق محفوظ است
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-emerald-500 transition-colors">درباره ما</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">تماس با ما</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">قوانین</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}