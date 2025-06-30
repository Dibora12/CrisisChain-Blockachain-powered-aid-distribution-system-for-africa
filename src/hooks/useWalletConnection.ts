
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSmartContracts } from '@/hooks/useSmartContracts';
import { toast } from 'sonner';

export const useWalletConnection = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [laceInstalled, setLaceInstalled] = useState(false);
  const { user } = useAuth();
  const { initializeClient } = useSmartContracts();

  useEffect(() => {
    checkLaceInstalled();
    if (user) {
      checkExistingWalletAddress();
    }
  }, [user]);

  const checkLaceInstalled = () => {
    const isInstalled = typeof window !== 'undefined' && 
                       typeof window.cardano !== 'undefined' && 
                       typeof window.cardano.lace !== 'undefined';
    setLaceInstalled(isInstalled);
    console.log('Lace installed:', isInstalled);
  };

  const checkExistingWalletAddress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('id', user.id)
        .single();
      
      if (data?.wallet_address) {
        setWalletAddress(data.wallet_address);
        setWalletConnected(true);
      }
    } catch (error) {
      console.log('No existing wallet address found');
    }
  };

  const connectWallet = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    if (!laceInstalled) {
      return false;
    }

    setConnecting(true);
    try {
      console.log('Attempting to connect to Lace wallet...');
      const api = await window.cardano.lace.enable();
      console.log('Lace API enabled:', api);
      
      const addresses = await api.getUsedAddresses();
      console.log('Addresses retrieved:', addresses);
      
      if (addresses && addresses.length > 0) {
        const address = addresses[0];
        setWalletConnected(true);
        setWalletAddress(address);

        // Save wallet address to user profile
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id, 
            wallet_address: address 
          });

        if (error) {
          console.error('Error saving wallet address:', error);
          toast.error('Failed to save wallet address');
        } else {
          toast.success('Wallet connected successfully!', {
            description: `Connected to ${address.slice(0, 8)}...${address.slice(-6)}`,
          });

          // Initialize smart contracts after wallet connection
          try {
            await initializeClient();
          } catch (contractError) {
            console.error('Failed to initialize smart contracts:', contractError);
            toast.error('Wallet connected but smart contracts failed to initialize');
          }
        }
      } else {
        toast.error('No wallet addresses found', {
          description: 'Please ensure your Lace wallet has at least one address'
        });
      }
      return true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      if (error.code === 4001) {
        toast.error('Connection cancelled', {
          description: 'You cancelled the wallet connection request'
        });
      } else {
        toast.error('Failed to connect wallet', {
          description: 'Please try again and approve the connection request in Lace'
        });
      }
      return false;
    } finally {
      setConnecting(false);
    }
  }, [user, laceInstalled, initializeClient]);

  const refreshLaceDetection = () => {
    checkLaceInstalled();
    if (laceInstalled) {
      toast.success('Lace Wallet detected! You can now connect.');
    } else {
      toast.error('Lace Wallet still not detected. Please ensure it\'s installed and refresh the page.');
    }
  };

  return {
    walletConnected,
    walletAddress,
    connecting,
    laceInstalled,
    connectWallet,
    refreshLaceDetection,
  };
};
