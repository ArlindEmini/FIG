import React from "react";
import { LogBox } from "react-native";
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NativeRouter, Route, Routes } from "react-router-native";
// import Login from "./src/routes/Login";
// import Calendar from "./src/routes/Calendar";
// import { CALENDAR_PATH_NAME, LOGIN_PATH_NAME } from "./src/utils/constant";
// import { usePersistedStore } from "./src/store";
// import { Button, IconButton, Text } from "react-native-paper";
// import { Feather } from '@expo/vector-icons'; 

import BottomTabNavigation from "./src/components/BottomTabNavigation";
import { CLIENT_DETAILS_PATH_NAME, HOME_PATH_NAME } from "./src/utils/constant";
import ClientDetails from "./src/routes/ClientDetails";

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
  // const authToken = usePersistedStore((state) => state.auth_token)
  const Stack = createNativeStackNavigator();

  return (
  // Added react navigation check docs here 
  // # https://reactnavigation.org/docs/getting-started
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={HOME_PATH_NAME} component={BottomTabNavigation} />
          <Stack.Screen name={CLIENT_DETAILS_PATH_NAME} component={ClientDetails}  options={() => ({
            title: 'Client Details',
            headerRight: () => (<Button onPress={() => alert('reload')} icon="refresh" />)
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
};

export default App;
