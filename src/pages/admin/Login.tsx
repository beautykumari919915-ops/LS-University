import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Firebase Login Request Attempt');
      console.log('- Firebase project ID:', auth.app.options.projectId);
      console.log('- Auth provider used: Email/Password (signInWithEmailAndPassword)');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      console.log('- Login request result: SUCCESS');
      console.log('- User:', userCredential.user.uid);
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Firebase Login Request Attempt Failed');
      console.error('- Firebase project ID:', auth.app.options.projectId);
      console.error('- Auth provider used: Email/Password (signInWithEmailAndPassword)');
      console.error('- Login request result: FAILED');
      console.error('- Exact Firebase error code:', err.code);
      console.error('- Exact Firebase error message:', err.message);
      
      let displayMessage = err.message || 'Failed to login';
      if (err.code === 'auth/operation-not-allowed') {
        displayMessage = 'Email/Password authentication is not enabled. Please enable it in the Firebase Console -> Authentication -> Sign-in method.';
      }
      
      setError(displayMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 bg-amber-500 rounded-full flex items-center justify-center">
          <Lock className="text-slate-900 w-6 h-6" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Authorized personnel only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-medium text-slate-900">Setup Guide</h3>
            <p className="mt-2 text-xs text-slate-500">
              To create an admin account, open the Firebase Console, navigate to Authentication, and add a user with email and password. Since public signups are disabled in UI, all created accounts will act as admins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
