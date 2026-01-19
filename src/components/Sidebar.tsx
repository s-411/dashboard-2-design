import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import type { Folder } from '../types';

interface SidebarProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onCreateFolder: (name: string) => Promise<Folder | null>;
  onRenameFolder: (folderId: string, newName: string) => Promise<boolean>;
  onDeleteFolder: (folderId: string) => Promise<boolean>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Performance' },
  { path: '/calendar', icon: 'calendar_month', label: 'Campaigns' },
  { path: '/stats', icon: 'insights', label: 'Analytics' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

export default function Sidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
  onRenameFolder,
}: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);

  const location = useLocation();

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const result = await onCreateFolder(newFolderName.trim());
    setIsSubmitting(false);

    if (result) {
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  const handleRenameFolder = async (folderId: string) => {
    if (!editingName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onRenameFolder(folderId, editingName.trim());
    setIsSubmitting(false);

    if (success) {
      setEditingFolderId(null);
      setEditingName('');
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    await onDeleteFolder(folderId);
    setIsSubmitting(false);
    setMenuOpenId(null);

    if (selectedFolderId === folderId) {
      onSelectFolder(null);
    }
  };

  const startEditing = (folder: Folder) => {
    setEditingFolderId(folder.id);
    setEditingName(folder.name);
    setMenuOpenId(null);
  };

  return (
    <aside
      className="hidden md:flex w-64 flex-col h-screen shrink-0 z-20"
      style={{
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo Header */}
      <div
        className="h-16 flex items-center px-6"
        style={{ borderBottom: '1px solid transparent' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#111827' }}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ color: 'var(--primary)' }}
            >
              favorite
            </span>
          </div>
          <span
            className="font-bold text-xl uppercase tracking-tighter"
            style={{ color: 'var(--primary)' }}
          >
            Dream 100
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        <ul className="space-y-1">
          {navItems.map(({ path, icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 155, 240, 0.2)' : 'none',
                  }}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Collections Section */}
        <div>
          <div className="flex items-center justify-between px-4 mb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Collections
            </span>
            <button
              onClick={() => setCollectionsExpanded(!collectionsExpanded)}
              className="w-5 h-5 flex items-center justify-center rounded hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="material-symbols-outlined text-sm">
                {collectionsExpanded ? 'unfold_less' : 'unfold_more'}
              </span>
            </button>
          </div>

          {collectionsExpanded && (
            <ul className="space-y-1 text-sm">
              {/* Master List */}
              <li>
                <button
                  onClick={() => onSelectFolder(null)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: selectedFolderId === null ? 'rgba(0, 155, 240, 0.1)' : 'transparent',
                    color: selectedFolderId === null ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">group</span>
                    <span>Master List</span>
                  </div>
                </button>
              </li>

              {/* Folders */}
              {folders.map((folder) => (
                <li key={folder.id} className="group relative">
                  {editingFolderId === folder.id ? (
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameFolder(folder.id);
                          if (e.key === 'Escape') {
                            setEditingFolderId(null);
                            setEditingName('');
                          }
                        }}
                        autoFocus
                        className="flex-1 px-2 py-1 rounded text-sm outline-none"
                        style={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      <button
                        onClick={() => handleRenameFolder(folder.id)}
                        disabled={isSubmitting}
                        className="w-6 h-6 rounded flex items-center justify-center hover:opacity-70"
                        style={{ backgroundColor: 'var(--success)', color: '#fff' }}
                      >
                        <Check size={12} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditingName('');
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center hover:opacity-70"
                        style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectFolder(folder.id)}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: selectedFolderId === folder.id ? 'rgba(0, 155, 240, 0.1)' : 'transparent',
                        color: selectedFolderId === folder.id ? 'var(--primary)' : 'var(--text-secondary)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">folder</span>
                        <span>{folder.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {/* Placeholder for count */}
                        </span>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenId(menuOpenId === folder.id ? null : folder.id);
                            }}
                            className="w-6 h-6 rounded flex items-center justify-center hover:opacity-70 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <MoreHorizontal size={14} />
                          </button>

                          {menuOpenId === folder.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMenuOpenId(null)}
                              />
                              <div
                                className="absolute right-0 top-full mt-1 z-20 rounded-lg shadow-lg py-1 min-w-[120px]"
                                style={{
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditing(folder);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-70 transition-opacity"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  <Pencil size={14} />
                                  Rename
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFolder(folder.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-70 transition-opacity"
                                  style={{ color: '#ef4444' }}
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* New List Button */}
      <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
        {isCreating ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
                if (e.key === 'Escape') {
                  setIsCreating(false);
                  setNewFolderName('');
                }
              }}
              placeholder="List name"
              autoFocus
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={handleCreateFolder}
              disabled={isSubmitting || !newFolderName.trim()}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: 'var(--success)', color: '#fff' }}
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewFolderName('');
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--text-secondary)',
            }}
          >
            <Plus size={18} />
            New List
          </button>
        )}
      </div>
    </aside>
  );
}
