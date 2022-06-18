import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {  Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

import CustomCard from "../../components/Card";
import { styles } from "./styles";
import { wait } from "../../utils/common";

function ClientDetails({ route }) {
  const { params } = route;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    // ... fetch client details
    console.log({ params })
    wait(5000).then(() => setLoading(false));
  });
  const onRefresh = () => { 
    setLoading(true);
    setRefreshing(true);
    wait(5000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
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
        <CustomCard showActions={false} subTitle={""} title={"PPE Bel-orne:"}>
          <Text>Contact: {params.clientId}</Text>
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
