import { useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  expiry?: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
}

export default function Payment() {
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

  const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'card', last4: '4242', brand: 'Visa', expiry: '12/26', isDefault: true },
    { id: '2', type: 'card', last4: '8888', brand: 'Mastercard', expiry: '08/25', isDefault: false },
  ];

  const invoices: Invoice[] = [
    { id: 'INV-001', date: 'Jan 15, 2025', amount: '$49.00', status: 'paid' },
    { id: 'INV-002', date: 'Dec 15, 2024', amount: '$49.00', status: 'paid' },
    { id: 'INV-003', date: 'Nov 15, 2024', amount: '$49.00', status: 'paid' },
    { id: 'INV-004', date: 'Oct 15, 2024', amount: '$49.00', status: 'paid' },
    { id: 'INV-005', date: 'Sep 15, 2024', amount: '$49.00', status: 'paid' },
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
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">Payment</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage payment methods and billing history</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-12 px-6 rounded-full bg-accent-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition flex items-center gap-2 font-medium shadow-lg">
                  <span className="material-symbols-outlined text-sm">add_card</span>
                  Add Payment Method
                </button>
              </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-[6px] mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <a href="/dashboard" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Organization</a>
              <a href="/teams" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Teams</a>
              <a href="/users" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Users</a>
              <a href="/subscription" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Subscription</a>
              <button className="px-6 py-3 rounded-full bg-accent-black text-white text-sm font-medium">Payment</button>
              <a href="/apps" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Installed Apps</a>
              <a href="/variables" className="px-6 py-3 rounded-full bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition">Variables</a>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px]">
              <div className="lg:col-span-8 flex flex-col gap-[6px]">
                {/* Payment Methods */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">credit_card</span>
                      </div>
                      <h2 className="text-xl font-medium">Payment Methods</h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative p-5 rounded-2xl border transition ${
                          method.isDefault
                            ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-900/10'
                            : 'border-slate-100 dark:border-neutral-800 hover:border-slate-200 dark:hover:border-neutral-700'
                        }`}
                      >
                        {method.isDefault && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">DEFAULT</span>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center text-white font-bold text-xs">
                            {method.brand}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">•••• •••• •••• {method.last4}</p>
                            <p className="text-sm text-slate-400">Expires {method.expiry}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                              <span className="material-symbols-outlined text-slate-400">edit</span>
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                              <span className="material-symbols-outlined text-slate-400">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add New Card */}
                    <button className="w-full p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-neutral-700 hover:border-teal-500 dark:hover:border-teal-500 transition flex items-center justify-center gap-3 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">
                      <span className="material-symbols-outlined">add</span>
                      <span className="font-medium">Add new payment method</span>
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">receipt_long</span>
                      </div>
                      <h2 className="text-xl font-medium">Billing History</h2>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-sm font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">download</span>
                      Export All
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-neutral-800">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Invoice</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-slate-50 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition">
                            <td className="py-4 px-4">
                              <span className="font-medium">{invoice.id}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-slate-500">{invoice.date}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-medium">{invoice.amount}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                invoice.status === 'paid'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : invoice.status === 'pending'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  invoice.status === 'paid' ? 'bg-green-500' :
                                  invoice.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></span>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition">
                                <span className="material-symbols-outlined text-slate-400">download</span>
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
                {/* Next Payment */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)' }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <span className="text-sm text-white/70">Next Payment</span>
                    </div>
                    <div className="text-4xl font-medium mb-2">$49.00</div>
                    <p className="text-white/70">Due on February 15, 2025</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Payment Method</span>
                        <span>Visa •••• 4242</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <button className="text-teal-600 dark:text-teal-400 text-sm font-medium">Edit</button>
                  </div>
                  <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <p className="text-slate-900 dark:text-white font-medium">Dream Company Inc.</p>
                    <p>123 Innovation Street</p>
                    <p>Suite 456</p>
                    <p>San Francisco, CA 94102</p>
                    <p>United States</p>
                  </div>
                </div>

                {/* Tax Information */}
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-neutral-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Tax Information</h3>
                    <button className="text-teal-600 dark:text-teal-400 text-sm font-medium">Edit</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tax ID</span>
                      <span className="font-medium">US123456789</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">VAT Number</span>
                      <span className="text-slate-400">Not provided</span>
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="bg-primary p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-black">support_agent</span>
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">Need Help?</h3>
                  <p className="text-sm text-black/70 mb-4">Contact our billing support team for any payment questions.</p>
                  <button className="w-full py-3 bg-accent-black text-white font-medium rounded-xl hover:bg-neutral-800 transition">
                    Contact Support
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
