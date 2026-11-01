'use client';
import { useState, useEffect } from 'react';
import { Plus, Star, Trash2, CheckCircle2, X, MessageSquare } from 'lucide-react';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', course: '', rating: '5', comment: '' });

  // استرجاع الآراء المحفوظة من localStorage فقط عند تحميل الصفحة
  useEffect(() => {
    const saved = localStorage.getItem('academy_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTestimonials(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // دالة الحفظ المحدثة في localStorage
  const updateLocalStorage = (updatedList) => {
    setTestimonials(updatedList);
    localStorage.setItem('academy_testimonials', JSON.stringify(updatedList));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.comment) return;
    
    const updated = [
      ...testimonials, 
      { id: Date.now(), ...newTestimonial, rating: Number(newTestimonial.rating), status: 'منشور' }
    ];
    updateLocalStorage(updated);
    setNewTestimonial({ name: '', course: '', rating: '5', comment: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updated = testimonials.filter(t => t.id !== id);
    updateLocalStorage(updated);
  };

  const toggleStatus = (id) => {
    const updated = testimonials.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'منشور' ? 'معلق' : 'منشور'
        };
      }
      return t;
    });
    updateLocalStorage(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* رأس الصفحة وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">إدارة آراء الطلاب</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحكم في تقييمات وآراء الطلاب الظاهرة في الموقع الرئيسي.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          إضافة رأي جديد
        </button>
      </div>

      {/* جدول الآراء */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-gray-400 text-xs uppercase">
                <th className="p-4 font-bold">اسم الطالب</th>
                <th className="p-4 font-bold">الدورة / المستوى</th>
                <th className="p-4 font-bold">التقييم</th>
                <th className="p-4 font-bold">التعليق</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-gray-600">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{item.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold">
                      {item.course}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-gray-500">{item.comment}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        item.status === 'منشور' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.status}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <p className="text-gray-500 font-medium text-base">لا توجد آراء أو تقييمات مضافة حتى الآن.</p>
                      <p className="text-xs text-gray-400">استخدم زر "إضافة رأي جديد" بالأعلى لإضافة تقييمات الطلاب.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة رأي جديد (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl text-slate-900">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-slate-100 border border-slate-200 text-gray-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black">إضافة رأي طالب جديد</h3>
              <p className="text-xs text-gray-500 mt-1">أدخل تفاصيل تقييم الطالب ليظهر في قسم الآراء بالموقع.</p>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">اسم الطالب</label>
                <input 
                  type="text" 
                  required
                  placeholder="محمد علي"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">الدورة / المستوى</label>
                <input 
                  type="text" 
                  required
                  placeholder="A1 - المستوى المبتدئ الأول"
                  value={newTestimonial.course}
                  onChange={(e) => setNewTestimonial({...newTestimonial, course: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">التقييم (من 5)</label>
                <select 
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({...newTestimonial, rating: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 text-slate-900"
                >
                  <option value="5">5 نجوم - ممتاز</option>
                  <option value="4">4 نجوم - جيد جداً</option>
                  <option value="3">3 نجوم - جيد</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">نص الرأي أو التقييم</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="اكتب رأي الطالب هنا..."
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teal-500 text-slate-900"
                />
              </div>

              <button 
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all cursor-pointer"
              >
                حفظ ونشر التقييم
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}