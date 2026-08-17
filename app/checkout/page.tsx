// app/checkout/page.tsx
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const { user } = useUserStore()

  // اطلاعات فرم
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // اگر سبد خرید خالی بود
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-medium text-slate-500">سبد خرید خالی است</h2>
          <Link href="/" className="mt-4 inline-block text-emerald-500 hover:text-emerald-600">
            ← بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // شبیه‌سازی ثبت سفارش
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      
      // پاک کردن سبد خرید بعد از ثبت سفارش
      clearCart()
      
      // بعد از ۳ ثانیه رفتن به صفحه اصلی
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* هدر */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="text-slate-400 hover:text-slate-600 transition-colors">
            ← بازگشت
          </Link>
          <h1 className="text-3xl font-bold text-slate-700">📋 تکمیل خرید</h1>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-200 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-emerald-600">سفارش شما با موفقیت ثبت شد!</h2>
            <p className="text-slate-500 mt-2">از خرید شما متشکریم</p>
            <Link href="/" className="inline-block mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl">
              بازگشت به فروشگاه
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* فرم اطلاعات */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <h2 className="text-lg font-bold text-slate-700 mb-4">اطلاعات تحویل</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* نام و نام خانوادگی */}
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="نام خود را وارد کنید"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                      focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                      text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                      required
                    />
                  </div>

                  {/* تلفن */}
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">
                      شماره تلفن *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="مثال: 09123456789"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                      focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                      text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                      required
                    />
                  </div>

                  {/* استان / شهر */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        استان *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="استان"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                        focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                        text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-1.5">
                        کد پستی *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="کد پستی"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                        focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                        text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* آدرس */}
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">
                      آدرس کامل *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="آدرس دقیق خود را وارد کنید..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                      focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                      text-slate-700 placeholder:text-slate-400 transition-all text-sm resize-none"
                      required
                    />
                  </div>

                  {/* توضیحات */}
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1.5">
                      توضیحات (اختیاری)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="2"
                      placeholder="توضیحات اضافی..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                      focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                      text-slate-700 placeholder:text-slate-400 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
                    text-white font-medium rounded-xl transition-all duration-200 
                    shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {loading ? '⏳ در حال ثبت...' : '✅ ثبت سفارش'}
                  </button>
                </form>
              </div>
            </div>

            {/* خلاصه سفارش */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 sticky top-20">
                <h3 className="text-lg font-bold text-slate-700 mb-4">📊 خلاصه سفارش</h3>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2">
                      <div>
                        <p className="font-medium text-slate-700">{item.name}</p>
                        <p className="text-xs text-slate-400">× {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">تعداد اقلام</span>
                    <span className="font-medium">{items.reduce((t, i) => t + i.quantity, 0)} عدد</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span className="text-slate-700">مجموع</span>
                    <span className="text-emerald-600">{totalPrice().toLocaleString()} تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}