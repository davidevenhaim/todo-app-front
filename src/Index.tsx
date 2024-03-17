// @@ React
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";

// @@ Hooks
import { handleSetDefaultToken, useAuth } from "./context/AuthContext";

// @@ Screens
import MainStack from "./navigation/MainStack";
import AuthStack from "./navigation/AuthenticationStack";

// @@ Async Storage
import storage from "./context/AsyncStorage";
import { userLocalStorageKey } from "./utils/config";

// @@ API
import { decodeToken } from "./utils/api";

// @@ Types
import { iUser } from "./utils/types";

// @@ Components
import AppLoading from "./components/shared/AppLoading";

const Index = () => {
  const { user, handleSetUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await storage.load({
          key: userLocalStorageKey,
          autoSync: true,
        });
        if (res) {
          const { token } = res;
          const decodedToken = await decodeToken(token);
          const currentUser = decodedToken.data as iUser;
          if (currentUser.id) {
            handleSetUser(currentUser);
            handleSetDefaultToken(token);
          }
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    if (!user?.id) {
      // if user is not defined yet
      func();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <AppLoading />
      ) : (
        <NavigationContainer>
          {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

export default Index;
