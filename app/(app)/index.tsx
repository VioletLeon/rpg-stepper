import { Text, View } from 'react-native';
import { usePedometer } from '@/contexts/PedometerProvider'; // Adjust the import path as needed

export default function Index() {
  const { isPedometerAvailable, pastStepCount, currentStepCount } =
    usePedometer();

  return (
    <View className="flex-1 items-center justify-center mt-4">
      <Text className="text-base mb-2">
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text className="text-base mb-2">
        Steps taken in the last 24 hours: {pastStepCount}
      </Text>
      <Text className="text-base">
        Walk! And watch this go up: {currentStepCount}
      </Text>
    </View>
  );
}
