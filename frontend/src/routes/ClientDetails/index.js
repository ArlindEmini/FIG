import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {  Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

import CustomCard from "../../components/Card";
import { styles } from "./styles";
import { usePersistedStore } from "../../store";
import { GET_CLIENTS } from "../../utils/constant";
import Api from "../../utils/api";
import moment from "moment";
import { wait } from "../../utils/common";

function ClientDetails({ route }) {
  const { params } = route;
  const api = new Api();
  const authToken = usePersistedStore((state) => state.auth_token);
  const [client, setClient] = useState({});
  const [refreshing, setRefreshing] = useState(true);
  const [reloadColor, setReloadColor] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setRefreshing(true);
        const authorizationHeader = {
          Authorization: authToken && authToken.token,
        };

        const response = await api.GET(
          `${GET_CLIENTS}/${params.clientId}`,
          api.setRequestHeaders(authorizationHeader)
        );

        setClient(response && response.data && response.data.client || {});
        setReloadColor(false);
      } catch (error) {
        console.error("Error @ClientDetails", error);
      } finally {
        setRefreshing(false);
      }
    }

    fetchClientDetails();
    
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    })
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.mainView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <CustomCard
          showAvatar={true}
          showActions={false}
          subTitle={"test"}
          title={client.full_name}
          reloadColor={reloadColor}
        >
          <Text>Contact: {client.contact}</Text>
          <Text>Email: {client.email}</Text>
          <Text>Updated on: {moment(client.updated_date).format("lll")}</Text>
        </CustomCard>

        <CustomCard showActions={false} subTitle={""} title={"Cahier des charges"}>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
          <Text>Tonte du gazon.. 0/15</Text>
        </CustomCard>
      </ScrollView>
    </>
  )
}

ClientDetails.propTypes = {
  route: PropTypes.object,
}

export default ClientDetails
