// app/cart/page.tsx
"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'  // ✅ اضافه شد
import { FiTrash2 } from 'react-icons/fi'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore()
  
  // ✅ گرفتن user از Zustand
  const { user, isLoggedIn } = useUserStore()

  // گرفتن حرف اول نام کاربری
  const getInitial = (name: string) => {
    if (!name) return "?"
    return name.charAt(0).toUpperCase()
  }

  // اگر سبد خرید خالی بود
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
        
        {/* ✅ هدر با پروفایل کاربر */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                🛍️ فروشگاه
              </Link>
              
              <div className="flex items-center gap-3">
                <Link href="/cart" className="relative p-2 text-slate-500 hover:text-emerald-500 transition-colors">
                  🛒
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                      {totalItems()}
                    </span>
                  )}
                </Link>
                
                {/* ✅ پروفایل کاربر */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-500/20">
                    {getInitial(user?.username || user?.name)}
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium text-slate-700">
                      {user?.username || user?.name || "کاربر مهمان"}
                    </p>
                    {isLoggedIn ? (
                      <button className="text-[10px] text-slate-400 hover:text-red-500 transition-colors">
                        خروج
                      </button>
                    ) : (
                      <Link href="/login" className="text-[10px] text-emerald-500 hover:text-emerald-600 transition-colors">
                        ورود / ثبت‌نام
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* محتوای خالی */}
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-medium text-slate-500">سبد خرید خالی است</h2>
            <p className="text-sm text-slate-400 mt-1">محصولات مورد نظر خود را اضافه کنید</p>
            <Link 
              href="/" 
              className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
              text-white font-medium rounded-xl transition-all duration-200"
            >
              ← بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      
      {/* ✅ هدر با پروفایل کاربر */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              🛍️ فروشگاه
            </Link>
            
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative p-2 text-slate-500 hover:text-emerald-500 transition-colors">
                🛒
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                    {totalItems()}
                  </span>
                )}
              </Link>
              
              {/* ✅ پروفایل کاربر */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-500/20">
                  {getInitial(user?.username || user?.name)}
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium text-slate-700">
                    {user?.username || user?.name || "کاربر مهمان"}
                  </p>
                  {isLoggedIn ? (
                    <button className="text-[10px] text-slate-400 hover:text-red-500 transition-colors">
                      خروج
                    </button>
                  ) : (
                    <Link href="/login" className="text-[10px] text-emerald-500 hover:text-emerald-600 transition-colors">
                      ورود / ثبت‌نام
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* محتوای سبد خرید */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-700">🛒 سبد خرید</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            🗑️ حذف همه
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* لیست آیتم‌ها */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 
                flex items-center gap-4 hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl 
                flex items-center justify-center text-2xl font-bold text-emerald-500">
                  {item.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-700">{item.name}</h3>
                  <p className="text-sm text-slate-400">{item.category}</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">
                    {item.price.toLocaleString()} تومان
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-slate-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm font-medium text-slate-600 min-w-[80px] text-center">
                  {(item.price * item.quantity).toLocaleString()} تومان
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* خلاصه سبد خرید */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50 h-fit sticky top-20">
            <h3 className="text-lg font-bold text-slate-700 mb-4">📊 خلاصه سبد خرید</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">تعداد اقلام</span>
                <span className="font-medium text-slate-700">{totalItems()} عدد</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-slate-700 font-bold">مجموع</span>
                <span className="text-lg font-bold text-emerald-600">
                  {totalPrice().toLocaleString()} تومان
                </span>
              </div>
            </div>

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
              text-white font-medium rounded-xl transition-all duration-200 shadow-md shadow-emerald-500/20">
              ✅ ادامه فرآیند خرید
            </button>

            <Link 
              href="/" 
              className="block text-center text-sm text-slate-400 hover:text-emerald-500 transition-colors mt-3"
            >
              ← بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}