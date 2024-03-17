// @@ React
import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

// @@ Context
import { useAuth } from "../context/AuthContext";

// @@ Components
import UserProfile from "../components/UserProfile";
import AppButton from "../components/shared/AppButton";

// @@ Constants
import PATHS from "../utils/paths";
import colors from "../utils/colors";

interface Props {
  navigation: any;
}

const UserInfoScreen = ({ navigation }: Props) => {
  const { user, logout } = useAuth();

  const { t: translate } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && <UserProfile user={user} />}
      <View style={styles.btnContainer}>
        <AppButton title={translate("buttons.logout")} onPress={handleLogout} />
        <AppButton
          title={translate("buttons.createTodo")}
          color={colors.success}
          onPress={() => navigation.navigate(PATHS.createTodo)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
  },
  btnContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default UserInfoScreen;
