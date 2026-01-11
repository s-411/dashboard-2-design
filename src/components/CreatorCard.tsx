import { useState } from 'react';
import { ExternalLink, Heart, MessageCircle, Check, Minus, Plus, FolderOpen, ChevronDown } from 'lucide-react';
import type { CreatorWithEngagement, Folder } from '../types';
import PlatformBadge from './PlatformBadge';

interface CreatorCardProps {
  creator: CreatorWithEngagement;
  folders: Folder[];
  onUpdateEngagement: (
    creatorId: string,
    updates: { likes_count?: number; comments_count?: number; is_done?: boolean }
  ) => void;
  onUpdateFolder: (creatorId: string, folderId: string | null) => Promise<boolean>;
}

export default function CreatorCard({ creator, folders, onUpdateEngagement, onUpdateFolder }: CreatorCardProps) {
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const engagement = creator.engagement;
  const isDone = engagement?.is_done ?? false;
  const likesCount = engagement?.likes_count ?? 0;
  const commentsCount = engagement?.comments_count ?? 0;

  const currentFolder = folders.find((f) => f.id === creator.folder_id);

  const handleLikesChange = (delta: number) => {
    const newCount = Math.max(0, likesCount + delta);
    onUpdateEngagement(creator.id, { likes_count: newCount });
  };

  const handleCommentsChange = (delta: number) => {
    const newCount = Math.max(0, commentsCount + delta);
    onUpdateEngagement(creator.id, { comments_count: newCount });
  };

  const handleToggleDone = () => {
    onUpdateEngagement(creator.id, { is_done: !isDone });
  };

  const handleFolderChange = async (folderId: string | null) => {
    await onUpdateFolder(creator.id, folderId);
    setFolderMenuOpen(false);
  };

  return (
    <div
      className={`rounded-xl p-4 transition-all ${isDone ? 'opacity-60' : ''}`}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        filter: isDone ? 'grayscale(0.5)' : 'none',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          {creator.profile_pic_url ? (
            <img
              src={creator.profile_pic_url}
              alt={creator.display_name || creator.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              {(creator.display_name || creator.username).charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {creator.display_name || creator.username}
            </h3>
            {isDone && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: 'var(--success)', color: '#000' }}
              >
                Done
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              @{creator.username}
            </span>
            <PlatformBadge platform={creator.platform} size="sm" />
            {creator.profile_url && (
              <a
                href={creator.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Folder selector */}
          <div className="relative mt-2">
            <button
              onClick={() => setFolderMenuOpen(!folderMenuOpen)}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-opacity hover:opacity-70"
              style={{
                backgroundColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <FolderOpen size={12} style={{ color: currentFolder?.color || 'var(--text-secondary)' }} />
              <span className="truncate max-w-[100px]">{currentFolder?.name || 'No folder'}</span>
              <ChevronDown size={12} />
            </button>

            {folderMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setFolderMenuOpen(false)} />
                <div
                  className="absolute left-0 top-full mt-1 z-20 rounded-lg shadow-lg py-1 min-w-[140px] max-h-[200px] overflow-y-auto"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <button
                    onClick={() => handleFolderChange(null)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-70 transition-opacity ${
                      !creator.folder_id ? 'font-medium' : ''
                    }`}
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <FolderOpen size={14} style={{ color: 'var(--text-secondary)' }} />
                    No folder
                    {!creator.folder_id && (
                      <Check size={14} className="ml-auto" style={{ color: 'var(--success)' }} />
                    )}
                  </button>
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => handleFolderChange(folder.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-70 transition-opacity ${
                        creator.folder_id === folder.id ? 'font-medium' : ''
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <FolderOpen size={14} style={{ color: folder.color || 'var(--text-secondary)' }} />
                      <span className="truncate">{folder.name}</span>
                      {creator.folder_id === folder.id && (
                        <Check size={14} className="ml-auto flex-shrink-0" style={{ color: 'var(--success)' }} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLikesChange(-1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Minus size={14} />
            </button>
            <div className="flex items-center gap-1 min-w-[50px] justify-center">
              <Heart size={16} style={{ color: '#ef4444' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {likesCount}
              </span>
            </div>
            <button
              onClick={() => handleLikesChange(1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommentsChange(-1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Minus size={14} />
            </button>
            <div className="flex items-center gap-1 min-w-[50px] justify-center">
              <MessageCircle size={16} style={{ color: 'var(--primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {commentsCount}
              </span>
            </div>
            <button
              onClick={() => handleCommentsChange(1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <button
          onClick={handleToggleDone}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            isDone ? 'ring-2 ring-[var(--success)]' : ''
          }`}
          style={{
            backgroundColor: isDone ? 'var(--success)' : 'var(--border)',
            color: isDone ? '#000' : 'var(--text-secondary)',
          }}
        >
          <Check size={18} />
        </button>
      </div>
    </div>
  );
}
