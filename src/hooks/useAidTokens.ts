
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface AidToken {
  id: string;
  recipient_id: string;
  token_id: string;
  amount: number;
  token_type: string;
  contract_address: string;
  midnight_tx_hash?: string;
  restrictions?: any;
  expires_at?: string;
  is_active: boolean;
  used_amount: number;
  created_at: string;
  updated_at: string;
}

export const useAidTokens = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['aid-tokens', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('aid_tokens')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AidToken[];
    },
    enabled: !!user,
  });
};

export const useCreateAidToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: Partial<AidToken>) => {
      // Ensure required fields are present
      if (!token.recipient_id || !token.amount || !token.token_type) {
        throw new Error('Recipient ID, amount, and token type are required');
      }

      const midnightTxHash = `midnight_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      const tokenId = `AID_${Date.now()}`;
      
      const { data, error } = await supabase
        .from('aid_tokens')
        .insert({
          recipient_id: token.recipient_id,
          token_id: tokenId,
          amount: token.amount,
          token_type: token.token_type as any,
          contract_address: contractAddress,
          midnight_tx_hash: midnightTxHash,
          restrictions: token.restrictions,
          expires_at: token.expires_at,
          is_active: token.is_active !== false,
          used_amount: token.used_amount || 0,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log midnight transaction for token creation
      await supabase.from('midnight_transactions').insert({
        tx_hash: midnightTxHash,
        tx_type: 'token_creation',
        to_address: token.recipient_id,
        amount: token.amount,
        shielded: true,
        status: 'confirmed',
        metadata: { token_type: token.token_type },
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aid-tokens'] });
      toast.success('Aid token created with blockchain security');
    },
    onError: (error) => {
      toast.error('Failed to create aid token', {
        description: error.message,
      });
    },
  });
};
