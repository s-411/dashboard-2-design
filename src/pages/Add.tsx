import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Loader2, FolderOpen, ChevronDown, Check } from 'lucide-react';
import { useCreators } from '../hooks/useCreators';
import { useFolderContext } from '../hooks/useFolderContext';
import type { Platform } from '../types';
import PlatformBadge from '../components/PlatformBadge';

interface ParsedUrl {
  platform: Platform | null;
  username: string | null;
  url: string;
}

function parseProfileUrl(url: string): ParsedUrl {
  const trimmedUrl = url.trim();

  const patterns: { platform: Platform; regex: RegExp }[] = [
    {
      platform: 'instagram',
      regex: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?/,
    },
    {
      platform: 'youtube',
      regex: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([a-zA-Z0-9._-]+)\/?/,
    },
    {
      platform: 'youtube',
      regex: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:c\/|channel\/|user\/)?([a-zA-Z0-9._-]+)\/?/,
    },
    {
      platform: 'x',
      regex: /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/?/,
    },
    {
      platform: 'tiktok',
      regex: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([a-zA-Z0-9._]+)\/?/,
    },
  ];

  for (const { platform, regex } of patterns) {
    const match = trimmedUrl.match(regex);
    if (match && match[1]) {
      let cleanUrl = trimmedUrl;
      if (!cleanUrl.startsWith('http')) {
        cleanUrl = 'https://' + cleanUrl;
      }
      return {
        platform,
        username: match[1],
        url: cleanUrl,
      };
    }
  }

  return { platform: null, username: null, url: trimmedUrl };
}

export default function Add() {
  const navigate = useNavigate();
  const { addCreator } = useCreators();
  const { folders, selectedFolderId } = useFolderContext();
  const [url, setUrl] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(selectedFolderId);
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parsed = parseProfileUrl(url);
  const currentFolder = folders.find((f) => f.id === selectedFolder);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!parsed.platform || !parsed.username) {
      setError('Please enter a valid Instagram, YouTube, X, or TikTok profile URL');
      return;
    }

    setError('');
    setLoading(true);

    const result = await addCreator(parsed.platform, parsed.username, parsed.url, selectedFolder);

    if (result) {
      navigate('/');
    } else {
      setError('Failed to add creator. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Add Creator
        </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Profile URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Instagram, YouTube, X, or TikTok URL"
            className="w-full px-4 py-3 rounded-lg outline-none transition-colors"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
          {error && (
            <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
              {error}
            </p>
          )}
        </div>

        {/* Folder Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Folder (optional)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFolderMenuOpen(!folderMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <div className="flex items-center gap-2">
                <FolderOpen size={18} style={{ color: currentFolder?.color || 'var(--text-secondary)' }} />
                <span>{currentFolder?.name || 'No folder'}</span>
              </div>
              <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
            </button>

            {folderMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setFolderMenuOpen(false)} />
                <div
                  className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg shadow-lg py-1 max-h-[200px] overflow-y-auto"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFolder(null);
                      setFolderMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:opacity-70 transition-opacity ${
                      !selectedFolder ? 'font-medium' : ''
                    }`}
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <FolderOpen size={16} style={{ color: 'var(--text-secondary)' }} />
                    No folder
                    {!selectedFolder && (
                      <Check size={16} className="ml-auto" style={{ color: 'var(--success)' }} />
                    )}
                  </button>
                  {folders.map((folder) => (
                    <button
                      type="button"
                      key={folder.id}
                      onClick={() => {
                        setSelectedFolder(folder.id);
                        setFolderMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:opacity-70 transition-opacity ${
                        selectedFolder === folder.id ? 'font-medium' : ''
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <FolderOpen size={16} style={{ color: folder.color || 'var(--text-secondary)' }} />
                      <span className="truncate">{folder.name}</span>
                      {selectedFolder === folder.id && (
                        <Check size={16} className="ml-auto flex-shrink-0" style={{ color: 'var(--success)' }} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {parsed.username && parsed.platform && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              Preview
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--border)' }}
              >
                <User size={24} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  @{parsed.username}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <PlatformBadge platform={parsed.platform} size="sm" />
                  <span className="text-sm capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {parsed.platform === 'x' ? 'X (Twitter)' : parsed.platform}
                  </span>
                </div>
              </div>
            </div>
            {currentFolder && (
              <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <FolderOpen size={14} style={{ color: currentFolder.color || 'var(--text-secondary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Will be added to: {currentFolder.name}
                </span>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !parsed.username || !parsed.platform}
          className="w-full py-3 px-4 rounded-lg font-medium transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--primary)', color: '#000' }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Adding...
            </>
          ) : (
            'Add to Dream 100'
          )}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          Supported formats:
        </p>
        <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
          <li>instagram.com/username</li>
          <li>youtube.com/@username</li>
          <li>x.com/username or twitter.com/username</li>
          <li>tiktok.com/@username</li>
        </ul>
      </div>
    </div>
  );
}
