"use client";

export default function BtnFilter({ text, filter, setFilter, value }) {
  const isActive = filter === value;

  return (
    <button
      type="button"
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
        isActive 
          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20" 
          : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-700"
      }`}
    >
      {text}
    </button>
  );
}