import React from "react"
import IonIcons from 'react-native-vector-icons/Ionicons';
import { CHECK_LIST_PATH_NAME, CLIENT_PATH_NAME, REPORT_PATH_NAME, URGENCIES_PATH_NAME, VACATIONS_PATH_NAME } from "../../utils/constant";

export const renderBottomNavIcon = (route, focused, color, size) => {
  let iconName;
  const routeName = route.name || ''

  if(routeName === CLIENT_PATH_NAME) {
    iconName = focused ? 'people' : 'people-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }

  if(routeName === CLIENT_PATH_NAME) {
    iconName = focused ? 'people' : 'people-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }

  if(routeName === CHECK_LIST_PATH_NAME) {
    iconName =  focused ? 'list' : 'list-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }

  if(routeName === REPORT_PATH_NAME) {
    iconName = focused ? 'document' : 'document-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }

  if(routeName === URGENCIES_PATH_NAME) {
    iconName = focused ? 'nuclear' : 'nuclear-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }

  if(routeName === VACATIONS_PATH_NAME) {
    iconName = focused ? 'help-buoy' : 'help-buoy-outline'

    return <IonIcons name={iconName} size={size} color={color} />;
  }
}