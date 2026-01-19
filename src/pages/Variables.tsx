import { useState } from 'react';

interface Variable {
  id: string;
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'secret';
  scope: 'global' | 'project' | 'environment';
  lastUpdated: string;
}

export default function Variables() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const folders = [
    { id: '1', name: 'Tech Influencers', count: 12 },
    { id: '2', name: 'Fitness Creators', count: 8 },
    { id: '3', name: 'Business Leaders', count: 15 },
    { id: '4', name: 'Lifestyle Bloggers', count: 6 },
  ];

  const variables: Variable[] = [
    { id: '1', name: 'API_BASE_URL', value: 'https://api.dream100.com', type: 'string', scope: 'global', lastUpdated: '2 days ago' },
    { id: '2', name: 'MAX_RETRIES', value: '3', type: 'number', scope: 'global', lastUpdated: '1 week ago' },
    { id: '3', name: 'ENABLE_ANALYTICS', value: 'true', type: 'boolean', scope: 'project', lastUpdated: '3 days ago' },
    { id: '4', name: 'STRIPE_SECRET_KEY', value: '••••••••••••••••', type: 'secret', scope: 'environment', lastUpdated: '1 month ago' },
    { id: '5', name: 'DATABASE_URL', value: '••••••••••••••••', type: 'secret', scope: 'environment', lastUpdated: '2 weeks ago' },
    { id: '6', name: 'DEFAULT_TIMEZONE', value: 'America/Los_Angeles', type: 'string', scope: 'global', lastUpdated: '1 month ago' },
    { id: '7', name: 'RATE_LIMIT', value: '1000', type: 'number', scope: 'project', lastUpdated: '5 days ago' },
    { id: '8', name: 'DEBUG_MODE', value: 'false', type: 'boolean', scope: 'environment', lastUpdated: 'Just now' },
  ];

  const getTypeColor = (type: Variable['type']) => {
    switch (type) {
      case 'string': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'number': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'boolean': return 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400';
      case 'secret': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    }
  };

  const getScopeColor = (scope: Variable['scope']) => {
    switch (scope) {
      case 'global': return 'bg-primary/20 text-teal-700 dark:text-primary';
      case 'project': return 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400';
      case 'environment': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
    }
  };

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
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">Variables</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage environment variables and configurations</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition shadow-sm">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Variable
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
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Variables</button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px]">
              <div className="lg:col-span-8 flex flex-col gap-[6px]">
                {/* Hero Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl"></div>
                    <div className="absolute bottom-5 left-20 w-32 h-32 rounded-full bg-teal-300/20 blur-2xl"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">data_object</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-medium">Environment Configuration</h2>
                        <p className="text-white/70 text-sm">Securely manage your application variables</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-medium">{variables.length}</div>
                        <div className="text-xs text-white/70">Total</div>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-medium">{variables.filter(v => v.scope === 'global').length}</div>
                        <div className="text-xs text-white/70">Global</div>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-medium">{variables.filter(v => v.type === 'secret').length}</div>
                        <div className="text-xs text-white/70">Secrets</div>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-medium">{variables.filter(v => v.scope === 'environment').length}</div>
                        <div className="text-xs text-white/70">Env-Specific</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variables Table */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">list</span>
                      </div>
                      <h2 className="text-xl font-medium">All Variables</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-sm font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filter
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-sm font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-neutral-800">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Value</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Scope</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Updated</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variables.map((variable) => (
                          <tr key={variable.id} className="border-b border-slate-50 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition">
                            <td className="py-4 px-4">
                              <code className="font-mono text-sm bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded">{variable.name}</code>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-slate-500 font-mono">{variable.value}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(variable.type)}`}>
                                {variable.type}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getScopeColor(variable.scope)}`}>
                                {variable.scope}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-slate-500">{variable.lastUpdated}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                                  <span className="material-symbols-outlined text-slate-400 text-sm">edit</span>
                                </button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                                  <span className="material-symbols-outlined text-slate-400 text-sm">content_copy</span>
                                </button>
                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                  <span className="material-symbols-outlined text-red-400 text-sm">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 flex flex-col gap-[6px]">
                {/* Quick Add */}
                <div className="bg-primary p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-black">add_circle</span>
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">Quick Add Variable</h3>
                  <p className="text-sm text-black/70 mb-4">Create a new variable with just a name and value.</p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Variable name"
                      className="w-full px-4 py-3 rounded-xl bg-black/10 border border-black/20 text-black placeholder-black/50 text-sm focus:outline-none focus:border-black/40"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="w-full px-4 py-3 rounded-xl bg-black/10 border border-black/20 text-black placeholder-black/50 text-sm focus:outline-none focus:border-black/40"
                    />
                    <button className="w-full py-3 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition">
                      Add Variable
                    </button>
                  </div>
                </div>

                {/* Variable Types */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <h3 className="font-medium mb-4">Variable Types</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'String', desc: 'Text values', icon: 'text_fields', color: 'text-blue-500' },
                      { type: 'Number', desc: 'Numeric values', icon: 'tag', color: 'text-purple-500' },
                      { type: 'Boolean', desc: 'True/false values', icon: 'toggle_on', color: 'text-teal-500' },
                      { type: 'Secret', desc: 'Encrypted sensitive data', icon: 'lock', color: 'text-red-500' },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-neutral-800">
                        <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{item.type}</p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secrets Security Card - Dark Teal */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">security</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Secrets Security</h3>
                    <p className="text-sm text-white/70 mb-4">All secrets are encrypted at rest and in transit using AES-256.</p>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      SOC 2 Compliant
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 group cursor-pointer hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">help</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition">arrow_outward</span>
                  </div>
                  <h4 className="font-medium mb-1">Variables Guide</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Learn best practices for managing environment variables and secrets.</p>
                </div>
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
