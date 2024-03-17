// @@ React
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// @ Screens
import LoginRegisterScreen from "../screens/LoginRegisterScreen";

// @@ Constants
import PATHS from "../utils/paths";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PATHS.loginRegister}
        options={{
          headerShown: false,
        }}
        component={LoginRegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
