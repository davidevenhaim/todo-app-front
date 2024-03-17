// @@ React
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

// @@ Expo
import { Ionicons } from "@expo/vector-icons";

// @@ Components
import AppText from "./shared/AppText";

// @@ Constants
import { iUser } from "../utils/types";
import colors from "../utils/colors";

interface Props {
  user: iUser;
}

const SIZE_AVATAR = 88;

const UserProfile = ({ user }: Props) => {
  const { username, name, todos } = user;

  const { t: translate } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons
          name="person"
          style={styles.icon}
          size={SIZE_AVATAR * 0.75}
          color={colors.light}
        />
      </View>
      <AppText style={styles.text}>
        {`${translate("labels.hi")} ${name}`}{" "}
      </AppText>
      <AppText style={styles.text}>
        {`${translate("labels.currentUsername")} ${username}`}{" "}
      </AppText>
      <AppText style={styles.text}>
        {`${translate("labels.todoCount")} ${todos.length} ${translate(
          "labels.todosCurrently"
        )}`}{" "}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    alignItems: "center",
    padding: 10,
  },
  avatarContainer: {
    height: SIZE_AVATAR,
    width: SIZE_AVATAR,
    borderRadius: SIZE_AVATAR / 2,
    backgroundColor: colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  icon: {
    margin: 4,
  },
});

export default UserProfile;
