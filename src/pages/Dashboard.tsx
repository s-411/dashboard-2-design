import { useState } from 'react';

export default function Dashboard() {
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
              href="#"
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
              className={`flex items-center gap-3 text-white bg-neutral-800 rounded-xl transition-colors p-3 ${
                sidebarOpen ? '' : 'justify-center'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined text-primary">analytics</span>
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
                  Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition shadow-sm">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <button className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Create a New Scenario
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Organization</button>
              <a href="/teams" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Teams</a>
              <a href="/users" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Users</a>
              <a href="/subscription" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Subscription</a>
              <a href="/payment" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Payment</a>
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px]">
              {/* Left Column - 9 cols */}
              <div className="lg:col-span-9 flex flex-col gap-[6px]">
                {/* Top Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px]">
                  {/* Operations Card */}
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 relative group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-neutral-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400 text-lg">settings</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
                    </div>
                    <h3 className="font-medium text-slate-600 dark:text-slate-300 mb-1">Operations</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-medium tracking-tight">780</span>
                      <span className="text-sm text-slate-400 font-mono">/ 1000</span>
                    </div>
                    <div className="absolute top-16 right-6 bg-primary px-2 py-1 rounded-lg text-xs font-bold text-black flex items-center gap-1">
                      82% <div className="w-2 h-2 rounded-full border border-black"></div>
                    </div>
                    <div className="flex gap-1 mt-auto">
                      <div className="pill-tick bg-accent-black dark:bg-white"></div>
                      <div className="pill-tick bg-accent-black dark:bg-white"></div>
                      <div className="pill-tick bg-accent-black dark:bg-white"></div>
                      <div className="pill-tick bg-accent-black dark:bg-white"></div>
                      <div className="pill-tick bg-accent-black dark:bg-white"></div>
                      <div className="pill-tick border border-slate-200 dark:border-neutral-700"></div>
                      <div className="pill-tick border border-slate-200 dark:border-neutral-700"></div>
                      <div className="pill-tick border border-slate-200 dark:border-neutral-700"></div>
                    </div>
                  </div>

                  {/* Data Transfer Card */}
                  <div className="bg-primary p-6 rounded-3xl shadow-sm relative group text-black">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black text-lg">sync_alt</span>
                      </div>
                      <span className="material-symbols-outlined text-black/60 cursor-pointer">more_vert</span>
                    </div>
                    <h3 className="font-medium text-black mb-1">Data Transfer</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-medium tracking-tight">163</span>
                      <span className="text-sm text-black/60 font-mono">/ 512.0 MB</span>
                    </div>
                    <div className="absolute top-16 right-6 bg-white px-2 py-1 rounded-lg text-xs font-bold text-black flex items-center gap-1">
                      68% <div className="w-2 h-2 rounded-full border border-black"></div>
                    </div>
                    <div className="flex gap-1 mt-auto">
                      <div className="pill-tick bg-black"></div>
                      <div className="pill-tick bg-black"></div>
                      <div className="pill-tick bg-black"></div>
                      <div className="pill-tick bg-black"></div>
                      <div className="pill-tick border border-black/20"></div>
                      <div className="pill-tick border border-black/20"></div>
                      <div className="pill-tick border border-black/20"></div>
                      <div className="pill-tick border border-black/20"></div>
                    </div>
                  </div>

                  {/* Upgrade Card */}
                  <div className="bg-accent-black text-white p-6 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <img
                      alt="Abstract futuristic background"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYyUCNQO8egRTmI67ElCzCMztaya00iH4YkjO1tsvoxKJ4ut9W2boZ0EUP4Mrbf13CfVfJlrd1djC2_JxD2qOHA4oXIr1dzgt-ksC5Vt8lQ-Mj1b6TGmDDO84cPX72kt3H-Fl9RywSbOw9xag9RHkmx1XEFnowvihkeXOl5x8gHRGj_DG3ReZnoEU7KUzu2zVVn2pvNYnHI7lJt07K6Jq-aTk79mFS7zOjJbLCYnica9sIgshE9KHMx_JshHFjMrc--IMTg7T6We55"
                    />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-medium leading-tight mb-2">
                        Take Your <span className="material-symbols-outlined text-primary text-xl align-middle">trending_up</span><br />
                        Automation<br />
                        to the Next Level
                      </h3>
                    </div>
                    <button className="relative z-10 w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2 mt-4">
                      Upgrade <span className="material-symbols-outlined text-sm">play_arrow</span>
                    </button>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className="bg-card-light dark:bg-card-dark p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 flex-1">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">bar_chart</span>
                      </div>
                      <h2 className="text-2xl font-medium">Statistics</h2>
                      <div className="hidden md:flex items-center gap-4 ml-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 rounded-full bg-accent-black dark:bg-white"></div>
                          Operations
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          Data transfer
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-sm font-medium flex items-center gap-2">
                      2025 <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                  </div>

                  {/* Chart Area */}
                  <div className="relative h-64 w-full mt-8">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-400 font-mono w-6 text-right pr-2">
                      <span>1.0</span>
                      <span>0.9</span>
                      <span>0.8</span>
                      <span>0.7</span>
                      <span>0.6</span>
                      <span>0.5</span>
                      <span>0.4</span>
                      <span>0.3</span>
                      <span>0.2</span>
                      <span>0.1</span>
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between z-0">
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                      <div className="border-b border-slate-100 dark:border-neutral-800 h-0 w-full"></div>
                    </div>

                    {/* Chart Bars */}
                    <div className="absolute left-8 right-0 top-0 bottom-0 flex justify-around items-end pb-8 z-10 pl-2">
                      {/* 27 Jun */}
                      <div className="flex flex-col items-center gap-3 w-8">
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '140px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-1/2 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">27 Jun</span>
                      </div>

                      {/* 28 Jun */}
                      <div className="flex flex-col items-center gap-3 w-8">
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '90px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-1/3 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-white dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">28 Jun</span>
                      </div>

                      {/* 29 Jun */}
                      <div className="flex flex-col items-center gap-3 w-8">
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '110px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-1/4 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-white dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">29 Jun</span>
                      </div>

                      {/* 30 Jun - Dashed */}
                      <div className="flex flex-col items-center gap-3 w-8 group">
                        <div className="w-full border-2 border-dashed border-slate-300 dark:border-neutral-600 rounded-full relative h-40 flex flex-col justify-between items-center py-2">
                          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-neutral-600"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">30 Jun</span>
                      </div>

                      {/* 1 Jul - Highlighted */}
                      <div className="flex flex-col items-center gap-3 w-8 relative">
                        <div className="absolute -left-12 bottom-1/3 bg-primary px-2 py-1 rounded text-xs font-bold text-black shadow-sm mb-1 z-20">32%</div>
                        <div className="absolute -right-8 top-0 bg-accent-black text-white px-2 py-1 rounded text-xs font-bold shadow-sm mb-1 z-20">87%</div>
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '160px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-2/3 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-white dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-white font-bold">1 Jul</span>
                      </div>

                      {/* 2 Jul - Dashed */}
                      <div className="flex flex-col items-center gap-3 w-8 group">
                        <div className="w-full border-2 border-dashed border-slate-300 dark:border-neutral-600 rounded-full relative h-40 flex flex-col justify-between items-center py-2">
                          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-neutral-600"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">2 Jul</span>
                      </div>

                      {/* 3 Jul */}
                      <div className="flex flex-col items-center gap-3 w-8">
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '120px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-3/5 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-white dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">3 Jul</span>
                      </div>

                      {/* 4 Jul */}
                      <div className="flex flex-col items-center gap-3 w-8">
                        <div className="w-full bg-accent-black dark:bg-white rounded-full relative" style={{ height: '100px' }}>
                          <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-full h-2/5 flex items-start justify-center pt-2">
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                          </div>
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-white dark:bg-accent-black"></div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">4 Jul</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 3 cols */}
              <div className="lg:col-span-3 flex flex-col gap-[6px]">
                {/* Community & Academy */}
                <div className="grid grid-cols-2 gap-[6px]">
                  <a className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition aspect-square justify-center" href="#">
                    <span className="material-symbols-outlined text-3xl mb-3 text-slate-600 dark:text-slate-300">forum</span>
                    <span className="text-sm font-medium">Community</span>
                  </a>
                  <a className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition aspect-square justify-center" href="#">
                    <span className="material-symbols-outlined text-3xl mb-3 text-slate-600 dark:text-slate-300">school</span>
                    <span className="text-sm font-medium">Academy</span>
                  </a>
                </div>

                {/* Help Center */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 group cursor-pointer hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">help</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition">arrow_outward</span>
                  </div>
                  <h4 className="font-medium mb-1">Help Center</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Explore our detailed documentation and guides.</p>
                </div>

                {/* Partner Directory */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 group cursor-pointer hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">groups</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition">arrow_outward</span>
                  </div>
                  <h4 className="font-medium mb-1">Partner Directory</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Find the perfect partner to support your growth.</p>
                </div>

                {/* Blog */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 group cursor-pointer hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">article</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition">arrow_outward</span>
                  </div>
                  <h4 className="font-medium mb-1">Blog</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Access popular guides &amp; stories about creation.</p>
                </div>

                {/* Use Cases */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800 group cursor-pointer hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">bar_chart</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition">arrow_outward</span>
                  </div>
                  <h4 className="font-medium mb-1">Use Cases</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Get inspired by all the ways you can automate.</p>
                </div>

                {/* Quick Actions Card - Dark Teal */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">flash_on</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                    <p className="text-sm text-white/70 mb-3">Get started with common tasks.</p>
                    <div className="space-y-2">
                      <button className="w-full py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition text-left px-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Scenario
                      </button>
                      <button className="w-full py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition text-left px-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        Invite Member
                      </button>
                    </div>
                  </div>
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
