// @@ React
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// @@ Screens
import TodosScreen from "../screens/TodosScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import CreateTodo from "../screens/CreateTodo";

// @@ Icons
import { Ionicons } from "@expo/vector-icons";

// @@ Constants
import PATHS from "../utils/paths";

// @@ i18n - language
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  const { t: translate } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={PATHS.todos}
        component={TodosScreen}
        options={{
          title: translate("todo.yourTodos"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={PATHS.createTodo}
        component={CreateTodo}
        options={{
          title: translate("labels.createTodo"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-sharp" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={PATHS.userInfo}
        component={UserInfoScreen}
        options={{
          title: translate("user.userInfo"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
