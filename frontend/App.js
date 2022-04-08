import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NativeRouter, Route, Routes } from "react-router-native";
// import Login from "./src/routes/Login";
// import Calendar from "./src/routes/Calendar";
// import { CALENDAR_PATH_NAME, LOGIN_PATH_NAME } from "./src/utils/constant";
// import { usePersistedStore } from "./src/store";
// import { Button, IconButton, Text } from "react-native-paper";
// import { Feather } from '@expo/vector-icons'; 
import BottomTabNavigation from "./src/components/BottomTabNavigation";

LogBox.ignoreLogs(['zustand']);

// url to debug expo
// http://localhost:19000/debugger-ui/
const App = () => {
  // const authToken = usePersistedStore((state) => state.auth_token)
  // const Stack = createNativeStackNavigator();

  return (
  // Added react navigation check docs here 
  // # https://reactnavigation.org/docs/getting-started
    
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={LOGIN_PATH_NAME}>
        <Stack.Screen name={LOGIN_PATH_NAME} component={Login}   />
        <Stack.Screen name={CALENDAR_PATH_NAME} component={Calendar} options={{
          // title: "My Calendar",
          // headerTitleAlign: "center",
          headerRight: () => (
            // <Icon name="rocket" size={30} color="#900" />
            <Button onPress={() => console.log("menu")} icon="mail"loading={false}></Button>
            
          )
        }} />
      
      </Stack.Navigator> */}
      <BottomTabNavigation />
    </NavigationContainer>
    
  );
};

export default App;
