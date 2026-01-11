import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Creator, EngagementLog } from '../types';

export interface DayEngagement {
  date: string;
  totalLikes: number;
  totalComments: number;
  completedCount: number;
  logs: (EngagementLog & { creator?: Creator })[];
}

export interface MonthEngagement {
  [date: string]: DayEngagement;
}

export function useEngagementHistory(year: number, month: number) {
  const { user } = useAuth();
  const [engagement, setEngagement] = useState<MonthEngagement>({});
  const [creators, setCreators] = useState<Map<string, Creator>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Calculate start and end dates for the month
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

      // Fetch all engagement logs for the month
      const { data: logsData, error: logsError } = await supabase
        .from('engagement_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (logsError) throw logsError;

      // Fetch all creators for reference
      const { data: creatorsData, error: creatorsError } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id);

      if (creatorsError) throw creatorsError;

      // Build creators map
      const creatorsMap = new Map<string, Creator>();
      creatorsData?.forEach((creator) => {
        creatorsMap.set(creator.id, creator);
      });
      setCreators(creatorsMap);

      // Group logs by date
      const engagementByDate: MonthEngagement = {};
      logsData?.forEach((log) => {
        if (!engagementByDate[log.date]) {
          engagementByDate[log.date] = {
            date: log.date,
            totalLikes: 0,
            totalComments: 0,
            completedCount: 0,
            logs: [],
          };
        }

        engagementByDate[log.date].totalLikes += log.likes_count || 0;
        engagementByDate[log.date].totalComments += log.comments_count || 0;
        if (log.is_done) {
          engagementByDate[log.date].completedCount++;
        }
        engagementByDate[log.date].logs.push({
          ...log,
          creator: creatorsMap.get(log.creator_id),
        });
      });

      setEngagement(engagementByDate);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch engagement history');
    } finally {
      setLoading(false);
    }
  }, [user, year, month]);

  useEffect(() => {
    fetchMonthData();
  }, [fetchMonthData]);

  return {
    engagement,
    creators,
    loading,
    error,
    refetch: fetchMonthData,
  };
}
