
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface AidRequest {
  id: string;
  user_id: string;
  request_type: string;
  amount: number;
  description?: string;
  location: string;
  urgency_level: number;
  need_score: number;
  status: string;
  zk_proof_hash?: string;
  midnight_tx_hash?: string;
  created_at: string;
  updated_at: string;
}

export const useAidRequests = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['aid-requests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('aid_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AidRequest[];
    },
    enabled: !!user,
  });
};

export const useCreateAidRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (request: Partial<AidRequest>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('aid_requests')
        .insert({
          ...request,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aid-requests'] });
      toast.success('Aid request submitted successfully');
    },
    onError: (error) => {
      toast.error('Failed to submit aid request', {
        description: error.message,
      });
    },
  });
};
