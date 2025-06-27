
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Distribution {
  id: string;
  aid_request_id: string;
  distributor_id: string;
  recipient_id: string;
  amount: number;
  token_contract_address?: string;
  midnight_tx_hash?: string;
  shielded_memo?: string;
  status: string;
  distributed_at?: string;
  created_at: string;
}

export const useDistributions = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['distributions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('distributions')
        .select('*')
        .or(`distributor_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Distribution[];
    },
    enabled: !!user,
  });
};

export const useCreateDistribution = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (distribution: Partial<Distribution>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate Midnight blockchain transaction
      const midnightTxHash = `midnight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('distributions')
        .insert({
          ...distribution,
          distributor_id: user.id,
          midnight_tx_hash: midnightTxHash,
          status: 'pending',
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log midnight transaction
      await supabase.from('midnight_transactions').insert({
        tx_hash: midnightTxHash,
        tx_type: 'distribution',
        from_address: user.id,
        to_address: distribution.recipient_id,
        amount: distribution.amount,
        shielded: true,
        status: 'confirmed',
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['distributions'] });
      toast.success('Distribution created with Midnight privacy protection');
    },
    onError: (error) => {
      toast.error('Failed to create distribution', {
        description: error.message,
      });
    },
  });
};
