import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  upgradeToPremium: () => Promise<void>;
  isLoading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const upgradeToPremium = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:5008/api/Subscription/upgrade/${user.userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, isPremium: true });
    } catch (error) {
      console.error('Subscription upgrade failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ upgradeToPremium, isLoading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within a SubscriptionProvider');
  return context;
};
