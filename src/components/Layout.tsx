import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 safe-area-inset-bottom"
        style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="flex flex-col items-center gap-1 px-4 py-1 transition-colors"
                >
                  <Icon
                    size={24}
                    style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}
                  >
                    {label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
