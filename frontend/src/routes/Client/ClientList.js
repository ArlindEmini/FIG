import React from 'react'
import {ActivityIndicator} from "react-native"
import { List, Text } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { warning } from '../../utils/colors';
import PropTypes from 'prop-types';
import { CLIENT_DETAILS_PATH_NAME } from '../../utils/constant';

import { getClientsByType, searchClientsByName } from './helpers';

const ClientList = ({ type, navigation, clients = [], loading = false, searchQuery = ''}) => {
  if(loading) return (<ActivityIndicator animating={true} size="large" />)

  if (!clients || !clients.length) return (
    <Text style={{ marginLeft: 20, marginTop: 5, color: warning }}><IonIcons name="warning" color={warning} /> No Clients</Text>
  )

  const clientsByType = getClientsByType(clients, type);
  const clientList = searchClientsByName(clientsByType, searchQuery)

  return (
    <>
      {clientList.map(i => <List.Item
        key={i.id}
        title={i.name}
        style={{
          marginLeft: 10
        }}
        onPress={() => navigation.navigate(CLIENT_DETAILS_PATH_NAME, {
          clientId: i.id
        })} />)}
    </>
  )
}

ClientList.propTypes = {
  type:  PropTypes.string,
  navigation: PropTypes.object,
  clients: PropTypes.array,
  loading: PropTypes.bool,
  searchQuery: PropTypes.string
}

export default ClientList
