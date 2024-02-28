import { useAuth } from '@/contexts/AuthProvider';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signInWithEmailAndPassword } = useAuth();
  const { replace } = router;

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleSignUp = () => {
    replace('/signup');
  };
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await loginWithGoogle();
  //   } catch (error: any) {
  //     Alert.alert('Login with Google Failed', error.message);
  //   }
  // };

  return (
    <View className="flex-col justify-center px-10 h-[100vh] w-[100vw]">
      <TextInput
        className="border border-gray-300 p-2 rounded h-10 bg-white text-black"
        placeholder="Email"
        aria-label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mt-4 h-10 bg-white text-black"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
      <View className="mt-4">
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <View className="mt-2">
        <Button title="Sign Up" onPress={handleSignUp} color="gray" />
      </View>
      {/* <Text className="text-center mt-4">Or</Text> */}
      {/* Implement any other authentication methods here */}
      {/* <View className="mt-2">
        <Button
          title="Login with Google"
          onPress={handleGoogleSignIn}
          color="gray"
        />
      </View> */}
    </View>
  );
}
