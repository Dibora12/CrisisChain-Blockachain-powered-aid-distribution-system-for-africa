
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, Wallet, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function ConnectionStatus() {
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    checkSupabaseConnection();
    checkWalletConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      setSupabaseConnected(!error);
    } catch (error) {
      setSupabaseConnected(false);
    }
  };

  const checkWalletConnection = async () => {
    if (typeof window.cardano !== 'undefined' && window.cardano.lace) {
      try {
        const api = await window.cardano.lace.enable();
        const addresses = await api.getUsedAddresses();
        if (addresses.length > 0) {
          setWalletConnected(true);
          setWalletAddress(addresses[0]);
        }
      } catch (error) {
        setWalletConnected(false);
      }
    }
  };

  const connectWallet = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    setConnecting(true);
    try {
      if (typeof window.cardano === 'undefined' || !window.cardano.lace) {
        toast.error('Lace wallet not found', {
          description: 'Please install Lace wallet extension',
        });
        return;
      }

      const api = await window.cardano.lace.enable();
      const addresses = await api.getUsedAddresses();
      
      if (addresses.length > 0) {
        const address = addresses[0];
        setWalletConnected(true);
        setWalletAddress(address);

        // Save wallet address to user profile
        await supabase
          .from('profiles')
          .upsert({ 
            id: user.id, 
            wallet_address: address 
          });

        toast.success('Wallet connected successfully', {
          description: `Connected to ${address.slice(0, 8)}...${address.slice(-6)}`,
        });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast.error('Failed to connect wallet', {
        description: 'Please try again and approve the connection',
      });
    } finally {
      setConnecting(false);
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
            <span>Midnight Wallet</span>
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
                <Button 
                  size="sm" 
                  onClick={connectWallet}
                  disabled={connecting}
                >
                  {connecting && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
