'use client';
import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PriceModal({ isOpen, onClose, courseLevel }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. تجهيز كائن الطلب الجديد لحفظه في لوحة التحكم
    const newLead = {
      id: Date.now(),
      name: formData.name,
      country: formData.country,
      phone: formData.phone,
      course: courseLevel ? `مستوى (${courseLevel})` : 'الدورات العامة',
      date: new Date().toLocaleDateString('ar-EG'),
      status: 'جديد'
    };

    // 2. حفظ الطلب في localStorage ليظهر في لوحة التحكم
    try {
      const existingLeads = JSON.parse(localStorage.getItem('academy_leads') || '[]');
      const updatedLeads = [newLead, ...existingLeads];
      localStorage.setItem('academy_leads', JSON.stringify(updatedLeads));
    } catch (error) {
      console.error('خطأ في حفظ الطلب:', error);
    }

    // عرض إشعار بصري أنيق بنجاح التسجيل
    toast.success('تم تسجيل طلبك بنجاح! جاري تحويلك لواتساب...', {
      duration: 4000,
      style: {
        background: '#06262a',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '12px',
      },
    });

    // رقم الواتساب الخاص بك
    const whatsappNumber = '201505591825'; 
    
    // تجهيز رسالة الواتساب الجاهزة
    const message = `مرحباً، أرغب في التسجيل والاستفسار عن أسعار ${courseLevel ? `مستوى (${courseLevel})` : 'الدورات'}.
    
الاسم: ${formData.name}
الدولة: ${formData.country}
رقم الهاتف: ${formData.phone}`;

    // فتح رابط الواتساب بعد لحظات قصيرة ليرى الطالب الإشعار
    setTimeout(() => {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    }, 1000);
    
    // إعادة تعيين النموذج وإغلاق النافذة
    setFormData({ name: '', country: '', phone: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl text-[var(--text-color)] animate-in fade-in zoom-in duration-200" dir="rtl">
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-gray-500 hover:text-[var(--text-color)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* رأس النافذة */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {courseLevel ? `التسجيل في ${courseLevel}` : 'التسجيل في الدورات'}
          </div>
          <h3 className="text-xl sm:text-2xl font-black">أدخل بياناتك لمعرفة السعر والتسجيل</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            نظرًا لاختلاف الأسعار والعروض حسب دولتك، سيتم تحويلك مباشرة لموظف المختص عبر واتساب.
          </p>
        </div>

        {/* نموذج الإدخال (Form) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5 opacity-90 text-right">الاسم الكامل</label>
            <input 
              type="text" 
              required
              placeholder="أدخل اسمك هنا"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500 transition-colors text-right"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 opacity-90 text-right">الدولة المقيم بها</label>
            <input 
              type="text" 
              required
              placeholder="مثال: مصر، السعودية، تركيا..."
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500 transition-colors text-right"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 opacity-90 text-right">رقم الهاتف (مع رمز الدولة)</label>
            <input 
              type="tel" 
              required
              placeholder="+20 أو +966..."
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500 transition-colors text-right"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            إرسال الطلب ومتابعة عبر واتساب
          </button>
        </form>

      </div>
    </div>
  );
}