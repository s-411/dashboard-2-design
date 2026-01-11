import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Folder } from '../types';
import { useAuth } from './useAuth';

export function useFolders() {
  const { user } = useAuth();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;
      setFolders(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch folders');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const createFolder = async (name: string, color?: string): Promise<Folder | null> => {
    if (!user) return null;

    try {
      const maxOrder = folders.reduce((max, f) => Math.max(max, f.sort_order), 0);

      const { data, error } = await supabase
        .from('folders')
        .insert({
          user_id: user.id,
          name,
          color: color || null,
          sort_order: maxOrder + 1,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchFolders();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create folder');
      return null;
    }
  };

  const renameFolder = async (folderId: string, newName: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('folders')
        .update({ name: newName })
        .eq('id', folderId);

      if (error) throw error;
      await fetchFolders();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename folder');
      return false;
    }
  };

  const deleteFolder = async (folderId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // First, unassign all creators from this folder
      await supabase
        .from('creators')
        .update({ folder_id: null })
        .eq('folder_id', folderId)
        .eq('user_id', user.id);

      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId);

      if (error) throw error;
      await fetchFolders();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete folder');
      return false;
    }
  };

  const updateFolderColor = async (folderId: string, color: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('folders')
        .update({ color })
        .eq('id', folderId);

      if (error) throw error;
      await fetchFolders();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update folder color');
      return false;
    }
  };

  return {
    folders,
    loading,
    error,
    createFolder,
    renameFolder,
    deleteFolder,
    updateFolderColor,
    refetch: fetchFolders,
  };
}
