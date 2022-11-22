import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { List, Searchbar } from "react-native-paper";

import ClientList from "./ClientList";
import { styles } from "./styles";
import PropTypes from "prop-types";
import { wait } from "../../utils/common";
import { usePersistedStore } from "../../store";
import Api from "../../utils/api";
import { GET_CLIENTS } from "../../utils/constant";
import { formatClientsDataForView } from "./helpers";

const Client = ({ navigation }) => {
  const api = new Api();
  const authToken = usePersistedStore((state) => state.auth_token);

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedEnterprise, setExpandedEnterprise] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);
  const [clientsList, setClientsList] = useState([]);
  const [expandedPrive, setExpandedPrive] = useState(true);
  const [refreshEnterprise, setRefreshEnterprise] = useState(false);
  useEffect(() => {
    const fetchClients = async () => {
      const authorizationHeader = {
        Authorization: authToken && authToken.token,
      };

      setLoadingClients(true);
      const response = await api.GET(
        GET_CLIENTS,
        api.setRequestHeaders(authorizationHeader)
      );

      const clientsList = formatClientsDataForView(
        response.data.response || []
      );
     
      setLoadingClients(false);
      setClientsList(clientsList);
    };

    fetchClients();
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePressEnterprise = () => setExpandedEnterprise(!expandedEnterprise);
  const handlePressPrive = () => setExpandedPrive(!expandedPrive);

  const onRefreshEnterprise = () => {
    setRefreshEnterprise(true);
    wait(5000).then(() => setRefreshEnterprise(false));
  };

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
                <ClientList
                  type="enterprise"
                  searchQuery={searchQuery}
                  navigation={navigation}
                  loading={loadingClients}
                  clients={clientsList}
                />
              </ScrollView>
            </List.Accordion>

            <List.Accordion
              title="Client Privé"
              expanded={expandedPrive}
              onPress={handlePressPrive}
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
                <ClientList
                  type="private"
                  searchQuery={searchQuery}
                  navigation={navigation}
                  loading={loadingClients}
                  clients={clientsList}
                />
              </ScrollView>
            </List.Accordion>
          </List.Section>
        </View>
      </SafeAreaView>
    </>
  );
};

Client.propTypes = {
  navigation: PropTypes.object,
};

export default Client;
