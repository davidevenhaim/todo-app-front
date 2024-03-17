// @@ React
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

// @@ Context
import { useAuth } from "../context/AuthContext";

// @@ Api
import { createTodo, deleteTodo, updateTodo } from "../utils/api";

// @@ Components
import AppLoading from "./shared/AppLoading";
import AppButton from "./shared/AppButton";
import AppText from "./shared/AppText";

// @@ Constants
import colors from "../utils/colors";
import { iTodo } from "../utils/types";
import { ServerCode } from "../utils/enums";

interface iFormErrors {
  task: string | false;
}

const minTaskLength = 2;

interface Props {
  todoId?: number;
  afterSubmitNavigation: () => void;
  navigation: any;
}

const CreateEditTodoForm = ({
  afterSubmitNavigation,
  navigation,
  todoId,
}: Props) => {
  const { user, handleSetUser } = useAuth();

  const { t: translate } = useTranslation();

  const [task, setTask] = useState<string>("");

  const [errMsg, setErrMsg] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [currentTodo, setCurrentTodo] = useState<iTodo>();

  const [formErrors, setFormErrors] = useState<iFormErrors>({
    task: false,
  });

  const handleSubmitForm = async () => {
    if (!user) {
      return;
    }

    if (!task || task.length < minTaskLength) {
      setFormErrors((prevState) => ({ ...prevState, username: "taskErr " }));
      return;
    }
    setIsLoading(true);
    let res;
    if (isEditMode && todoId) {
      res = await updateTodo(task, isCompleted, user.id, todoId);
      updateLocally(task, isCompleted);
    } else {
      res = await createTodo(task, user);
      const newTodo = res.data;
      handleSetUser({ ...user, todos: [...user?.todos, newTodo] });
    }
    if (res.code === ServerCode.Ok) {
      afterSubmitNavigation();
      Alert.alert(translate(`alerts.${isEditMode ? "edited" : "created"}`));
    }
    setIsLoading(false);
    handleResetForm();
  };
  const handleDeleteTodo = async () => {
    if (!todoId || !isEditMode || !user) {
      console.warn("tried to delete with no permission - bug.");
      return;
    }
    const res = await deleteTodo(todoId, user.id);
    if (res.code === ServerCode.Ok) {
      Alert.alert(translate("alerts.deleted"));
      updateLocally(task, isCompleted, true); // true to delete
      afterSubmitNavigation();
    }
  };

  const handleResetForm = () => {
    setTask("");
    setIsCompleted(false);
    setIsEditMode(false);
  };

  const updateLocally = (
    task: string,
    isCompleted: boolean,
    deleteTodo?: boolean
  ) => {
    if (!user || !isEditMode || !todoId) {
      return;
    }

    const userTodos = JSON.parse(JSON.stringify(user?.todos || [])) as iTodo[]; // deep copy

    const index = userTodos.findIndex((item) => item.id === todoId);
    if (index !== -1) {
      if (deleteTodo) {
        userTodos.splice(index, 1);
      } else {
        userTodos[index] = { ...userTodos[index], task, isCompleted };
      }
      handleSetUser({ ...user, todos: userTodos });
    }
  };

  useEffect(() => {
    if (todoId && user) {
      const todo = user?.todos?.find((item) => item.id === todoId);
      if (todo) {
        setTask(todo.task);
        setIsEditMode(true);
        setIsCompleted(todo.isCompleted);
        navigation.setParams({ todoId: null });
      } else {
        console.warn("Sent a todo id that wasn't found.");
        setTask("");
        setIsEditMode(false);
        setIsCompleted(false);
      }
    } else {
      setIsEditMode(false);
      setCurrentTodo(undefined);
      handleResetForm();
    }
  }, [todoId]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/app-icon.png")} style={styles.img} />
      {isLoading && <AppLoading size={80} />}
      <TextInput
        placeholder={translate("forms.task")}
        value={task}
        editable={!isLoading}
        onChangeText={setTask}
        onChange={() => setFormErrors({ task: false })}
        style={[styles.input, formErrors.task ? styles.inputError : {}]}
      />

      {isEditMode && (
        <View style={styles.switchContainer}>
          <AppText style={styles.textStyle}>
            {translate("forms.isCompleted")}
          </AppText>
          <Switch
            value={isCompleted}
            onValueChange={(value) => setIsCompleted(value)}
          />
        </View>
      )}

      <View style={styles.btnContainer}>
        <AppButton
          title={translate(`buttons.${isEditMode ? "save" : "submit"}`)}
          onPress={handleSubmitForm}
          disabled={isLoading}
        />
        {isEditMode && (
          <AppButton
            title={translate(`buttons.delete`)}
            onPress={handleDeleteTodo}
            disabled={isLoading}
            color={colors.error}
            style={{
              marginLeft: 5,
              marginRight: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 15,
    flexDirection: "row",
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  textStyle: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default CreateEditTodoForm;
