import React, {useState, useEffect} from 'react';
import SplashScreen from './components/SplashScreen';
import Routes from './Navigation/Routes';
import {LogBox} from 'react-native';
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  return showSplash ? <SplashScreen /> : isLoggedIn ? <Routes /> : <Routes />;
};

export default App;
