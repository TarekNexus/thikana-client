import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useMyAgreement = () => {
  const { user, loading } = useAuth();

  const { data: agreement, isLoading } = useQuery({
    queryKey: ['myAgreement', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get('http://localhost:4000/agreements',{
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});
      const all = res.data;
      const matched = all.find(
        (item) => item.userEmail === user.email && item.status === 'checked'
      );
      return matched || null;
    },
  });

  return { agreement, loading: isLoading || loading };
};

export default useMyAgreement;
