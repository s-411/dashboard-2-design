import { Outlet, NavLink, useLocation } from 'react-router-dom';
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
    { path: '/', icon: 'dashboard', label: 'Home' },
    { path: '/calendar', icon: 'calendar_month', label: 'Calendar' },
    { path: '/stats', icon: 'insights', label: 'Stats' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div
      className="h-screen flex overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Sidebar - visible on desktop */}
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-auto pb-20 md:pb-0">
          <Outlet />
        </div>

        {/* Bottom nav - mobile only */}
        <nav
          className="fixed bottom-0 left-0 right-0 safe-area-inset-bottom md:hidden z-50"
          style={{
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="max-w-lg mx-auto px-4">
            <div className="flex items-center justify-around py-3">
              {navItems.map(({ path, icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className="flex flex-col items-center gap-1 px-4 py-1 transition-colors"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}
                    >
                      {icon}
                    </span>
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
      </main>
    </div>
  );
}
