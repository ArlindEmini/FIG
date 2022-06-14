import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { loginStyles } from "./styles";
import PropTypes from 'prop-types';
import { CALENDAR_PATH_NAME } from "../../utils/constant";
import { usePersistedStore } from "../../store";
import Api from "../../utils/api";
import { LOGIN_URL } from "../../utils/constant";
import { verifyToken } from "../../utils/jwt";

const api = new Api();

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setAuthToken = usePersistedStore((state) => state.setAuthToken)

  const submitLogin = useCallback(async () => {
    const credentials = {
      username: username,
      password: password
    }

    const loginResponse = await api.POST(LOGIN_URL, credentials)
    const { data } = loginResponse;

    const tokenIsValid = await verifyToken(data && data.token || '');

    if (tokenIsValid) {
      setAuthToken(data)
      navigation.navigate(CALENDAR_PATH_NAME)
    }

  }, [username, password]);

  return (
    <>
      {/* Used for linear background colors */}
      <View style={loginStyles.mainView}>
        <Card style={loginStyles.card}>
          <Card.Content style={loginStyles.cardContent}>
            <Title style={loginStyles.title}>FIG</Title>
            <Paragraph>Multiservices Sàrl</Paragraph>
          </Card.Content>
        </Card>

        <View style={{ ...loginStyles.view, marginTop: "30%" }}>
          <TextInput
            style={loginStyles.container}
            placeholder="Identifiant"
            mode="outlined"
            label="Identifiant"
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />

          <TextInput
            style={loginStyles.container}
            placeholder="Identifiant"
            mode="outlined"
            label="Identifiant"
            secureTextEntry={true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />

          <Button
            style={loginStyles.container}
            mode="contained"
            color="#2497af"
            onPress={submitLogin}
          >
            Connexion
          </Button>
        </View>
      </View>
    </>
  );
};

Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
