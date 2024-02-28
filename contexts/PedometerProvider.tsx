import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Pedometer } from 'expo-sensors';

interface PedometerContextType {
  isPedometerAvailable: string;
  pastStepCount: number;
  currentStepCount: number;
}

const PedometerContext = createContext<PedometerContextType | undefined>(
  undefined
);

interface PedometerProviderProps {
  children: ReactNode;
}

export const PedometerProvider = ({ children }: PedometerProviderProps) => {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<string>('checking');
  const [pastStepCount, setPastStepCount] = useState<number>(0);
  const [currentStepCount, setCurrentStepCount] = useState<number>(0);

  useEffect(() => {
    let subscription: Pedometer.Subscription | null = null;

    async function checkPermissionsAndSubscribe() {
      // Check permissions
      const { status: existingStatus } = await Pedometer.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        // Permissions have not already been granted, so request them
        const { status: newStatus } = await Pedometer.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      if (finalStatus === 'granted') {
        setIsPedometerAvailable('yes');

        // Permission is granted, start fetching pedometer data
        const isAvailable = await Pedometer.isAvailableAsync();
        if (isAvailable) {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);

          const pastStepCountResult = await Pedometer.getStepCountAsync(
            start,
            end
          );
          setPastStepCount(pastStepCountResult.steps);

          subscription = Pedometer.watchStepCount((result) => {
            setCurrentStepCount(result.steps);
          });
        } else {
          setIsPedometerAvailable('no');
        }
      } else {
        setIsPedometerAvailable('denied');
        // Permission was denied, handle accordingly
      }
    }

    checkPermissionsAndSubscribe();

    return () => subscription?.remove();
  }, []);

  return (
    <PedometerContext.Provider
      value={{ isPedometerAvailable, pastStepCount, currentStepCount }}
    >
      {children}
    </PedometerContext.Provider>
  );
};

export const usePedometer = (): PedometerContextType => {
  const context = useContext(PedometerContext);
  if (!context) {
    throw new Error('usePedometer must be used within a PedometerProvider');
  }
  return context;
};
