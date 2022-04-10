import React, { useState, useEffect } from 'react'
import {ActivityIndicator} from "react-native"
import { List, Text } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { warning } from '../../utils/colors';
import PropTypes from 'prop-types';
import { CLIENT_DETAILS_PATH_NAME } from '../../utils/constant';

const ClientList = ({ type, navigation }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let newClients = [];
      const size = type === 'prive' ? 5 : 3;
      for (let i = 0; i < size; i++) {
        newClients.push({
          type,
          id: Math.random(),
          name: `Cl-${type}-${Math.random()}`
        })
      }
      setClients(newClients);
      setLoading(false);
    }, 2000)
  }, []);

  if(loading) return (<ActivityIndicator animating={true} size="large" />)

  if (!clients || !clients.length) return (
    <Text style={{ marginLeft: 20, marginTop: 5, color: warning }}><IonIcons name="warning" color={warning} /> No Clients</Text>
  )

  return (
    <>
      {clients.map(i => <List.Item
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
}

export default ClientList
