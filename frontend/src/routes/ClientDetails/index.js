import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {  Text, ScrollView, ActivityIndicator } from "react-native";

import CustomCard from "../../components/Card";
import { styles } from "./styles";

function ClientDetails({ route }) {
  const { params } = route;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... fetch client details
    console.log({ params })
    setTimeout(() => setLoading(false), 5000);
  })

  return (
    <>{loading ?
      // show loader
      <ActivityIndicator animating={true} style={styles.loader} size="large" /> :
      // main page view
      <ScrollView contentContainerStyle={styles.mainView}>
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
