import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { loginStyles } from "./styles";
import PropTypes from 'prop-types';
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
    let tokenIsValid = false;
    try {
      const loginResponse = await api.POST(LOGIN_URL, credentials) || {};
      const { data = {} } = loginResponse;
      const token = data && data.token;

      tokenIsValid = await verifyToken(token || '');
      if (tokenIsValid) {
        setAuthToken(data)
      }
    } catch (error) {
      console.error("Error @submitLogin", error);
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
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="default"
            keyboardAppearance="default"
            returnKeyType="next"
            blurOnSubmit={false}
          />

          <TextInput
            style={loginStyles.container}
            placeholder="Identifiant"
            mode="outlined"
            label="Identifiant"
            secureTextEntry={true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            onSubmitEditing={submitLogin}
            keyboardType="visible-password"
            returnKeyType="send"
            keyboardAppearance="default"
            ref={(input) => {this.passwordInput = input}}
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
