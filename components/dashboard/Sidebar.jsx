'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, MessageSquareQuote, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { title: 'الرئيسية', href: '/dashboard', icon: LayoutDashboard },
    { title: 'إدارة الدورات', href: '/dashboard/courses', icon: BookOpen },
    { title: 'طلبات الاستعلام', href: '/dashboard/leads', icon: Users },
    { title: 'آراء الطلاب', href: '/dashboard/testimonials', icon: MessageSquareQuote },
  ];

  return (
    <aside 
      className={`relative bg-[var(--card-bg)] border-l border-[var(--border-color)] flex flex-col h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* زر الطي والتوسيع */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3.5 top-7 w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md hover:bg-teal-500 transition-colors cursor-pointer z-10"
        title={isCollapsed ? "توسيع القائمة" : "طي القائمة"}
      >
        {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* رأس القائمة */}
      <div className="p-6 border-b border-[var(--border-color)] flex items-center gap-3 overflow-hidden">
        <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 font-black shrink-0">
          ST
        </div>
        {!isCollapsed && (
          <div className="truncate">
            <h2 className="text-base font-black text-teal-500">Speak Türkçe</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">لوحة التحكم الإدارية</p>
          </div>
        )}
      </div>

      {/* روابط التنقل */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.title : ''}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* زر الخروج / العودة */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <Link
          href="/"
          title={isCollapsed ? "العودة للموقع الرئيسي" : ""}
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="truncate">العودة للموقع الرئيسي</span>}
        </Link>
      </div>
    </aside>
  );
}