import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { ProfileUpload } from './ProfileUpload';
import { DeveloperInfo } from './DeveloperInfo';
import { LogOut, User, CheckSquare, Crown, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { profileImage, updateProfileImage } = useProfile();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('See you soon! 👋');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <CheckSquare className="w-7 h-7 text-white" />
                </div>
                <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Masthi Tasks Manager
                </h1>
                <p className="text-xs text-white/60">Developed with Excellence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <ProfileUpload 
                  currentImage={profileImage}
                  onImageUpdate={updateProfileImage}
                />
                <div>
                  <p className="text-sm text-white font-medium">{user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-white/60">Pro Member</p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <DeveloperInfo />

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white/60">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Built with modern web technologies</span>
            </div>
            <div className="text-sm text-white/40">
              Developed with ❤️ by a passionate coder
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}