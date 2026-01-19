import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { FolderProvider } from './hooks/useFolderContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Add from './pages/Add';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Users from './pages/Users';
import Subscription from './pages/Subscription';
import Payment from './pages/Payment';
import Apps from './pages/Apps';
import Variables from './pages/Variables';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }} />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/users" element={<Users />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/variables" element={<Variables />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FolderProvider>
          <AppRoutes />
        </FolderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
