import React, { useEffect, useState } from 'react'
import { List, Text } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { warning } from '../../utils/colors';
import PropTypes from 'prop-types';

const ClientList = ({ type }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    console.log("Rendered", type);
    if (type == 'prive') {
      setClients([])
    } else {
      setClients(
        [{
          id: 1,
          name: 'PPE Bel-orne'
        }]
      )
    }
  }, []);

  if (!clients.length) return (
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
        onPress={() => alert(`Selected ${i.name}`)} />)}
    </>
  )
}

ClientList.propTypes = {
  type: PropTypes.string
}

export default ClientList
