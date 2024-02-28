import React, { useState } from 'react';
import { Alert, View, TextInput, Button } from 'react-native';
import { useAuth } from '@/contexts/AuthProvider';
import { router } from 'expo-router';

const SignupScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUpWithEmailAndPassword } = useAuth();
  const { replace } = router;

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!email || !password || !displayName) {
        throw new Error('Please fill out all fields');
      }

      await signUpWithEmailAndPassword(email, password, displayName);
      replace('/');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };
  const navigateToLogin = () => {
    // Navigate to the login screen here
    replace('/login');
  };

  return (
    <View className="flex-col justify-center px-10 h-[100vh] w-[100vw]">
      <TextInput
        className="border border-gray-300 p-2 rounded h-10 bg-white text-black "
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
        placeholder="Display Name"
        aria-label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
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
      <TextInput
        className="border border-gray-300 p-2 rounded mt-4 h-10 bg-white text-black"
        placeholder="Confirm Password"
        aria-label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="password"
      />
      <View className="mt-4">
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <View className="mt-2">
        <Button title="Go Back" onPress={navigateToLogin} color="red" />
      </View>
    </View>
  );
};

export default SignupScreen;
