export type Platform = 'instagram' | 'youtube' | 'x' | 'tiktok';

export type CreatorStatus = 'prospect' | 'negotiating' | 'partnered' | 'dormant';

export interface Profile {
  id: string;
  email: string;
  subscription_status: string | null;
  created_at: string;
}

export interface Creator {
  id: string;
  user_id: string;
  folder_id: string | null;
  platform: Platform;
  username: string;
  display_name: string | null;
  profile_pic_url: string | null;
  profile_url: string | null;
  notes: string | null;
  created_at: string;
  // New fields for performance dashboard
  followers?: number | null;
  growth_30d?: number | null;
  avg_engagement?: number | null;
  status?: CreatorStatus | null;
  last_post?: string | null;
}

export interface EngagementLog {
  id: string;
  creator_id: string;
  user_id: string;
  date: string;
  likes_count: number;
  comments_count: number;
  is_done: boolean;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  sort_order: number;
  created_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  dark_mode: boolean;
  notifications_enabled: boolean;
  reminder_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatorWithEngagement extends Creator {
  engagement?: EngagementLog | null;
}
