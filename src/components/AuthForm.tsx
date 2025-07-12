import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckSquare, Mail, Lock, Eye, EyeOff, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    try {
      const { error } = isLogin
        ? await signIn(data.email, data.password)
        : await signUp(data.email, data.password);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(isLogin ? 'Welcome back! 🎉' : 'Account created successfully! 🚀');
        reset();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <CheckSquare className="w-10 h-10 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Masthi Tasks Manager
              </h1>
              <p className="text-white/80 text-lg mb-2">
                {isLogin ? 'Welcome back to your productivity hub!' : 'Experience next-level task management!'}
              </p>
              <p className="text-sm text-white/60 bg-white/10 rounded-full px-4 py-1 inline-block">
                Crafted with passion by a skilled developer
              </p>
              
              <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-white/60">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Handcrafted for maximum productivity</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    isLogin ? 'Sign In & Start Achieving' : 'Create Account & Get Started'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                {isLogin ? "Don't have an account? Join the community" : 'Already part of the family? Welcome back'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            {/* Feature highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="text-white/60">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs">Lightning Fast</div>
              </div>
              <div className="text-white/60">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-xs">Secure & Private</div>
              </div>
              <div className="text-white/60">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-xs">Mobile Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}