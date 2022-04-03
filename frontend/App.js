import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NativeRouter, Route, Routes } from "react-router-native";
import Login from "./src/routes/Login";
import Calendar from "./src/routes/Calendar";
import {  CALENDAR_PATH_NAME, LOGIN_PATH_NAME } from "./src/utils/constant";
import  { usePersistedStore } from "./src/store";

LogBox.ignoreLogs(['Warning: ...']);

// url to debug expo
// http://localhost:19000/debugger-ui/
const App = () => {
  const authToken = usePersistedStore((state) => state.auth_token)
  const Stack = createNativeStackNavigator();
  console.log(authToken)

  return (
    // Added react navigation check docs here 
    // # https://reactnavigation.org/docs/getting-started
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={CALENDAR_PATH_NAME} component={Calendar} options={{
          title: "My Calendar",
          headerTitleAlign: "center"  
        }} /> 
        <Stack.Screen name={LOGIN_PATH_NAME} component={Login}  />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
