import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CLIENT_DETAILS_PATH_NAME, HOME_PATH_NAME } from '../../utils/constant';
import ClientDetails from '../../routes/ClientDetails';
import { Button } from 'react-native-paper';
import BottomTabNavigation from '../BottomTabNavigation';

const AuthenticatedNavigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={HOME_PATH_NAME} component={BottomTabNavigation} options={{
          headerShown: false
        }}/>
        <Stack.Screen name={CLIENT_DETAILS_PATH_NAME} component={ClientDetails}  options={() => ({
          title: 'Client Details',
          headerRight: () => (<Button onPress={() => alert('reload')} icon="refresh" />)
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthenticatedNavigation 