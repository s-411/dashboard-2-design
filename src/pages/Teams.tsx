import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
  joinedDate: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  color: 'primary' | 'dark';
}

export default function Teams() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  // Sample folders for Collections
  const folders = [
    { id: '1', name: 'Tech Influencers', count: 12 },
    { id: '2', name: 'Fitness Creators', count: 8 },
    { id: '3', name: 'Business Leaders', count: 15 },
    { id: '4', name: 'Lifestyle Bloggers', count: 6 },
  ];

  // Sample teams data
  const teams: Team[] = [
    { id: '1', name: 'Marketing', description: 'Brand awareness and growth campaigns', memberCount: 8, color: 'primary' },
    { id: '2', name: 'Sales', description: 'Lead generation and conversion', memberCount: 12, color: 'dark' },
    { id: '3', name: 'Product', description: 'Feature development and roadmap', memberCount: 6, color: 'primary' },
    { id: '4', name: 'Engineering', description: 'Technical implementation', memberCount: 15, color: 'dark' },
  ];

  // Sample team members
  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?img=1', status: 'active', joinedDate: 'Jan 2024' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Senior Developer', avatar: 'https://i.pravatar.cc/150?img=2', status: 'active', joinedDate: 'Mar 2024' },
    { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=3', status: 'away', joinedDate: 'Feb 2024' },
    { id: '4', name: 'James Wilson', email: 'james@example.com', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=4', status: 'active', joinedDate: 'Dec 2023' },
    { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Content Writer', avatar: 'https://i.pravatar.cc/150?img=5', status: 'offline', joinedDate: 'Apr 2024' },
    { id: '6', name: 'David Brown', email: 'david@example.com', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=6', status: 'active', joinedDate: 'May 2024' },
  ];

  return (
    <div className="dashboard-page bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans antialiased transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-surface-dark flex flex-col py-8 z-20 shrink-0 shadow-2xl transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between px-4 mb-8">
            <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center border border-neutral-700 text-white shrink-0">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            {sidebarOpen && (
              <span className="text-white font-medium text-lg ml-3">Dream 100</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-white hover:bg-neutral-700 transition ml-auto"
            >
              <span className="material-symbols-outlined text-sm">
                {sidebarOpen ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 flex flex-col gap-2 w-full px-3">
            <a
              className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="/dashboard"
            >
              <span className="material-symbols-outlined">speed</span>
              {sidebarOpen && <span className="font-medium">Performance</span>}
            </a>
            <a
              className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">campaign</span>
              {sidebarOpen && <span className="font-medium">Campaigns</span>}
            </a>
            <a
              className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">analytics</span>
              {sidebarOpen && <span className="font-medium">Analytics</span>}
            </a>
            <a
              className={`flex items-center gap-3 text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </a>

            {/* Collections Section */}
            <div className="mt-6">
              <button
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                className={`flex items-center gap-3 text-white/60 hover:text-white w-full rounded-xl transition-colors p-3 ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {collectionsOpen ? 'expand_more' : 'chevron_right'}
                </span>
                {sidebarOpen && <span className="text-xs uppercase tracking-wider font-medium">Collections</span>}
              </button>

              {collectionsOpen && (
                <div className="mt-2 flex flex-col gap-1">
                  {folders.map((folder) => (
                    <a
                      key={folder.id}
                      href="#"
                      className={`flex items-center gap-3 text-white/70 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 ${
                        sidebarOpen ? 'pl-6' : 'justify-center'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">folder</span>
                      {sidebarOpen && (
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <span className="text-sm truncate">{folder.name}</span>
                          <span className="text-xs text-white/40 ml-2">{folder.count}</span>
                        </div>
                      )}
                    </a>
                  ))}
                  {sidebarOpen && (
                    <button className="flex items-center gap-3 text-white/40 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors p-3 pl-6">
                      <span className="material-symbols-outlined text-lg">add</span>
                      <span className="text-sm">New Collection</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4 px-3 mt-auto">
            <a
              className={`flex items-center gap-3 text-white/50 hover:text-white transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">help</span>
              {sidebarOpen && <span className="text-sm">Help</span>}
            </a>
            <div className={`flex items-center gap-3 p-2 ${sidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-neutral-700 shrink-0">
                <img
                  alt="User profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdZZX5g9baxk1sxRK7mBfSEVXevwFzGYoN8rLpSakE1PgpSrSKUz_KcQ8cgFdm_GKXvZ1AXBevD8t1Ysxio9ufoNKDT-glwRUyRI3ILADw-GMsHSc6aXynOomQDwaUgwqgBPXrwy_TsI_gmxajF0rPpW9NC_PzkTiBFcAsCWfcAa8sELXQmjWbgokVhZNJ2LWuk4TsNKDvaH_7wPTxXzZ4RhWka3bSuASCdSloKl12oIsYJ16BNK-Rkb63bCyA63uKOOvQ6YPdKLyo"
                />
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
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                  Teams
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your teams and team members</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition shadow-sm">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Create Team
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <a href="/dashboard" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Organization</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Teams</button>
              <a href="/users" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Users</a>
              <a href="/subscription" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Subscription</a>
              <a href="/payment" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Payment</a>
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px]">
              {/* Left Column - Teams Grid */}
              <div className="lg:col-span-8 flex flex-col gap-[6px]">
                {/* Teams Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className={`p-6 rounded-3xl shadow-sm relative group cursor-pointer hover:shadow-md transition ${
                        team.color === 'primary'
                          ? 'bg-primary text-black'
                          : 'bg-accent-black text-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          team.color === 'primary' ? 'bg-white/40' : 'bg-neutral-800'
                        }`}>
                          <span className="material-symbols-outlined">groups</span>
                        </div>
                        <span className={`material-symbols-outlined cursor-pointer ${
                          team.color === 'primary' ? 'text-black/60' : 'text-white/60'
                        }`}>more_vert</span>
                      </div>
                      <h3 className="text-xl font-medium mb-1">{team.name}</h3>
                      <p className={`text-sm mb-4 ${
                        team.color === 'primary' ? 'text-black/60' : 'text-white/60'
                      }`}>{team.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded-full border-2 ${
                                team.color === 'primary' ? 'border-primary' : 'border-accent-black'
                              }`}
                            >
                              <img
                                src={`https://i.pravatar.cc/150?img=${i + parseInt(team.id) * 3}`}
                                alt="Member"
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className={`text-sm ${
                          team.color === 'primary' ? 'text-black/60' : 'text-white/60'
                        }`}>+{team.memberCount - 3} more</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Members Table */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">person</span>
                      </div>
                      <h2 className="text-xl font-medium">Team Members</h2>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-sm font-medium flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-neutral-700 transition">
                      <span className="material-symbols-outlined text-sm">filter_list</span>
                      Filter
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-neutral-800">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Member</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Joined</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member) => (
                          <tr key={member.id} className="border-b border-slate-50 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-xl object-cover"
                                />
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-xs text-slate-400">{member.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm">{member.role}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                member.status === 'active'
                                  ? 'bg-primary/20 text-green-700 dark:text-primary'
                                  : member.status === 'away'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  member.status === 'active'
                                    ? 'bg-green-500'
                                    : member.status === 'away'
                                    ? 'bg-yellow-500'
                                    : 'bg-slate-400'
                                }`}></span>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-slate-500">{member.joinedDate}</span>
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

              {/* Right Column - Stats & Actions */}
              <div className="lg:col-span-4 flex flex-col gap-[6px]">
                {/* Quick Stats */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <h3 className="font-medium mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-lg">groups</span>
                        </div>
                        <span className="text-sm">Total Teams</span>
                      </div>
                      <span className="text-2xl font-medium">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-lg">person</span>
                        </div>
                        <span className="text-sm">Total Members</span>
                      </div>
                      <span className="text-2xl font-medium">41</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">check_circle</span>
                        </div>
                        <span className="text-sm">Active Now</span>
                      </div>
                      <span className="text-2xl font-medium">28</span>
                    </div>
                  </div>
                </div>

                {/* Invite Members Card */}
                <div className="bg-primary p-6 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
                      <span className="material-symbols-outlined text-black">person_add</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">Invite Members</h3>
                  <p className="text-sm text-black/60 mb-4">Add new team members to collaborate on your projects.</p>
                  <button className="w-full py-3 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">mail</span>
                    Send Invite
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Recent Activity</h3>
                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_outward</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { action: 'Sarah joined Marketing team', time: '2 hours ago' },
                      { action: 'New role created: Content Lead', time: '5 hours ago' },
                      { action: 'Michael updated permissions', time: '1 day ago' },
                      { action: 'Engineering team created', time: '2 days ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-slate-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Collaboration Card - Dark Teal */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Team Collaboration</h3>
                    <p className="text-sm text-white/70 mb-4">Enhance productivity with real-time collaboration tools.</p>
                    <button className="w-full py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition text-sm">
                      Learn More
                    </button>
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
                  <h4 className="font-medium mb-1">Team Management Guide</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Learn how to effectively manage your teams and permissions.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Dark Mode Toggle */}
      <button
        className="fixed bottom-4 right-4 bg-accent-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-lg z-50"
        onClick={toggleDarkMode}
      >
        <span className="material-symbols-outlined dark:hidden">dark_mode</span>
        <span className="material-symbols-outlined hidden dark:block">light_mode</span>
      </button>
    </div>
  );
}
