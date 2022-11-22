import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome } from '@expo/vector-icons'; 
import Client from '../../routes/Client';
import { CHECK_LIST_PATH_NAME, CLIENT_PATH_NAME, REPORT_PATH_NAME, URGENCIES_PATH_NAME, VACATIONS_PATH_NAME } from '../../utils/constant';
import CheckList from '../../routes/Checklist';
import Report from '../../routes/Report';
import Urgencies from '../../routes/Urgencies';
import Vacations from '../../routes/Vacations';
import { teal } from '../../utils/colors';
import { renderBottomNavIcon } from './helpers';
import { usePersistedStore } from '../../store';

const BottomTabNavigation = () => {
  const setAuthToken = usePersistedStore((state) => state.setAuthToken)

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => { return renderBottomNavIcon(route, focused, color, size) },
      tabBarActiveTintColor: teal,
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen 
        name={CLIENT_PATH_NAME} component={Client} options={() => ({
          title: 'Client',

        })
        }
        // TODO this is temporary just to test log out when we have logged in
        listeners={{
          tabPress: e => {
            console.log("pressed",e);
            setAuthToken(null)
          }
        }}
      />
      <Tab.Screen name={CHECK_LIST_PATH_NAME} component={CheckList}
      />
      <Tab.Screen name={REPORT_PATH_NAME} component={Report}  />
      <Tab.Screen name={URGENCIES_PATH_NAME} component={Urgencies} />
      <Tab.Screen name={VACATIONS_PATH_NAME} component={Vacations} />
    </Tab.Navigator>

  )
}

export default BottomTabNavigation
