import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import {  Text, ScrollView} from "react-native";

import CustomCard from "../../components/Card";
import { styles } from "./styles";

function ClientDetails({ route }) {

  const { params } = route;

  useEffect(() => {

    // ... fetch client details
  })

  return (
    <>
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
      </ScrollView>
    </>
  )
}

ClientDetails.propTypes = {
  route: PropTypes.object,
}

export default ClientDetails