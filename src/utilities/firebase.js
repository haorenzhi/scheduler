import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, {useEffect, useState} from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyCc-yaS5mmGJk6z0wcmhYOicxbTEY4Fdn4",
    authDomain: "course-scheduler-41e17.firebaseapp.com",
    databaseURL: "https://course-scheduler-41e17-default-rtdb.firebaseio.com",
    projectId: "course-scheduler-41e17",
    storageBucket: "course-scheduler-41e17.appspot.com",
    messagingSenderId: "931954768332",
    appId: "1:931954768332:web:9bb2c5531c52b95ea48569"
  };

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };