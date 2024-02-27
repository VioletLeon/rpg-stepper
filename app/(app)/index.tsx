import { useAuth } from '@/contexts/AuthProvider';
import { Text, View } from 'react-native';

export default function Index() {
  const { currentUser, loading } = useAuth();

  console.log(currentUser);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          console.log('Signed out');
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
