import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

const useAuth:any = () => {
  const [currentUser, setCurrentUser]:any = useState({}); // Định nghĩa kiểu dữ liệu

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

  });

  return {
    currentUser,
  };
};

export default useAuth;