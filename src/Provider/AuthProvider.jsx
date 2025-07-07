import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../firebase/firebase.config';
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null)
  const [loading, setLoding] = useState(true);

  const createUser = (email, password) => {
       setLoding(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
   const logOut = () => {
        return signOut(auth);
    };
     const signIn = (email, password) => {
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
const signInWithGoogle = () => {
        setLoding(true)
        
        return signInWithPopup(auth, provider);
    }

    
  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
           setLoding(false)
           
        });
        return () => {
            unsubscribe();

        };

    }, []);


  const authData={
     user,
        setUser,
        createUser,
        logOut,
        signIn,
        signInWithGoogle,
        loading,
        setLoding ,

  }



    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;