import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface ProfileUploadProps {
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
}

export function ProfileUpload({ currentImage, onImageUpdate }: ProfileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Predefined avatar options
  const avatarOptions = [
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  ];

  const handleAvatarSelect = (avatarUrl: string) => {
    onImageUpdate(avatarUrl);
    setShowUploader(false);
    toast.success('Profile picture updated! 📸');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For demo purposes, we'll use a placeholder since we can't actually upload files
    // In a real app, you'd upload to Supabase Storage or another service
    toast.success('File upload feature coming soon! Please select from avatars below.');
  };

  if (!showUploader) {
    return (
      <div className="relative group">
        <img 
          src={currentImage || avatarOptions[0]}
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover border-3 border-purple-400 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setShowUploader(true)}
        />
        <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Camera className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Choose Your Avatar</h3>
          <button
            onClick={() => setShowUploader(false)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* File Upload Option */}
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center space-x-2 w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
            >
              <Upload className="w-5 h-5 text-purple-400" />
              <span className="text-white">Upload Custom Image</span>
            </button>
          </div>

          {/* Avatar Grid */}
          <div>
            <p className="text-white/70 text-sm mb-4">Or choose from these avatars:</p>
            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className="relative group"
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20 hover:border-purple-400 transition-all duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}