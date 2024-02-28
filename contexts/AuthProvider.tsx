import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import type { ReactNode } from 'react';
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signOutSession: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component that wraps your app and makes auth object
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = getAuth();
  // GoogleSignin.configure();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  const signOutSession = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // // Login with Google function
  // const loginWithGoogle = async () => {
  //   try {
  //     // Assuming you have configured Google sign-in in your app and have the GoogleSignIn library
  //     const { idToken } = await GoogleSignin.signIn();
  //     const googleCredential = GoogleAuthProvider.credential(idToken);
  //     const userCredential = await signInWithCredential(auth, googleCredential);
  //     setCurrentUser(userCredential.user);
  //   } catch (error) {
  //     console.error('Error logging in with Google', error);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signUpWithEmailAndPassword: signUpWithEmail,
        signInWithEmailAndPassword: signInWithEmail,
        loginWithGoogle,
        signOutSession,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
