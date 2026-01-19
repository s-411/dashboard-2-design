import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export default function Subscription() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const folders = [
    { id: '1', name: 'Tech Influencers', count: 12 },
    { id: '2', name: 'Fitness Creators', count: 8 },
    { id: '3', name: 'Business Leaders', count: 15 },
    { id: '4', name: 'Lifestyle Bloggers', count: 6 },
  ];

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      features: ['5 team members', '10 projects', 'Basic analytics', 'Email support'],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'monthly' ? '$49' : '$490',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      features: ['25 team members', 'Unlimited projects', 'Advanced analytics', 'Priority support', 'API access'],
      popular: true,
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited members', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'Custom training'],
    },
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
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">Subscription</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your plan and billing</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-12 px-6 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 transition flex items-center gap-2 font-medium shadow-sm border border-slate-200 dark:border-neutral-700">
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  View Invoices
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <a href="/dashboard" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Organization</a>
              <a href="/teams" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Teams</a>
              <a href="/users" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Users</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Subscription</button>
              <a href="/payment" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Payment</a>
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Current Plan Banner */}
            <div className="relative rounded-3xl overflow-hidden p-8 text-white mb-6" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-5 right-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl"></div>
                <div className="absolute bottom-5 left-20 w-32 h-32 rounded-full bg-teal-300/20 blur-2xl"></div>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">CURRENT PLAN</span>
                  </div>
                  <h2 className="text-3xl font-medium mb-2">Professional Plan</h2>
                  <p className="text-white/70">Your subscription renews on <strong>February 15, 2025</strong></p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-4xl font-medium">$49<span className="text-lg text-white/70">/month</span></div>
                  <p className="text-white/70 text-sm mt-1">Billed monthly</p>
                </div>
              </div>
            </div>

            {/* Billing Toggle & Plans */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-14 h-8 bg-slate-200 dark:bg-neutral-700 rounded-full transition"
                >
                  <div className={`absolute top-1 w-6 h-6 bg-teal-600 rounded-full transition-all ${billingCycle === 'yearly' ? 'left-7' : 'left-1'}`}></div>
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Yearly</span>
                <span className="px-2 py-1 bg-primary/20 text-teal-700 dark:text-primary text-xs font-medium rounded-full">Save 20%</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px]">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-6 rounded-3xl border transition ${
                      plan.current
                        ? 'bg-card-light dark:bg-card-dark border-teal-500 dark:border-teal-500'
                        : 'bg-card-light dark:bg-card-dark border-slate-100 dark:border-neutral-800 hover:border-slate-200 dark:hover:border-neutral-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-medium">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-teal-500 text-lg">check_circle</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 rounded-xl font-medium transition ${
                        plan.current
                          ? 'bg-slate-100 dark:bg-neutral-800 text-slate-400 cursor-default'
                          : 'bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                      }`}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Benefits Card - Light Green */}
            <div className="bg-primary p-6 rounded-3xl mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black text-2xl">diamond</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black">Unlock Premium Features</h3>
                    <p className="text-sm text-black/70">Get advanced analytics, priority support, and unlimited integrations.</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition whitespace-nowrap">
                  Compare Plans
                </button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px]">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-slate-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500">Team Members</span>
                  <span className="material-symbols-outlined text-teal-500">group</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium">18</span>
                  <span className="text-slate-400">/ 25</span>
                </div>
                <div className="mt-3 h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-slate-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500">Projects</span>
                  <span className="material-symbols-outlined text-primary">folder</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium">47</span>
                  <span className="text-slate-400">/ unlimited</span>
                </div>
                <div className="mt-3 h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-slate-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500">API Calls</span>
                  <span className="material-symbols-outlined text-teal-600">api</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium">8.2K</span>
                  <span className="text-slate-400">/ 10K</span>
                </div>
                <div className="mt-3 h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '82%' }}></div>
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
