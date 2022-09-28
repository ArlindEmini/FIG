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
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const authorizationHeader = {
      Authorization: authToken && authToken.token,
    };

    setLoadingClients(true);
    try {
      const response = await api.GET(
        GET_CLIENTS,
        api.setRequestHeaders(authorizationHeader)
      );

      const clientsList = formatClientsDataForView(
        response.data.response || []
      );

      setClientsList(clientsList);
    } catch (error) {
      console.error("Error @Client", error);
    } finally {
      setLoadingClients(false);
      setRefresh(false);
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePressEnterprise = () => setExpandedEnterprise(!expandedEnterprise);
  const handlePressPrive = () => setExpandedPrive(!expandedPrive);

  const onRefresh = () => {
    setRefresh(true);
    fetchClients();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        >
          <List.Section>
            <List.Accordion
              title="Client Enterprise"
              expanded={expandedEnterprise}
              onPress={handlePressEnterprise}
            >
              <ClientList
                type="enterprise"
                searchQuery={searchQuery}
                navigation={navigation}
                loading={loadingClients}
                clients={clientsList}
              />
            </List.Accordion>

            <List.Accordion
              title="Client Privé"
              expanded={expandedPrive}
              onPress={handlePressPrive}
            >
              <ClientList
                type="private"
                searchQuery={searchQuery}
                navigation={navigation}
                loading={loadingClients}
                clients={clientsList}
              />
            </List.Accordion>
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

Client.propTypes = {
  navigation: PropTypes.object,
};

export default Client;
