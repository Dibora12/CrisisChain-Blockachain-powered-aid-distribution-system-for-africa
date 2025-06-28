
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Token {
  id: string;
  creator_id: string;
  name: string;
  symbol: string;
  supply: number;
  contract_address?: string;
  midnight_tx_hash?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Token[];
    },
  });
};

export const useCreateToken = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (token: { name: string; symbol: string; supply: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate Midnight smart contract deployment
      const contractAddress = `midnight_contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const midnightTxHash = `mint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('tokens')
        .insert({
          creator_id: user.id,
          name: token.name,
          symbol: token.symbol,
          supply: token.supply,
          contract_address: contractAddress,
          midnight_tx_hash: midnightTxHash,
          is_active: true,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
      toast.success('Privacy token created successfully', {
        description: `${data.name} (${data.symbol}) deployed on Midnight network`,
      });
    },
    onError: (error) => {
      toast.error('Failed to create token', {
        description: error.message,
      });
    },
  });
};
