import { AxiosInstance } from 'axios';
import { createContext, useContext } from 'react';
import server from '@/server/client/server';

export const ServerContext = createContext<AxiosInstance | null>(null);

export const useServer = () => {
  const context = useContext(ServerContext);

  if (typeof context === 'undefined') {
    throw new Error('useServer must be used within a ServerProvider');
  }

  console.log('Context fine', typeof context, context);
  return context;
};

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('server provider init', server);
  return (
    <ServerContext.Provider value={server}>{children}</ServerContext.Provider>
  );
};

export default ServerProvider;
