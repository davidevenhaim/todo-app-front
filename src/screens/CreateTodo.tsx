// @@ React
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";

// @@ Components
import CreateEditTodoForm from "../components/CreateEditTodoForm";

// Constants
import PATHS from "../utils/paths";

interface Props {
  route: RouteProp<any, any>;
  navigation: any;
}

const CreateTodo = ({ route, navigation }: Props) => {
  const [todoId, setTodoId] = useState<number>();

  const afterSubmitNavigation = () => {
    navigation.navigate(PATHS.todos);
  };

  useEffect(() => {
    if (route?.params?.todoId) {
      setTodoId(route.params.todoId as number);
    }
  }, [route]);

  return (
    <View>
      <CreateEditTodoForm
        todoId={todoId}
        navigation={navigation}
        afterSubmitNavigation={afterSubmitNavigation}
      />
    </View>
  );
};

export default CreateTodo;
