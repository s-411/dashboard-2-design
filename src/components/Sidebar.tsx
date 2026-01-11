import { useState } from 'react';
import {
  Users,
  FolderOpen,
  Plus,
  ChevronLeft,
  ChevronRight,
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

export default function Sidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (isCollapsed) {
    return (
      <div
        className="w-12 flex-shrink-0 flex flex-col items-center py-4 border-r"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <button
          onClick={onToggleCollapse}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity mb-4"
          style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => onSelectFolder(null)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity mb-2 ${
            selectedFolderId === null ? 'ring-2 ring-[var(--primary)]' : ''
          }`}
          style={{
            backgroundColor: selectedFolderId === null ? 'var(--primary)' : 'var(--border)',
            color: selectedFolderId === null ? '#000' : 'var(--text-secondary)',
          }}
          title="All Creators"
        >
          <Users size={16} />
        </button>
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onSelectFolder(folder.id)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity mb-2 ${
              selectedFolderId === folder.id ? 'ring-2 ring-[var(--primary)]' : ''
            }`}
            style={{
              backgroundColor:
                selectedFolderId === folder.id
                  ? folder.color || 'var(--primary)'
                  : 'var(--border)',
              color: selectedFolderId === folder.id ? '#000' : 'var(--text-secondary)',
            }}
            title={folder.name}
          >
            <FolderOpen size={16} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-[250px] flex-shrink-0 flex flex-col border-r h-full"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Folders
        </h2>
        <button
          onClick={onToggleCollapse}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {/* All Creators */}
        <button
          onClick={() => onSelectFolder(null)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-1 ${
            selectedFolderId === null ? '' : 'hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedFolderId === null ? 'var(--primary)' : 'transparent',
            color: selectedFolderId === null ? '#000' : 'var(--text-primary)',
          }}
        >
          <Users size={18} />
          <span className="font-medium">All Creators</span>
        </button>

        {/* Folder List */}
        {folders.map((folder) => (
          <div key={folder.id} className="relative mb-1">
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
                  className="w-7 h-7 rounded flex items-center justify-center hover:opacity-70"
                  style={{ backgroundColor: 'var(--success)', color: '#000' }}
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditingFolderId(null);
                    setEditingName('');
                  }}
                  className="w-7 h-7 rounded flex items-center justify-center hover:opacity-70"
                  style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                className={`flex items-center gap-2 rounded-lg transition-colors ${
                  selectedFolderId === folder.id ? '' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: selectedFolderId === folder.id ? 'var(--primary)' : 'transparent',
                }}
              >
                <button
                  onClick={() => onSelectFolder(folder.id)}
                  className="flex-1 flex items-center gap-3 px-3 py-2.5 text-left"
                  style={{
                    color: selectedFolderId === folder.id ? '#000' : 'var(--text-primary)',
                  }}
                >
                  <FolderOpen
                    size={18}
                    style={{
                      color:
                        selectedFolderId === folder.id
                          ? '#000'
                          : folder.color || 'var(--text-secondary)',
                    }}
                  />
                  <span className="font-medium truncate">{folder.name}</span>
                </button>
                <div className="relative pr-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === folder.id ? null : folder.id);
                    }}
                    className="w-7 h-7 rounded flex items-center justify-center hover:opacity-70 transition-opacity"
                    style={{
                      color: selectedFolderId === folder.id ? '#000' : 'var(--text-secondary)',
                    }}
                  >
                    <MoreHorizontal size={16} />
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
                          onClick={() => startEditing(folder)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <Pencil size={14} />
                          Rename
                        </button>
                        <button
                          onClick={() => handleDeleteFolder(folder.id)}
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
            )}
          </div>
        ))}
      </div>

      {/* New Folder Button */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
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
              placeholder="Folder name"
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
              style={{ backgroundColor: 'var(--success)', color: '#000' }}
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
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <Plus size={18} />
            <span className="font-medium">New Folder</span>
          </button>
        )}
      </div>
    </div>
  );
}
