import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Creator, EngagementLog, CreatorWithEngagement, Platform, UserSettings } from '../types';
import { useAuth } from './useAuth';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function useCreators() {
  const { user } = useAuth();
  const [creators, setCreators] = useState<CreatorWithEngagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const today = getTodayDate();

      const { data: creatorsData, error: creatorsError } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (creatorsError) throw creatorsError;

      const { data: engagementData, error: engagementError } = await supabase
        .from('engagement_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today);

      if (engagementError) throw engagementError;

      const engagementMap = new Map<string, EngagementLog>();
      engagementData?.forEach((log) => {
        engagementMap.set(log.creator_id, log);
      });

      const creatorsWithEngagement: CreatorWithEngagement[] = (creatorsData || []).map(
        (creator) => ({
          ...creator,
          engagement: engagementMap.get(creator.id) || null,
        })
      );

      setCreators(creatorsWithEngagement);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch creators');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCreators();
  }, [fetchCreators]);

  const addCreator = async (
    platform: Platform,
    username: string,
    profileUrl: string,
    folderId?: string | null
  ): Promise<Creator | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('creators')
        .insert({
          user_id: user.id,
          platform,
          username,
          display_name: username,
          profile_url: profileUrl,
          folder_id: folderId || null,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchCreators();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add creator');
      return null;
    }
  };

  const updateCreatorFolder = async (creatorId: string, folderId: string | null): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('creators')
        .update({ folder_id: folderId })
        .eq('id', creatorId);

      if (error) throw error;
      await fetchCreators();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update creator folder');
      return false;
    }
  };

  const updateEngagement = async (
    creatorId: string,
    updates: { likes_count?: number; comments_count?: number; is_done?: boolean }
  ) => {
    if (!user) return;

    const today = getTodayDate();
    const existingLog = creators.find((c) => c.id === creatorId)?.engagement;

    try {
      if (existingLog) {
        const { error } = await supabase
          .from('engagement_logs')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', existingLog.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('engagement_logs').insert({
          creator_id: creatorId,
          user_id: user.id,
          date: today,
          likes_count: updates.likes_count ?? 0,
          comments_count: updates.comments_count ?? 0,
          is_done: updates.is_done ?? false,
        });

        if (error) throw error;
      }

      await fetchCreators();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update engagement');
    }
  };

  const deleteCreator = async (creatorId: string) => {
    try {
      const { error } = await supabase.from('creators').delete().eq('id', creatorId);

      if (error) throw error;
      await fetchCreators();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete creator');
    }
  };

  const deleteAllCreators = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from('creators').delete().eq('user_id', user.id);

      if (error) throw error;
      await fetchCreators();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete all creators');
    }
  };

  const resetTodayProgress = async () => {
    if (!user) return;

    const today = getTodayDate();
    try {
      const { error } = await supabase
        .from('engagement_logs')
        .delete()
        .eq('user_id', user.id)
        .eq('date', today);

      if (error) throw error;
      await fetchCreators();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset progress');
    }
  };

  return {
    creators,
    loading,
    error,
    addCreator,
    updateCreatorFolder,
    updateEngagement,
    deleteCreator,
    deleteAllCreators,
    resetTodayProgress,
    refetch: fetchCreators,
  };
}

export function useStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    todayCompleted: 0,
    todayTotal: 0,
    currentStreak: 0,
    weekActivity: [] as boolean[],
    topCreators: [] as { creator: Creator; totalEngagement: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const today = getTodayDate();

        // Fetch creators count
        const { data: creatorsData } = await supabase
          .from('creators')
          .select('id')
          .eq('user_id', user.id);

        const totalCreators = creatorsData?.length || 0;

        // Fetch today's engagement
        const { data: todayLogs } = await supabase
          .from('engagement_logs')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today);

        const completedToday = todayLogs?.filter((log) => log.is_done).length || 0;

        // Fetch last 7 days for streak and week activity
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        const startDate = sevenDaysAgo.toISOString().split('T')[0];

        const { data: weekLogs } = await supabase
          .from('engagement_logs')
          .select('date, is_done')
          .eq('user_id', user.id)
          .gte('date', startDate)
          .lte('date', today);

        // Calculate week activity
        const activityByDate = new Map<string, boolean>();
        weekLogs?.forEach((log) => {
          if (log.is_done) {
            activityByDate.set(log.date, true);
          }
        });

        const weekActivity: boolean[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          weekActivity.push(activityByDate.has(dateStr));
        }

        // Calculate streak
        let streak = 0;
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];

          const { data: dayLogs } = await supabase
            .from('engagement_logs')
            .select('is_done')
            .eq('user_id', user.id)
            .eq('date', dateStr)
            .eq('is_done', true);

          if (dayLogs && dayLogs.length > 0) {
            streak++;
          } else if (i > 0) {
            break;
          }
        }

        // Fetch top creators by engagement
        const { data: allLogs } = await supabase
          .from('engagement_logs')
          .select('creator_id, likes_count, comments_count')
          .eq('user_id', user.id);

        const { data: allCreators } = await supabase
          .from('creators')
          .select('*')
          .eq('user_id', user.id);

        const engagementByCreator = new Map<string, number>();
        allLogs?.forEach((log) => {
          const current = engagementByCreator.get(log.creator_id) || 0;
          engagementByCreator.set(
            log.creator_id,
            current + (log.likes_count || 0) + (log.comments_count || 0)
          );
        });

        const topCreators = (allCreators || [])
          .map((creator) => ({
            creator,
            totalEngagement: engagementByCreator.get(creator.id) || 0,
          }))
          .sort((a, b) => b.totalEngagement - a.totalEngagement)
          .slice(0, 3);

        setStats({
          todayCompleted: completedToday,
          todayTotal: totalCreators,
          currentStreak: streak,
          weekActivity,
          topCreators,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, loading };
}

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setSettings(data);
          applyDarkMode(data.dark_mode);
        } else {
          // Create default settings
          const { data: newSettings } = await supabase
            .from('user_settings')
            .insert({
              user_id: user.id,
              dark_mode: true,
              notifications_enabled: false,
            })
            .select()
            .single();

          if (newSettings) {
            setSettings(newSettings);
            applyDarkMode(true);
          }
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user || !settings) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setSettings(data);
        if (updates.dark_mode !== undefined) {
          applyDarkMode(updates.dark_mode);
        }
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  return { settings, loading, updateSettings };
}
