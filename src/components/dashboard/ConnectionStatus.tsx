import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, Wallet, Database, ExternalLink, Cpu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSmartContracts } from '@/hooks/useSmartContracts';
import { toast } from 'sonner';

export function ConnectionStatus() {
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [laceInstalled, setLaceInstalled] = useState(false);
  const { user } = useAuth();
  const { isConnected: smartContractConnected, initializeClient, isLoading: contractLoading } = useSmartContracts();

  useEffect(() => {
    checkSupabaseConnection();
    checkLaceInstalled();
    if (user) {
      checkExistingWalletAddress();
    }
  }, [user]);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      setSupabaseConnected(!error);
    } catch (error) {
      setSupabaseConnected(false);
    }
  };

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

  const openLaceWebsite = () => {
    window.open('https://www.lace.io/', '_blank');
  };

  const connectWallet = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    if (!laceInstalled) {
      toast.error('Lace Wallet is not installed', {
        description: 'Please install Lace Wallet to continue',
        action: {
          label: 'Install Lace',
          onClick: openLaceWebsite
        }
      });
      return;
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
    } finally {
      setConnecting(false);
    }
  };

  const refreshLaceDetection = () => {
    checkLaceInstalled();
    if (laceInstalled) {
      toast.success('Lace Wallet detected! You can now connect.');
    } else {
      toast.error('Lace Wallet still not detected. Please ensure it\'s installed and refresh the page.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          System Connections
        </CardTitle>
        <CardDescription>
          Monitor the status of critical system connections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Supabase Database</span>
          </div>
          {supabaseConnected ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Lace Wallet</span>
          </div>
          <div className="flex items-center gap-2">
            {walletConnected ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-xs text-muted-foreground">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                {!laceInstalled ? (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={openLaceWebsite}
                      variant="outline"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Install Lace
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={refreshLaceDetection}
                      variant="ghost"
                    >
                      Refresh
                    </Button>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={connectWallet}
                    disabled={connecting}
                  >
                    {connecting && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                    Connect
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Smart Contracts</span>
          </div>
          <div className="flex items-center gap-2">
            {smartContractConnected ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-xs text-muted-foreground">
                  Midnight Network
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                {contractLoading && <Loader2 className="h-3 w-3 animate-spin" />}
                <span className="text-xs text-muted-foreground">
                  {walletConnected ? 'Connecting...' : 'Requires Wallet'}
                </span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
