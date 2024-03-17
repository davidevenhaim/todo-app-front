// @@ React
import React from "react";
import { View, StyleSheet } from "react-native";

// @@ Constants
import colors from "../../utils/colors";

const AppDivider = ({
  color = colors.border,
  height = 1,
  marginVertical = 10,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: height,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
  },
});

export default AppDivider;
