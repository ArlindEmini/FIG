import React, { useState } from "react";
import { View } from "react-native";
import { List, Searchbar } from 'react-native-paper';

import ClientList from "./ClientList";
import { styles } from "./styles";
import PropTypes from "prop-types"

const Client = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEnterprise, setExpandedEnterprise] = useState(true);
  const [expandedPrive, setExpandedPrive] = useState(true);

  const onChangeSearch = query => {
    setSearchQuery(query);
  }

  const handlePressEnterprise = () => setExpandedEnterprise(!expandedEnterprise);
  const handlePressPrive = () => setExpandedPrive(!expandedPrive);

  return (
    <>
      <View style={styles.mainView}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <List.Section>
          <List.Accordion
            title="Client Enterprise"
            expanded={expandedEnterprise}
            onPress={handlePressEnterprise}
          >
            <ClientList type="enterprise" navigation={navigation} />
          </List.Accordion>

          <List.Accordion
            title="Client Privé"
            expanded={expandedPrive}
            onPress={handlePressPrive}>
            <ClientList type="prive" navigation={navigation}/>
          </List.Accordion>
        </List.Section>
      </View>
      
    </>
  );
}

Client.propTypes = {
  navigation: PropTypes.object
}

export default Client;
