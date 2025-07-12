import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useProfile() {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    // Load profile image from localStorage or use default
    const savedImage = localStorage.getItem(`profile_image_${user?.id}`);
    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      // Default avatar
      setProfileImage("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face");
    }
  }, [user?.id]);

  const updateProfileImage = (imageUrl: string) => {
    setProfileImage(imageUrl);
    if (user?.id) {
      localStorage.setItem(`profile_image_${user.id}`, imageUrl);
    }
  };

  return {
    profileImage,
    updateProfileImage,
  };
}