'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle2, Clock, Trash2, Search, ExternalLink, Users } from 'lucide-react';

export default function LeadsManagement() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // استرجاع الطلبات المحفوظة فقط من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedLeads = localStorage.getItem('academy_leads');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed)) {
          setLeads(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // دالة تحديث الحفظ في localStorage
  const updateLocalStorage = (updatedLeads) => {
    setLeads(updatedLeads);
    localStorage.setItem('academy_leads', JSON.stringify(updatedLeads));
  };

  const handleDelete = (id) => {
    const updated = leads.filter(lead => lead.id !== id);
    updateLocalStorage(updated);
  };

  const toggleStatus = (id) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: lead.status === 'تم التواصل' ? 'قيد الانتظار' : 'تم التواصل'
        };
      }
      return lead;
    });
    updateLocalStorage(updated);
  };

  // دالة لتنظيف وتجهيز رابط الواتساب الصحيح
  const getWhatsappUrl = (phone, name, course) => {
    if (!phone) return '#';
    const cleanPhone = phone.toString().replace(/\D/g, '');
    const message = encodeURIComponent(`أهلاً ${name}، نحييك من أكاديمية Speak Türkçe 👋\nبخصوص استفسارك وتسجيلك في ${course}...`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const filteredLeads = leads.filter(lead => 
    (lead.name && lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.country && lead.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.course && lead.course.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* رأس الصفحة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">إدارة طلبات الاستعلام (واتساب)</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">متابعة الطلاب المهتمين بالتسجيل والراغبين بمعرفة الأسعار.</p>
        </div>
      </div>

      {/* شريط البحث */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text"
          placeholder="ابحث باسم الطالب، الدولة، أو المستوى..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-900"
        />
      </div>

      {/* جدول الطلبات */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-gray-400 text-xs uppercase">
                <th className="p-4 font-bold">اسم الطالب</th>
                <th className="p-4 font-bold">الدولة</th>
                <th className="p-4 font-bold">رقم الهاتف</th>
                <th className="p-4 font-bold">المستوى المطلوب</th>
                <th className="p-4 font-bold">التاريخ</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-gray-600">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{lead.name}</td>
                  <td className="p-4">{lead.country}</td>
                  <td className="p-4 font-mono" dir="ltr">{lead.phone}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold">
                      {lead.course}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-400">{lead.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(lead.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        lead.status === 'تم التواصل' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'
                      }`}
                    >
                      {lead.status === 'تم التواصل' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {lead.status || 'قيد الانتظار'}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a 
                        href={getWhatsappUrl(lead.phone, lead.name, lead.course)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="مراسلة عبر واتساب"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="حذف الطلب"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-gray-500 font-medium text-base">لا توجد طلبات تسجیل حقيقية حتى الآن.</p>
                      <p className="text-xs text-gray-400">ستظهر بيانات الطلاب المسجلين هنا فور قيامهم بإرسال النماذج من الموقع.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}