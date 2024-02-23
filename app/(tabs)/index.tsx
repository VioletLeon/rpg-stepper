import { Text, View } from 'react-native';
import { useTest } from '@/server/queries/useTest';

export default function TabOneScreen() {
  const { data, isLoading, isError } = useTest();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <View>
      <Text>{data.message}</Text>
    </View>
  );
}
