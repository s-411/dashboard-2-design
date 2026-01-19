import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
  permissions: string[];
}

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const folders = [
    { id: '1', name: 'Tech Influencers', count: 12 },
    { id: '2', name: 'Fitness Creators', count: 8 },
    { id: '3', name: 'Business Leaders', count: 15 },
    { id: '4', name: 'Lifestyle Bloggers', count: 6 },
  ];

  const users: User[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=1', status: 'active', lastActive: '2 min ago', permissions: ['All Access'] },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=2', status: 'active', lastActive: '15 min ago', permissions: ['Edit', 'View'] },
    { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?img=3', status: 'pending', lastActive: 'Pending invite', permissions: ['View'] },
    { id: '4', name: 'James Wilson', email: 'james@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=4', status: 'active', lastActive: '1 hour ago', permissions: ['Edit', 'View'] },
    { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?img=5', status: 'inactive', lastActive: '3 days ago', permissions: ['View'] },
    { id: '6', name: 'David Brown', email: 'david@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=6', status: 'active', lastActive: 'Just now', permissions: ['All Access'] },
  ];

  const roleStats = [
    { role: 'Admins', count: 2, color: 'bg-primary' },
    { role: 'Editors', count: 8, color: 'bg-accent-black dark:bg-white' },
    { role: 'Viewers', count: 15, color: 'bg-teal-600' },
  ];

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
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">Users</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage user access and permissions</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition shadow-sm">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Invite User
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <a href="/dashboard" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Organization</a>
              <a href="/teams" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Teams</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Users</button>
              <a href="/subscription" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Subscription</a>
              <a href="/payment" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Payment</a>
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px]">
              <div className="lg:col-span-8 flex flex-col gap-[6px]">
                {/* Hero Card with Teal Gradient */}
                <div className="relative rounded-3xl overflow-hidden p-8 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-teal-400/20 blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">group</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-medium">User Management</h2>
                        <p className="text-white/70 text-sm">Control access across your organization</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {roleStats.map((stat) => (
                        <div key={stat.role} className="bg-white/10 rounded-2xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                            <span className="text-sm text-white/70">{stat.role}</span>
                          </div>
                          <span className="text-3xl font-medium">{stat.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">people</span>
                      </div>
                      <h2 className="text-xl font-medium">All Users</h2>
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
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Active</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-slate-50 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === 'Admin' ? 'bg-primary/20 text-teal-700 dark:text-primary' :
                                user.role === 'Editor' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400'
                              }`}>{user.role}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                user.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                'bg-slate-100 dark:bg-neutral-800 text-slate-500'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  user.status === 'active' ? 'bg-green-500' :
                                  user.status === 'pending' ? 'bg-yellow-500' : 'bg-slate-400'
                                }`}></span>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-slate-500">{user.lastActive}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                                <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                              </button>
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
                {/* Invite Card */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Invite Teammates</h3>
                    <p className="text-sm text-white/70 mb-4">Add new members to collaborate on your projects.</p>
                    <div className="flex gap-2">
                      <input type="email" placeholder="Enter email address" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-primary" />
                      <button className="px-4 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary-dark transition">
                        <span className="material-symbols-outlined">send</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Permission Levels */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <h3 className="font-medium mb-4">Permission Levels</h3>
                  <div className="space-y-3">
                    {[
                      { level: 'Admin', desc: 'Full access to all features', icon: 'shield' },
                      { level: 'Editor', desc: 'Can edit and create content', icon: 'edit' },
                      { level: 'Viewer', desc: 'Read-only access', icon: 'visibility' },
                    ].map((perm) => (
                      <div key={perm.level} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-neutral-800">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">{perm.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{perm.level}</p>
                          <p className="text-xs text-slate-400">{perm.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <h3 className="font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Sarah was promoted to Admin', time: '2 hours ago' },
                      { action: 'New invite sent to mike@co.com', time: '5 hours ago' },
                      { action: 'Emily accepted invitation', time: '1 day ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0"></div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-slate-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Onboarding Card - Light Green */}
                <div className="bg-primary p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-black">rocket_launch</span>
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">Onboard New Users</h3>
                  <p className="text-sm text-black/70 mb-4">Set up guided tours and tutorials for new team members.</p>
                  <button className="w-full py-2 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition text-sm">
                    Create Onboarding
                  </button>
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
