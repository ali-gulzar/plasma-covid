import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC2vqNKIk-b0u9dZE427k8SPXpqam3SquY",
  authDomain: "covidplasmafinder.firebaseapp.com",
  databaseURL: "https://covidplasmafinder.firebaseio.com",
  projectId: "covidplasmafinder",
  storageBucket: "covidplasmafinder.appspot.com",
  messagingSenderId: "131308743847",
  appId: "1:131308743847:web:1ab19f88fa4e207f87bf82",
  measurementId: "G-CYKYFDCRSZ"
};



export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  function intializeFirebase () {
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  };


  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'hello-brilliant': require('../assets/fonts/Hello-Brilliant.ttf'),
        });
        intializeFirebase();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
