// @@ React
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";

// @@ Context
import { useAuth } from "../context/AuthContext";

// @@ Constants
import { iTodo } from "../utils/types";
import colors from "../utils/colors";

// @@ Components
import AppText from "./shared/AppText";
import AppDivider from "./shared/AppDivider";

interface Props {
  navToEditTodo: (id: number) => void;
}

const TodoList = ({ navToEditTodo }: Props) => {
  const { user } = useAuth();

  const { t: translate } = useTranslation();

  const [todos, setTodos] = useState<iTodo[]>([]);

  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const toggleHideCompleted = () =>
    setShowCompleted((previousState) => !previousState);

  // Render individual todo item
  const renderTodoItem = ({ item }: { item: iTodo }) => (
    <TouchableOpacity
      onPress={() => navToEditTodo(item.id)}
      style={[
        styles.itemContainer,
        {
          borderColor: item.isCompleted ? colors.success : colors.warning,
          borderWidth: item.isCompleted ? 2.5 : 1,
        },
      ]}
    >
      <AppText style={styles.itemText}>{item.task}</AppText>
      <AppText>{item.isCompleted ? "Completed" : "Not Completed"}</AppText>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (user) {
      const { todos } = user;
      setTodos(todos);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !user?.todos) {
      return;
    }

    if (showCompleted) {
      const filteredTodods = user?.todos?.filter((item) => item.isCompleted);
      setTodos(filteredTodods);
    } else {
      setTodos(user?.todos);
    }
  }, [showCompleted]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <AppText style={{ fontSize: 16 }}>
            {`${translate("labels.hi")} ${user?.name}`}{" "}
            {`${translate("labels.todoCount")} ${todos?.length} ${
              showCompleted ? translate("labels.completed") + " " : ""
            }${translate("labels.todosCurrently")}`}{" "}
          </AppText>
          <View style={{ marginTop: 20 }}>
            <Switch
              style={styles.completeSwitch}
              onValueChange={toggleHideCompleted}
              value={showCompleted}
            />
            <AppText style={{ fontSize: 10 }}>
              {translate(
                `labels.${showCompleted ? "showCompleted" : "showAllTasks"}`
              )}
            </AppText>
          </View>
          <AppDivider />
        </View>
      </View>
      <FlatList
        data={todos || []}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item?.id.toString()}
        style={{
          padding: 10,
          marginBottom: 20,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 10,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  topContainer: {
    marginBottom: 10,
    alignContent: "flex-end",
  },
  itemContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    elevation: 3,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  itemText: {
    fontSize: 18,
    color: colors.text,
  },
  completeSwitch: {
    alignSelf: "flex-start",
  },
});

export default TodoList;
