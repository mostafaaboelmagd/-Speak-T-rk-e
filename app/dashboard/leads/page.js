'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle2, Clock, Trash2, Search, ExternalLink } from 'lucide-react';

const initialLeads = [
  { id: 1, name: 'أحمد محمد', country: 'مصر', phone: '+201000000000', course: 'A1 - المستوى المبتدئ الأول', date: '٢٠٢٦-١١-٠١', status: 'تم التواصل' },
  { id: 2, name: 'سارة خالد', country: 'السعودية', phone: '+966500000000', course: 'B1 - المستوى المتوسط الأول', date: '٢٠٢٦-١١-٠٢', status: 'قيد الانتظار' },
  { id: 3, name: 'محمود إبراهيم', country: 'الإمارات', phone: '+971500000000', course: 'A2 - المستوى المبتدئ الثاني', date: '٢٠٢٦-١١-٠٢', status: 'قيد الانتظار' },
];

export default function LeadsManagement() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');

  // استرجاع الطلبات المحفوظة من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedLeads = localStorage.getItem('academy_leads');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
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
    // استخراج الأرقام فقط وإزالة + والمسافات والرموز
    const cleanPhone = phone.toString().replace(/\D/g, '');
    const message = encodeURIComponent(`أهلاً ${name}، نحييك من أكاديمية Speak Türkçe 👋\nبخصوص استفسارك وتسجيلك في ${course}...`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* رأس الصفحة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">إدارة طلبات الاستعلام (واتساب)</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">متابعة الطلاب المهتمين بالتسجيل والراغبين بمعرفة الأسعار.</p>
        </div>
      </div>

      {/* شريط البحث */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text"
          placeholder="ابحث باسم الطالب، الدولة، أو المستوى..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-[var(--text-color)]"
        />
      </div>

      {/* جدول الطلبات */}
      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b border-[var(--border-color)] text-gray-400 text-xs uppercase">
                <th className="p-4 font-bold">اسم الطالب</th>
                <th className="p-4 font-bold">الدولة</th>
                <th className="p-4 font-bold">رقم الهاتف</th>
                <th className="p-4 font-bold">المستوى المطلوب</th>
                <th className="p-4 font-bold">التاريخ</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-gray-600 dark:text-gray-300">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[var(--bg-color)]/50 transition-colors">
                  <td className="p-4 font-bold text-[var(--text-color)]">{lead.name}</td>
                  <td className="p-4">{lead.country}</td>
                  <td className="p-4 font-mono" dir="ltr">{lead.phone}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold">
                      {lead.course}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-400">{lead.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(lead.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        lead.status === 'تم التواصل' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      }`}
                    >
                      {lead.status === 'تم التواصل' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {lead.status}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a 
                        href={getWhatsappUrl(lead.phone, lead.name, lead.course)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                        title="مراسلة عبر واتساب"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
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
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    لا توجد طلبات مطابقة للبحث.
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