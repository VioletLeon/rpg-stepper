import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Pedometer } from 'expo-sensors';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import { Platform } from 'react-native';
import { useAppState } from './AppStateProvider';

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
  const { lastBackgroundTime } = useAppState();

  console.log(lastBackgroundTime, 'lastBackgroundTime');

  useEffect(() => {
    let subscription: Pedometer.Subscription | null = null;

    async function checkPermissionsAndSubscribe() {
      // Check permissions
      const { status: existingStatus } = await Pedometer.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log('existingStatus', finalStatus);

      if (existingStatus !== 'granted') {
        // Permissions have not already been granted, so request them
        const { status: newStatus } = await Pedometer.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      if (finalStatus === 'granted') {
        setIsPedometerAvailable('yes');
        // Permission is granted, start fetching pedometer data
        const isAvailable = await Pedometer.isAvailableAsync();
        console.log(isAvailable);
        if (isAvailable) {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);

          // // This only works iOS, on Android it will return 0
          // const pastStepCountResult = await Pedometer.getStepCountAsync(
          //   start,
          //   end
          // );
          // setPastStepCount(pastStepCountResult.steps);

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

    const fetchStepsFromGoogleFit = () => {};

    const fetchStepsAppleHealthKit = () => {
      const permissions = {
        permissions: {
          read: [AppleHealthKit.Constants.Permissions.HeartRate],
          write: [AppleHealthKit.Constants.Permissions.Steps],
        },
      } as HealthKitPermissions;

      AppleHealthKit.initHealthKit(permissions, (err: any) => {
        if (err) {
          console.log('error initializing Healthkit: ', err);
          return;
        }

        if (lastBackgroundTime === null) {
          return;
        }

        const startDate = new Date(lastBackgroundTime).toISOString();
        const endDate = new Date().toISOString();

        AppleHealthKit.getStepCount(
          {
            startDate,
            endDate,
          },
          (err: any, results: HealthValue) => {
            if (err) {
              console.log('error reading step count: ', err);
              return;
            }
            console.log('Results', results);
            setPastStepCount(results.value);
          }
        );
      });
    };

    if (Platform.OS === 'ios') {
      fetchStepsAppleHealthKit();
    } else if (Platform.OS === 'android') {
      fetchStepsFromGoogleFit();
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
