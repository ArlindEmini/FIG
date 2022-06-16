import React, { useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { List, Searchbar } from 'react-native-paper';

import ClientList from "./ClientList";
import { styles } from "./styles";
import PropTypes from "prop-types"
import { wait } from "../../utils/common";

const Client = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEnterprise, setExpandedEnterprise] = useState(true);
  const [expandedPrive, setExpandedPrive] = useState(true);
  const [refreshEnterprise, setRefreshEnterprise] = useState(false);

  const onChangeSearch = query => {
    setSearchQuery(query);
  }

  const handlePressEnterprise = () => setExpandedEnterprise(!expandedEnterprise);
  const handlePressPrive = () => setExpandedPrive(!expandedPrive);

  const onRefreshEnterprise = () => {
    setRefreshEnterprise(true);
    wait(5000).then(() => setRefreshEnterprise(false));
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
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
              <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshEnterprise}
                    onRefresh={onRefreshEnterprise}
                  />
                }
              >
                <ClientList type="enterprise" navigation={navigation} />
              </ScrollView>
            </List.Accordion>

            <List.Accordion
              title="Client Privé"
              expanded={expandedPrive}
              onPress={handlePressPrive}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
              >
                <ClientList type="prive" navigation={navigation} />
              </ScrollView>
            </List.Accordion>
          </List.Section>
        </View>
      </SafeAreaView>
    </>
  );
}

Client.propTypes = {
  navigation: PropTypes.object
}

export default Client;
