import { useAuth } from '@/contexts/AuthProvider';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signInWithEmailAndPassword, signUpWithEmailAndPassword } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };
  return (
    <View className="flex-col px-4 h-[100vh] w-[100vw]">
      <TextInput
        className="border border-gray-300 p-2 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mt-4"
        placeholder="Password"
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
      <Text className="text-center mt-4">Or</Text>
      {/* Implement any other authentication methods here */}
    </View>
  );
}
