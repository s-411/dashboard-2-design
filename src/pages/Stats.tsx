import { Flame, Loader2 } from 'lucide-react';
import { useStats } from '../hooks/useCreators';
import ProgressRing from '../components/ProgressRing';
import PlatformBadge from '../components/PlatformBadge';

export default function Stats() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  const progress = stats.todayTotal > 0 ? (stats.todayCompleted / stats.todayTotal) * 100 : 0;

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  const weekDays = [];
  for (let i = 6; i >= 0; i--) {
    const dayIndex = (today - i + 7) % 7;
    weekDays.push({ label: dayLabels[dayIndex], active: stats.weekActivity[6 - i] });
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Stats
        </h1>
      </header>

      <div
        className="rounded-xl p-6 mb-4 flex flex-col items-center"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Today's Progress
        </p>
        <ProgressRing progress={progress} size={140} strokeWidth={10} />
        <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {stats.todayCompleted}
          </span>{' '}
          of{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {stats.todayTotal}
          </span>{' '}
          creators engaged
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame size={20} style={{ color: '#f97316' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Current Streak
            </p>
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {stats.currentStreak}
            <span className="text-base font-normal ml-1" style={{ color: 'var(--text-secondary)' }}>
              {stats.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </p>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            This Week
          </p>
          <div className="flex justify-between gap-1">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: day.active ? 'var(--success)' : 'var(--border)',
                  }}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Most Engaged
        </h2>
        {stats.topCreators.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No engagement data yet. Start engaging with creators!
          </p>
        ) : (
          <div className="space-y-3">
            {stats.topCreators.map(({ creator, totalEngagement }, index) => (
              <div key={creator.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor:
                      index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : '#cd7f32',
                    color: '#000',
                  }}
                >
                  {index + 1}
                </div>
                {creator.profile_pic_url ? (
                  <img
                    src={creator.profile_pic_url}
                    alt={creator.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
                  >
                    {(creator.display_name || creator.username).charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {creator.display_name || creator.username}
                  </p>
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={creator.platform} size="sm" />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {totalEngagement} engagements
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
