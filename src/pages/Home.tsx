import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCreators } from '../hooks/useCreators';
import { useFolderContext } from '../hooks/useFolderContext';
import type { CreatorWithEngagement, CreatorStatus, Platform } from '../types';

// Mock data for demo - in production this would come from the database
function getMockData(creator: CreatorWithEngagement): {
  followers: number;
  growth: number;
  engagement: number;
  status: CreatorStatus;
  lastPost: string;
} {
  // Generate consistent mock data based on creator id
  const hash = creator.id.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  const followers = Math.abs(hash % 3000000) + 100000;
  const growth = ((hash % 200) - 50) / 10;
  const engagement = (Math.abs(hash % 100) / 10) + 1;
  const statuses: CreatorStatus[] = ['prospect', 'negotiating', 'partnered', 'dormant'];
  const status = statuses[Math.abs(hash) % 4];
  const postTimes = ['2h ago', '4h ago', '1d ago', '2d ago', '5d ago', '1w ago', '2w ago'];
  const lastPost = postTimes[Math.abs(hash) % 7];

  return { followers, growth, engagement, status, lastPost };
}

function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + 'K';
  }
  return count.toString();
}

function getPlatformBadge(platform: Platform) {
  const configs: Record<Platform, { icon: string; label: string; bgClass: string; textClass: string }> = {
    instagram: {
      icon: 'camera_alt',
      label: 'Instagram',
      bgClass: 'bg-pink-100',
      textClass: 'text-pink-600',
    },
    youtube: {
      icon: 'play_circle',
      label: 'YouTube',
      bgClass: 'bg-red-100',
      textClass: 'text-red-600',
    },
    tiktok: {
      icon: 'music_note',
      label: 'TikTok',
      bgClass: 'bg-gray-100',
      textClass: 'text-gray-900',
    },
    x: {
      icon: 'tag',
      label: 'X',
      bgClass: 'bg-gray-100',
      textClass: 'text-gray-900',
    },
  };
  return configs[platform];
}

function getStatusBadge(status: CreatorStatus) {
  const configs: Record<CreatorStatus, { label: string; bgClass: string; textClass: string }> = {
    prospect: {
      label: 'PROSPECT',
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-600',
    },
    negotiating: {
      label: 'NEGOTIATING',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-600',
    },
    partnered: {
      label: 'PARTNERED',
      bgClass: 'bg-green-100',
      textClass: 'text-green-600',
    },
    dormant: {
      label: 'DORMANT',
      bgClass: 'bg-gray-100',
      textClass: 'text-gray-500',
    },
  };
  return configs[status];
}

export default function Home() {
  const { creators, loading } = useCreators();
  const { selectedFolderId, folders } = useFolderContext();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  // Filter and search creators
  const filteredCreators = useMemo(() => {
    let result = selectedFolderId
      ? creators.filter((creator) => creator.folder_id === selectedFolderId)
      : creators;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.username.toLowerCase().includes(query) ||
          (c.display_name && c.display_name.toLowerCase().includes(query))
      );
    }

    return result;
  }, [creators, selectedFolderId, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredCreators.length / pageSize);
  const paginatedCreators = filteredCreators.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedCreators.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedCreators.map((c) => c.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const allSelected = paginatedCreators.length > 0 && selectedIds.size === paginatedCreators.length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="h-16 flex items-center justify-between px-8 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Performance Overview
          </h1>
          <div className="h-6 w-px" style={{ backgroundColor: 'var(--border)' }} />
          <nav className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span
              className="px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: 'rgba(0, 155, 240, 0.1)', color: 'var(--primary)' }}
            >
              Global
            </span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span>{selectedFolder?.name || 'All Creators'}</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span
              className="absolute inset-y-0 left-3 flex items-center"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="material-symbols-outlined text-lg">search</span>
            </span>
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-1.5 w-64 rounded-lg text-sm outline-none transition-all"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <Link
            to="/add"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              boxShadow: '0 4px 14px -3px rgba(0, 155, 240, 0.4)',
            }}
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Add Creator
          </Link>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className="px-8 py-4 flex items-center justify-between shrink-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div
            className="flex p-1 rounded-lg"
            style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
          >
            <button
              className="p-1.5 rounded-md shadow-sm"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--primary)' }}
            >
              <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
            </button>
            <button
              className="p-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
          </div>

          <div className="h-6 w-px mx-2" style={{ backgroundColor: 'var(--border)' }} />

          {/* Filters */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: 'var(--text-muted)' }}>
              filter_alt
            </span>
            Filters
            <span
              className="w-4 h-4 flex items-center justify-center rounded-full text-[10px]"
              style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
            >
              2
            </span>
          </button>

          {/* Sort */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: 'var(--text-muted)' }}>
              sort
            </span>
            Sort
          </button>

          {/* Columns */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
            style={{
              border: '1px dashed var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            <span className="material-symbols-outlined text-lg">view_column</span>
            Columns
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Team avatars */}
          <div className="flex -space-x-2 mr-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: '#e5e7eb', border: '2px solid var(--surface)' }}
            >
              JD
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: '#d1d5db', border: '2px solid var(--surface)' }}
            >
              AS
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary)', border: '2px solid var(--surface)', color: '#fff' }}
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </div>
          </div>

          {/* Export */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div
          className="mx-8 mt-4 flex items-center justify-between p-3 rounded-xl shadow-2xl"
          style={{ backgroundColor: '#111827', color: '#fff' }}
        >
          <div className="flex items-center gap-4 px-2">
            <span className="text-sm font-semibold">{selectedIds.size} creators selected</span>
            <div className="h-4 w-px" style={{ backgroundColor: '#374151' }} />
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined text-sm">label</span>
                Add Tag
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined text-sm">drive_file_move</span>
                Move to Folder
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined text-sm">mail</span>
                Campaign Invite
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-medium rounded-lg" style={{ color: '#f87171' }}>
              Delete
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary)' }} />
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: 'var(--text-secondary)' }}>
              {searchQuery
                ? 'No creators found matching your search.'
                : selectedFolderId
                ? 'No creators in this folder yet.'
                : 'No creators yet. Add your first one!'}
            </p>
            {!searchQuery && filteredCreators.length === 0 && (
              <Link
                to="/add"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add Creator
              </Link>
            )}
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden shadow-sm"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="rounded"
                      style={{ accentColor: 'var(--primary)' }}
                    />
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Creator
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Platform
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-right"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Followers
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-right"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Growth (30d)
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-right"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Avg. Engagement
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Status
                  </th>
                  <th
                    className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-right"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Last Post
                  </th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedCreators.map((creator) => {
                  const mockData = getMockData(creator);
                  const platformBadge = getPlatformBadge(creator.platform);
                  const statusBadge = getStatusBadge(mockData.status);
                  const isSelected = selectedIds.has(creator.id);

                  return (
                    <tr
                      key={creator.id}
                      className="group transition-colors hover:bg-gray-50"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(creator.id)}
                          className="rounded"
                          style={{ accentColor: 'var(--primary)' }}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                            style={{ border: '1px solid var(--border)' }}
                          >
                            {creator.profile_pic_url ? (
                              <img
                                src={creator.profile_pic_url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center font-bold"
                                style={{ backgroundColor: 'var(--background)', color: 'var(--text-muted)' }}
                              >
                                {(creator.display_name || creator.username).charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {creator.display_name || creator.username}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              @{creator.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`flex items-center gap-1.5 px-2 py-0.5 w-fit rounded-full text-[10px] font-bold uppercase tracking-wide ${platformBadge.bgClass} ${platformBadge.textClass}`}
                        >
                          <span className="material-symbols-outlined text-xs leading-none">
                            {platformBadge.icon}
                          </span>
                          {platformBadge.label}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                          {formatFollowers(mockData.followers)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className="text-xs font-semibold flex items-center justify-end gap-0.5"
                          style={{ color: mockData.growth >= 0 ? '#10b981' : '#ef4444' }}
                        >
                          <span className="material-symbols-outlined text-sm leading-none">
                            {mockData.growth >= 0 ? 'trending_up' : 'trending_down'}
                          </span>
                          {mockData.growth >= 0 ? '+' : ''}{mockData.growth.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div
                          className="w-full h-1.5 rounded-full mt-1 max-w-[80px] ml-auto"
                          style={{ backgroundColor: 'var(--background)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: 'var(--primary)',
                              width: `${Math.min(mockData.engagement * 10, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                          {mockData.engagement.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-md text-[10px] font-bold ${statusBadge.bgClass} ${statusBadge.textClass}`}
                        >
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {mockData.lastPost}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <span className="material-symbols-outlined text-lg leading-none">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredCreators.length > 0 && (
          <div className="mt-6 flex items-center justify-between px-2">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Showing{' '}
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredCreators.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {filteredCreators.length}
              </span>{' '}
              creators
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors disabled:opacity-30"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors"
                    style={{
                      backgroundColor: currentPage === pageNum ? 'var(--primary)' : 'transparent',
                      color: currentPage === pageNum ? '#fff' : 'var(--text-secondary)',
                      border: currentPage === pageNum ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors disabled:opacity-30"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
