'use client';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserStore } from '../store/user-store';
import AuthModal from '@/components/auth-modal';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
  showAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({ loading: true } as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const supabase = createClient();

  const fetchInteractions = useUserStore((state) => state.fetchInteractions);
  const clearInteractions = useUserStore((state) => state.clearInteractions);
  const handleLike = useUserStore((state) => state.handleLike);
  const pendingLikeProjectId = useUserStore((state) => state.pendingLikeProjectId);
  const setPendingLike = useUserStore((state) => state.setPendingLike);

  const showAuthModal = () => setIsAuthModalOpen(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        await fetchInteractions();
      }
    };

    getUser();

    // Escuta mudanças em tempo real (Login, Logout, Auto-refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        fetchInteractions();
      } else {
        clearInteractions();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [clearInteractions, fetchInteractions, supabase]);

  const isAnonymous = user?.is_anonymous ?? false;

  return (
    <AuthContext.Provider value={{ user, loading, isAnonymous, showAuthModal }}>
      <AuthModal
        visible={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          if (pendingLikeProjectId) {
            handleLike(pendingLikeProjectId);
            setPendingLike(null);
          }
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
