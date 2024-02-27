import { useAuth } from '@/contexts/AuthProvider';

const RootLayout = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  return <div>Authenticated</div>;
};
