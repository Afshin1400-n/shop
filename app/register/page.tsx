// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "../store/userStore";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError("همه فیلدها را پر کنید");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("رمز عبور باید حداقل ۴ کاراکتر باشد");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.username === username)) {
      setError("این نام کاربری قبلاً ثبت شده است");
      setLoading(false);
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/login"); // ✅ درست
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200/50">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <span className="text-3xl">📝</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-700">
              ثبت‌نام
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              حساب کاربری جدید بسازید
            </p>
          </div>

          {success ? (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-center">
              <div className="font-bold">✅ ثبت‌نام با موفقیت انجام شد!</div>
              <div className="text-sm text-emerald-500/70 mt-1">در حال انتقال به صفحه ورود...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  نام کاربری
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری خود را انتخاب کنید..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                  text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  رمز عبور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد کنید..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                  text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                  required
                  minLength={4}
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  تکرار رمز عبور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="رمز عبور را دوباره وارد کنید..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                  text-slate-700 placeholder:text-slate-400 transition-all text-sm"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm text-center">
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
                text-white font-medium rounded-xl transition-all duration-200 
                shadow-md shadow-emerald-500/20 hover:shadow-lg disabled:opacity-50 cursor-pointer text-sm"
              >
                {loading ? "⏳ در حال ثبت‌نام..." : "🚀 ثبت‌نام"}
              </button>
            </form>
          )}

          <p className="text-center text-slate-400 text-sm mt-6">
            قبلاً ثبت‌نام کردید؟{" "}
            <Link href="/login" className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}