// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PropertyListing from './components/PropertyListing';
import Profile from './components/user/Profile';
import LikedProperties from './components/user/LikedProperties';
import Dashboard from './components/dashboard/Dashboard';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            {/* Add your navigation component here */}
          </nav>

          <Routes>
            <Route path="/" element={<PropertyListing />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/liked-properties" 
              element={
                <PrivateRoute>
                  <LikedProperties />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;