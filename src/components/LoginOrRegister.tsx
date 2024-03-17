// @@ React
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

// @@ Context
import { useAuth } from "../context/AuthContext";

// @@ Constants
import colors from "../utils/colors";

// @@ Components
import AppButton from "./shared/AppButton";
import AppText from "./shared/AppText";

interface iFormErrors {
  username: string | false;
  name: string | false;
  password: string | false;
}

const minPassLength = 6;
const minNameLength = 2;

const LoginOrRegister = () => {
  const { login, register } = useAuth();

  const { t: translate } = useTranslation();

  const [username, setUsername] = useState<string>("");

  const [name, setName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<iFormErrors>({
    username: false,
    name: false,
    password: false,
  });

  const handleSubmitForm = async () => {
    if (!username || username.length < minNameLength) {
      setFormErrors((prevState) => ({ ...prevState, username: "usernameErr" }));
      return;
    }
    if (!password || password.length < minPassLength) {
      setFormErrors((prevState) => ({ ...prevState, password: "usernameErr" }));
      return;
    }
    let res: any;
    if (isRegister) {
      if (!name || name.length < minNameLength) {
        setFormErrors((prevState) => ({ ...prevState, name: "usernameErr" }));
        return;
      }
      setIsLoading(true);
      res = await register({ username, password, name });
    } else {
      setIsLoading(true);
      res = await login({ username, password });
    }

    setIsLoading(false);
    if (res) {
      setErrMsg(res as string);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/app-icon.png")} style={styles.img} />
      <TextInput
        placeholder={translate("forms.username")}
        value={username}
        onChangeText={setUsername}
        editable={!isLoading}
        onChange={() => {
          setFormErrors({ name: false, password: false, username: false });
          setErrMsg("");
        }}
        style={[styles.input, formErrors.username ? styles.inputError : {}]}
      />
      {isRegister && (
        <TextInput
          placeholder={translate("forms.name")}
          value={name}
          editable={!isLoading}
          onChangeText={setName}
          onChange={() => {
            setFormErrors({ name: false, password: false, username: false });
            setErrMsg("");
          }}
          style={[styles.input, formErrors.name ? styles.inputError : {}]}
        />
      )}
      <TextInput
        placeholder={translate("forms.password")}
        value={password}
        editable={!isLoading}
        onChangeText={setPassword}
        onChange={() => {
          setFormErrors({ name: false, password: false, username: false });
          setErrMsg("");
        }}
        secureTextEntry
        style={[styles.input, formErrors.password ? styles.inputError : {}]}
      />

      {errMsg && (
        <View>
          <AppText style={styles.textErr}>
            {translate(`responseMsg.${errMsg}`)}
          </AppText>
        </View>
      )}

      {isRegister ? (
        <AppText>
          {translate("labels.haveAccount")}{" "}
          <AppText
            style={styles.linkText}
            onPress={() => setIsRegister(false)}
            disabled={isLoading}
          >
            {translate("labels.clickToLogin")}
          </AppText>{" "}
        </AppText>
      ) : (
        <AppText>
          {translate("labels.noAccount")}{" "}
          <AppText
            style={styles.linkText}
            onPress={() => setIsRegister(true)}
            disabled={isLoading}
          >
            {translate("labels.clickToRegister")}
          </AppText>
        </AppText>
      )}

      <View style={{ marginTop: 15 }}>
        <AppButton
          title={translate(`buttons.${isRegister ? "register" : "login"}`)}
          onPress={handleSubmitForm}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
    width: "80%",
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  img: {
    height: 200,
    width: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  linkText: {
    color: colors.success,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  textErr: {
    color: colors.error,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default LoginOrRegister;
