import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, Trash2, RotateCcw, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings, useCreators } from '../hooks/useCreators';

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { settings, loading: settingsLoading, updateSettings } = useSettings();
  const { resetTodayProgress, deleteAllCreators } = useCreators();

  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleToggleDarkMode = async () => {
    if (settings) {
      await updateSettings({ dark_mode: !settings.dark_mode });
    }
  };

  const handleResetProgress = async () => {
    setActionLoading(true);
    await resetTodayProgress();
    setActionLoading(false);
    setShowResetModal(false);
  };

  const handleDeleteAllCreators = async () => {
    setActionLoading(true);
    await deleteAllCreators();
    setActionLoading(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h1>
      </header>

      <div className="space-y-4">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
            Appearance
          </h2>
          <button
            onClick={handleToggleDarkMode}
            disabled={settingsLoading}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              {settings?.dark_mode ? (
                <Moon size={20} style={{ color: 'var(--primary)' }} />
              ) : (
                <Sun size={20} style={{ color: '#fbbf24' }} />
              )}
              <span style={{ color: 'var(--text-primary)' }}>
                {settings?.dark_mode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div
              className="w-12 h-7 rounded-full p-1 transition-colors"
              style={{
                backgroundColor: settings?.dark_mode ? 'var(--primary)' : 'var(--border)',
              }}
            >
              <div
                className="w-5 h-5 rounded-full transition-transform"
                style={{
                  backgroundColor: '#fff',
                  transform: settings?.dark_mode ? 'translateX(20px)' : 'translateX(0)',
                }}
              />
            </div>
          </button>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
            Account
          </h2>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 py-2"
          >
            <LogOut size={20} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Sign Out</span>
          </button>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
        >
          <h2 className="text-sm font-medium mb-4" style={{ color: '#ef4444' }}>
            Danger Zone
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => setShowResetModal(true)}
              className="w-full flex items-center gap-3 py-2"
            >
              <RotateCcw size={20} style={{ color: '#f97316' }} />
              <span style={{ color: 'var(--text-primary)' }}>Reset Today's Progress</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center gap-3 py-2"
            >
              <Trash2 size={20} style={{ color: '#ef4444' }} />
              <span style={{ color: 'var(--text-primary)' }}>Delete All Creators</span>
            </button>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Dream 100 Web v1.0.0
          </p>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} style={{ color: '#f97316' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Reset Progress?
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              This will reset all engagement for today. Your creators will still be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium"
                style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                disabled={actionLoading}
                className="flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: '#f97316', color: '#fff' }}
              >
                {actionLoading ? <Loader2 size={18} className="animate-spin" /> : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} style={{ color: '#ef4444' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Delete All Creators?
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              This will permanently delete all your creators and their engagement history. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium"
                style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllCreators}
                disabled={actionLoading}
                className="flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: '#ef4444', color: '#fff' }}
              >
                {actionLoading ? <Loader2 size={18} className="animate-spin" /> : 'Delete All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
