import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, X } from 'lucide-react';
import { useEngagementHistory } from '../hooks/useEngagementHistory';
import type { DayEngagement } from '../hooks/useEngagementHistory';
import PlatformBadge from '../components/PlatformBadge';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<DayEngagement | null>(null);

  const { engagement, loading } = useEngagementHistory(currentYear, currentMonth);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(null);
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push({ day, isCurrentMonth: false, dateStr });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push({ day, isCurrentMonth: true, dateStr });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push({ day, isCurrentMonth: false, dateStr });
  }

  const isToday = (dateStr: string) => {
    return dateStr === today.toISOString().split('T')[0];
  };

  const handleDayClick = (dateStr: string, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const dayData = engagement[dateStr];
    if (dayData) {
      setSelectedDay(dayData);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          Calendar
        </h1>
        <button
          onClick={goToToday}
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          Today
        </button>
      </header>

      {/* Month Navigation */}
      <div
        className="flex items-center justify-between p-3 rounded-lg mb-4"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <button
          onClick={goToPreviousMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Day Headers */}
        <div className="grid grid-cols-7" style={{ borderBottom: '1px solid var(--border)' }}>
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-6 h-6 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map(({ day, isCurrentMonth, dateStr }, index) => {
              const dayData = engagement[dateStr];
              const hasEngagement = dayData && dayData.completedCount > 0;
              const totalEngagement = dayData ? dayData.totalLikes + dayData.totalComments : 0;

              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(dateStr, isCurrentMonth)}
                  disabled={!isCurrentMonth || !hasEngagement}
                  className={`relative aspect-square flex flex-col items-center justify-center transition-opacity ${
                    isCurrentMonth ? '' : 'opacity-30'
                  } ${hasEngagement && isCurrentMonth ? 'cursor-pointer hover:opacity-70' : 'cursor-default'}`}
                  style={{
                    borderRight: (index + 1) % 7 !== 0 ? '1px solid var(--border)' : undefined,
                    borderBottom: index < 35 ? '1px solid var(--border)' : undefined,
                  }}
                >
                  <span
                    className={`text-sm font-medium ${isToday(dateStr) ? 'w-7 h-7 rounded-full flex items-center justify-center' : ''}`}
                    style={{
                      color: isCurrentMonth ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: isToday(dateStr) ? 'var(--primary)' : 'transparent',
                      ...(isToday(dateStr) ? { color: '#000' } : {}),
                    }}
                  >
                    {day}
                  </span>

                  {/* Engagement indicator */}
                  {hasEngagement && isCurrentMonth && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--success)' }}
                      />
                      {totalEngagement > 0 && (
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                          {totalEngagement}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Engaged
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium"
            style={{ backgroundColor: 'var(--primary)', color: '#000' }}
          >
            {today.getDate()}
          </div>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Today
          </span>
        </div>
      </div>

      {/* Day Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedDay(null)}
          />
          <div
            className="relative rounded-xl p-5 max-w-sm w-full shadow-xl max-h-[80vh] flex flex-col"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {new Date(selectedDay.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Summary */}
            <div
              className="flex items-center justify-around py-3 rounded-lg mb-4"
              style={{ backgroundColor: 'var(--background)' }}
            >
              <div className="flex items-center gap-2">
                <Heart size={16} style={{ color: '#ef4444' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {selectedDay.totalLikes}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} style={{ color: 'var(--primary)' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {selectedDay.totalComments}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Creators:
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {selectedDay.completedCount}
                </span>
              </div>
            </div>

            {/* Creators List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {selectedDay.logs
                .filter((log) => log.is_done)
                .map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--background)' }}
                  >
                    <div className="relative flex-shrink-0">
                      {log.creator?.profile_pic_url ? (
                        <img
                          src={log.creator.profile_pic_url}
                          alt={log.creator.display_name || log.creator.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                          style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
                        >
                          {(log.creator?.display_name || log.creator?.username || '?').charAt(0).toUpperCase()}
                        </div>
                      )}
                      {log.creator && (
                        <div className="absolute -bottom-1 -right-1">
                          <PlatformBadge platform={log.creator.platform} size="sm" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {log.creator?.display_name || log.creator?.username || 'Unknown'}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Heart size={12} style={{ color: '#ef4444' }} />
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {log.likes_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={12} style={{ color: 'var(--primary)' }} />
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {log.comments_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
