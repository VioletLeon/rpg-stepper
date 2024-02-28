import React, { createContext, useContext, ReactNode } from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Adjust the import path as needed
import { skills, User } from '@/types/User.type';

interface FirestoreContextType {
  createUser: (
    userId: string,
    userData: {
      email: string;
      displayName: string;
    }
  ) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const FirestoreContext = createContext<FirestoreContextType | undefined>(
  undefined
);

interface FirestoreProviderProps {
  children: ReactNode;
}

export const FirestoreProvider = ({ children }: FirestoreProviderProps) => {
  const createUser = async (
    userId: string,
    userData: {
      email: string;
      displayName: string;
    }
  ) => {
    const userMap = {
      email: userData.email,
      displayName: userData.displayName,
      skills: {} as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    skills.forEach((skill) => {
      switch (skill) {
        case 'Hitpoints':
          userMap.skills[skill] = { exp: 1154, level: 10 };
          break;
        default:
          userMap.skills[skill] = { exp: 0, level: 1 };
          break;
      }
    });

    await setDoc(doc(db, 'users', userId), userMap);
  };

  const deleteUser = async (userId: string) => {
    await deleteDoc(doc(db, 'users', userId));
  };

  return (
    <FirestoreContext.Provider value={{ createUser, deleteUser }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = (): FirestoreContextType => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};
