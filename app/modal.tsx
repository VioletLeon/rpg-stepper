import { useTest } from '@/server/queries/useTest';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from 'react-native';

export default function ModalScreen() {
  const { data, isLoading, isError } = useTest();

  console.log(data, isLoading, isError);

  return (
    <View>
      <Text></Text>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
