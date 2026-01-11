import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useFolders } from './useFolders';
import type { Folder } from '../types';

interface FolderContextType {
  folders: Folder[];
  loading: boolean;
  error: string | null;
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string | null) => void;
  createFolder: (name: string, color?: string) => Promise<Folder | null>;
  renameFolder: (folderId: string, newName: string) => Promise<boolean>;
  deleteFolder: (folderId: string) => Promise<boolean>;
  updateFolderColor: (folderId: string, color: string) => Promise<boolean>;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  refetchFolders: () => void;
}

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const {
    folders,
    loading,
    error,
    createFolder,
    renameFolder,
    deleteFolder,
    updateFolderColor,
    refetch,
  } = useFolders();

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  return (
    <FolderContext.Provider
      value={{
        folders,
        loading,
        error,
        selectedFolderId,
        setSelectedFolderId,
        createFolder,
        renameFolder,
        deleteFolder,
        updateFolderColor,
        sidebarCollapsed,
        setSidebarCollapsed,
        refetchFolders: refetch,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolderContext() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderContext must be used within a FolderProvider');
  }
  return context;
}
