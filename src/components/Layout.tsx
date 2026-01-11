import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, Settings } from 'lucide-react';
import Sidebar from './Sidebar';
import { useFolderContext } from '../hooks/useFolderContext';

export default function Layout() {
  const location = useLocation();
  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    createFolder,
    renameFolder,
    deleteFolder,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useFolderContext();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sidebar - visible on desktop for all pages */}
      <Sidebar
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        onCreateFolder={createFolder}
        onRenameFolder={renameFolder}
        onDeleteFolder={deleteFolder}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 pb-20 md:pb-6">
          <Outlet />
        </main>

        {/* Bottom nav - mobile only */}
        <nav
          className="fixed bottom-0 left-0 right-0 safe-area-inset-bottom md:hidden"
          style={{
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border)',
          }}
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
    </div>
  );
}
