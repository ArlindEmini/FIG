import React from 'react'
import { List, Text } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { warning } from '../../utils/colors';
import PropTypes from 'prop-types';
import { clientStore } from '../../store';

const ClientList = ({ type }) => {
  const clients = clientStore(state => type === 'prive' ? state.priveClients : state.enterpriseClients) || [];
  const addClient = clientStore(state => state.addClient);

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
        onPress={() => addClient({id: Math.random(), name: "testali" + Math.random()}, type)} />)}
    </>
  )
}

ClientList.propTypes = {
  type: PropTypes.string
}

export default ClientList
