import React from 'react'
import { List, Text } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { warning } from '../../utils/colors';
import PropTypes from 'prop-types';
import { CLIENT_DETAILS_PATH_NAME } from '../../utils/constant';

const ClientList = ({ type, navigation }) => {
  const [clients, setClients] = useState([]);

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
