import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { useCreators } from '../hooks/useCreators';
import CreatorCard from '../components/CreatorCard';

type FilterType = 'todo' | 'all';

export default function Home() {
  const { creators, loading, updateEngagement } = useCreators();
  const [filter, setFilter] = useState<FilterType>('todo');

  const filteredCreators = creators.filter((creator) => {
    if (filter === 'todo') {
      return !creator.engagement?.is_done;
    }
    return true;
  });

  const todoCount = creators.filter((c) => !c.engagement?.is_done).length;
  const doneCount = creators.filter((c) => c.engagement?.is_done).length;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          Dream 100
        </h1>
        <Link
          to="/add"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--primary)', color: '#000' }}
        >
          <Plus size={24} />
        </Link>
      </header>

      <div
        className="flex rounded-lg p-1 mb-6"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <button
          onClick={() => setFilter('todo')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors`}
          style={{
            backgroundColor: filter === 'todo' ? 'var(--primary)' : 'transparent',
            color: filter === 'todo' ? '#000' : 'var(--text-secondary)',
          }}
        >
          To Do ({todoCount})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors`}
          style={{
            backgroundColor: filter === 'all' ? 'var(--primary)' : 'transparent',
            color: filter === 'all' ? '#000' : 'var(--text-secondary)',
          }}
        >
          All ({creators.length})
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : filteredCreators.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: 'var(--text-secondary)' }}>
            {filter === 'todo' && creators.length > 0
              ? `All done! ${doneCount} creator${doneCount !== 1 ? 's' : ''} engaged today.`
              : 'No creators yet. Add your first one!'}
          </p>
          {creators.length === 0 && (
            <Link
              to="/add"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--primary)', color: '#000' }}
            >
              <Plus size={18} />
              Add Creator
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onUpdateEngagement={updateEngagement}
            />
          ))}
        </div>
      )}
    </div>
  );
}
