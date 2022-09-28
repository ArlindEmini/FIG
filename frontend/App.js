import React from "react";
import { LogBox } from "react-native";
import {  DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { usePersistedStore } from "./src/store";
import AuthenticatedNavigation from "./src/components/AuthenticatedNavigation";
import AuthenticationNavigation from "./src/components/AuthenticationNavigation";
import { ToastProvider } from 'react-native-toast-notifications';

LogBox.ignoreLogs(['zustand']);

// url to debug expo
// http://localhost:19000/debugger-ui/
const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#85C7DE',
      accent: '#A0C4E2',
    },
  };
  const authToken = usePersistedStore((state) => state.auth_token)

  return (
  // Added react navigation check docs here 
  // # https://reactnavigation.org/docs/getting-started
    <ToastProvider
      offset={50}
    >
      <PaperProvider theme={theme}>
        {authToken ? <AuthenticatedNavigation /> : <AuthenticationNavigation/>}
      </PaperProvider>
    </ToastProvider>
    
  );
};

export default App;
