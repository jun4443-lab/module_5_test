'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const pageTitles = {
  '/dashboard': '대시보드',
  '/dashboard/logs': '로그 모니터링',
  '/dashboard/analytics': '로그 분석',
  '/dashboard/alerts': '알림 설정',
  '/dashboard/users': '사용자 관리',
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name || '사용자');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const title = pageTitles[pathname] || '대시보드';

  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-6 fixed top-0 right-0 left-60 z-10">
      <h2 className="text-lg font-semibold text-white">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm text-white font-medium">
            {userName.charAt(0)}
          </div>
          <span className="text-sm text-gray-300">{userName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
