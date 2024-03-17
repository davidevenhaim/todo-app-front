// @@ React
import React from "react";
import { View } from "react-native";

// @@ Components
import TodoList from "../components/TodoList";

// @@ Types and constants
import PATHS from "../utils/paths";

interface Props {
  navigation: any;
}

const TodosScreen = ({ navigation }: Props) => {
  const navToEditTodo = (todoId: number) => {
    navigation.navigate(PATHS.createTodo, { todoId });
  };

  return (
    <View style={{ flex: 1 }}>
      <TodoList navToEditTodo={navToEditTodo} />
    </View>
  );
};

export default TodosScreen;
