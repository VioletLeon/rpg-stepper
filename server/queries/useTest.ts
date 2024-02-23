import { useServer } from '@/contexts/ServerProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useTest = () => {
  const server = useServer();

  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      try {
        if (!server) throw new Error('Server instance not available');
        const { data } = await server.get('/test');
        return data;
      } catch (error) {
        console.error('Error fetching test data:', error);
        throw error; // Re-throw the error so React Query can catch it
      }
    },
  });
};
