import { useState } from 'react';

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: 'installed' | 'available';
  connected?: boolean;
}

export default function Apps() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [filter, setFilter] = useState<'all' | 'installed' | 'available'>('all');

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const folders = [
    { id: '1', name: 'Tech Influencers', count: 12 },
    { id: '2', name: 'Fitness Creators', count: 8 },
    { id: '3', name: 'Business Leaders', count: 15 },
    { id: '4', name: 'Lifestyle Bloggers', count: 6 },
  ];

  const apps: App[] = [
    { id: '1', name: 'Slack', description: 'Team communication and collaboration', icon: 'chat', category: 'Communication', status: 'installed', connected: true },
    { id: '2', name: 'Google Drive', description: 'Cloud storage and file sharing', icon: 'cloud', category: 'Storage', status: 'installed', connected: true },
    { id: '3', name: 'Notion', description: 'All-in-one workspace for notes and docs', icon: 'description', category: 'Productivity', status: 'installed', connected: false },
    { id: '4', name: 'Zapier', description: 'Automate workflows between apps', icon: 'bolt', category: 'Automation', status: 'available' },
    { id: '5', name: 'Figma', description: 'Collaborative design tool', icon: 'design_services', category: 'Design', status: 'available' },
    { id: '6', name: 'GitHub', description: 'Code hosting and version control', icon: 'code', category: 'Development', status: 'available' },
    { id: '7', name: 'Salesforce', description: 'Customer relationship management', icon: 'business', category: 'CRM', status: 'available' },
    { id: '8', name: 'HubSpot', description: 'Marketing and sales platform', icon: 'hub', category: 'Marketing', status: 'installed', connected: true },
  ];

  const filteredApps = apps.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const categories = [...new Set(apps.map(app => app.category))];

  return (
    <div className="dashboard-page bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans antialiased transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-surface-dark flex flex-col py-8 z-20 shrink-0 shadow-2xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="flex items-center justify-between px-4 mb-8">
            <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center border border-neutral-700 text-white shrink-0">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            {sidebarOpen && <span className="text-white font-medium text-lg ml-3">Dream 100</span>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-white hover:bg-neutral-700 transition ml-auto">
              <span className="material-symbols-outlined text-sm">{sidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-2 w-full px-3">
            <a className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`} href="/dashboard">
              <span className="material-symbols-outlined">speed</span>
              {sidebarOpen && <span className="font-medium">Performance</span>}
            </a>
            <a className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`} href="#">
              <span className="material-symbols-outlined">campaign</span>
              {sidebarOpen && <span className="font-medium">Campaigns</span>}
            </a>
            <a className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`} href="#">
              <span className="material-symbols-outlined">analytics</span>
              {sidebarOpen && <span className="font-medium">Analytics</span>}
            </a>
            <a className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`} href="#">
              <span className="material-symbols-outlined">settings</span>
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </a>

            <div className="mt-6">
              <button onClick={() => setCollectionsOpen(!collectionsOpen)} className={`flex items-center gap-3 text-white/60 hover:text-white w-full rounded-xl transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`}>
                <span className="material-symbols-outlined text-sm">{collectionsOpen ? 'expand_more' : 'chevron_right'}</span>
                {sidebarOpen && <span className="text-xs uppercase tracking-wider font-medium">Collections</span>}
              </button>
              {collectionsOpen && (
                <div className="mt-2 flex flex-col gap-1">
                  {folders.map((folder) => (
                    <a key={folder.id} href="#" className={`flex items-center gap-3 text-white/70 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${sidebarOpen ? 'pl-6' : 'justify-center'}`}>
                      <span className="material-symbols-outlined text-lg">folder</span>
                      {sidebarOpen && (
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <span className="text-sm truncate">{folder.name}</span>
                          <span className="text-xs text-white/40 ml-2">{folder.count}</span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex flex-col gap-4 px-3 mt-auto">
            <a className={`flex items-center gap-3 text-white/50 hover:text-white transition-colors p-3 ${sidebarOpen ? '' : 'justify-center'}`} href="#">
              <span className="material-symbols-outlined">help</span>
              {sidebarOpen && <span className="text-sm">Help</span>}
            </a>
            <div className={`flex items-center gap-3 p-2 ${sidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-neutral-700 shrink-0">
                <img alt="User profile" className="w-full h-full object-cover" src="https://i.pravatar.cc/150?img=8" />
              </div>
              {sidebarOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-medium truncate">John Doe</span>
                  <span className="text-white/40 text-xs truncate">john@example.com</span>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">Installed Apps</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Connect and manage your integrations</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition shadow-sm">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg">
                  <span className="material-symbols-outlined text-sm">explore</span>
                  Browse Marketplace
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <a href="/dashboard" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Organization</a>
              <a href="/teams" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Teams</a>
              <a href="/users" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Users</a>
              <a href="/subscription" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Subscription</a>
              <a href="/payment" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Payment</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Installed Apps</button>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden p-8 text-white mb-6" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 right-20 w-48 h-48 rounded-full bg-primary/30 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-teal-300/20 blur-2xl"></div>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-medium mb-2">Power Up Your Workflow</h2>
                  <p className="text-white/70 max-w-lg">Connect your favorite tools and automate repetitive tasks. Over 500+ integrations available in our marketplace.</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-medium">{apps.filter(a => a.status === 'installed').length}</div>
                    <div className="text-sm text-white/70">Installed</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-3xl font-medium">{apps.filter(a => a.connected).length}</div>
                    <div className="text-sm text-white/70">Connected</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6">
              {(['all', 'installed', 'available'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    filter === f
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? apps.length : apps.filter(a => a.status === f).length})
                </button>
              ))}
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[6px]">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-md transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      app.status === 'installed' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-slate-100 dark:bg-neutral-800'
                    }`}>
                      <span className={`material-symbols-outlined text-2xl ${
                        app.status === 'installed' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500'
                      }`}>{app.icon}</span>
                    </div>
                    {app.status === 'installed' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.connected
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {app.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium mb-1">{app.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{app.description}</p>
                  <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-neutral-800 rounded-lg text-xs text-slate-500 dark:text-slate-400 mb-4">{app.category}</span>
                  <div className="flex items-center gap-2">
                    {app.status === 'installed' ? (
                      <>
                        <button className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-sm font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 transition">
                          Settings
                        </button>
                        <button className="py-2 px-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                          Remove
                        </button>
                      </>
                    ) : (
                      <button className="flex-1 py-2 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition">
                        Install
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Build Custom Integrations Card - Light Green */}
            <div className="bg-primary p-6 rounded-3xl mt-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black text-2xl">integration_instructions</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black">Build Custom Integrations</h3>
                    <p className="text-sm text-black/70">Create your own apps using our developer API and webhooks.</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition whitespace-nowrap">
                  View Developer Docs
                </button>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mt-2">
              <h2 className="text-xl font-medium mb-4">Browse by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-xl bg-card-light dark:bg-card-dark border border-slate-100 dark:border-neutral-800 text-sm font-medium hover:border-teal-500 dark:hover:border-teal-500 transition"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <button className="fixed bottom-4 right-4 bg-accent-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-lg z-50" onClick={toggleDarkMode}>
        <span className="material-symbols-outlined dark:hidden">dark_mode</span>
        <span className="material-symbols-outlined hidden dark:block">light_mode</span>
      </button>
    </div>
  );
}
