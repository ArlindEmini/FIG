import React from "react"
import IonIcons from 'react-native-vector-icons/Ionicons';
import { CHECK_LIST_PATH_NAME, CLIENT_PATH_NAME, NOTIFICATIONS_PATH_NAME, REPORT_PATH_NAME, URGENCIES_PATH_NAME, VACATIONS_PATH_NAME } from "../../utils/constant";

export const renderBottomNavIcon = (route, focused, color, size) => {
  let iconName;
  const routeName = route.name || ''

  if(routeName === CLIENT_PATH_NAME) {
    iconName = focused ? 'people' : 'people-outline'
  }

  if(routeName === CHECK_LIST_PATH_NAME) {
    iconName = focused ? 'list' : 'list-outline'
  }

  if(routeName === REPORT_PATH_NAME) {
    iconName = focused ? 'document' : 'document-outline'
  }

  if(routeName === URGENCIES_PATH_NAME) {
    iconName = focused ? 'nuclear' : 'nuclear-outline'
  }

  if(routeName === VACATIONS_PATH_NAME) {
    iconName = focused ? 'help-buoy' : 'help-buoy-outline'
  }

  if (routeName === NOTIFICATIONS_PATH_NAME) {
    iconName = focused ? 'notifications' : 'notifications-outline'
  }

  return <IonIcons name={iconName} size={size} color={color} />;
}
