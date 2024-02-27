import { useAuth } from '@/contexts/AuthProvider';
import { View, Text, Pressable } from 'react-native';

const Header = () => {
  const { signOutSession } = useAuth();

  return (
    <View className="bg-green-500 h-[100px] p-4 items-end justify-between flex-row">
      <Text className="text-white text-2xl">RPG Stepper</Text>
      <Pressable className="text-white text-lg" onPress={signOutSession}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default Header;
