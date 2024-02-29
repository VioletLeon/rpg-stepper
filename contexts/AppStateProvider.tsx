import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStateContextType {
  lastBackgroundTime: string | null;
  setLastBackgroundTime: (time: string) => void;
}

const defaultState: AppStateContextType = {
  lastBackgroundTime: null,
  setLastBackgroundTime: () => {},
};

const AppStateContext = createContext<AppStateContextType>(defaultState);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [lastBackgroundTime, setLastBackgroundTime] = useState<string | null>(
    null
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        const time = new Date().toISOString();
        setLastBackgroundTime(time);
        AsyncStorage.setItem('lastBackgroundTime', time);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const fetchLastBackgroundTime = async () => {
      const time = await AsyncStorage.getItem('lastBackgroundTime');
      if (time) {
        setLastBackgroundTime(time);
      }
    };
    fetchLastBackgroundTime();
  }, []);

  return (
    <AppStateContext.Provider
      value={{ lastBackgroundTime, setLastBackgroundTime }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType =>
  useContext(AppStateContext);
