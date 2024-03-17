// @@ React
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// @@ Constants
import colors from "../../utils/colors";

interface Props {
  size?: number;
}

const AppLoading = ({ size }: Props) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size || 120} color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default AppLoading;
