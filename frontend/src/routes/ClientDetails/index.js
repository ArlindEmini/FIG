import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {  Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

import CustomCard from "../../components/Card";
import { styles } from "./styles";
import { usePersistedStore } from "../../store";
import { GET_CLIENTS } from "../../utils/constant";
import Api from "../../utils/api";
import moment from "moment";

function ClientDetails({ route }) {
  const { params } = route;
  const api = new Api();
  const authToken = usePersistedStore((state) => state.auth_token);
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setLoading(true);
        const authorizationHeader = {
          Authorization: authToken && authToken.token,
        };

        const response = await api.GET(
          `${GET_CLIENTS}/${params.clientId}`,
          api.setRequestHeaders(authorizationHeader)
        );

        setClient(response && response.data && response.data.client || {});
      } catch (error) {
        console.error("Error @ClientDetails", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientDetails();
    
  }, []);
  const onRefresh = () => { 
    setLoading(true);
    setRefreshing(true);
  }

  return (
    <>{loading ?
      // show loader
      <ActivityIndicator animating={true} style={styles.loader} size="large" /> :
      // main page view
      <ScrollView
        contentContainerStyle={styles.mainView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <CustomCard showActions={false} subTitle={""} title={client.full_name}>
          <Text>Contact: {client.contact}</Text>
          <Text>Email: {client.email}</Text>
          <Text>Updated on: {moment(client.updated_date).format("lll")}</Text>
        </CustomCard>

        <CustomCard showActions={false} subTitle={""} title={"Cahier des charges"}>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
        </CustomCard>
      </ScrollView>}
    </>
  )
}

ClientDetails.propTypes = {
  route: PropTypes.object,
}

export default ClientDetails
