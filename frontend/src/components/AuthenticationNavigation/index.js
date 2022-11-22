import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LOGIN_PATH_NAME } from '../../utils/constant';
import Login from '../../routes/Login';

const AuthenticationNavigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={LOGIN_PATH_NAME} component={Login}  options={() => ({
          title: 'Login',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthenticationNavigation 