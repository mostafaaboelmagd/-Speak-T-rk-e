'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function DashboardControl() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // قراءة الحالة الحالية من التخزين المحلي عند التحميل
    const saved = localStorage.getItem('academy_reviews_enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('academy_reviews_enabled', newState);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">استقبال آراء الطلاب</h3>
        <p className="text-xs text-gray-500 mt-1">عند إيقاف التشغيل، لن يتمكن الطلاب من إرسال آراء جديدة.</p>
      </div>

      <button
        onClick={handleToggle}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
          isEnabled 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' 
            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
        }`}
      >
        {isEnabled ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {isEnabled ? 'مفعل' : 'مُعطل'}
      </button>
    </div>
  );
}