// @@ React
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

// @@ Constants
import colors from "../../utils/colors";
import AppText from "./AppText";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
}

const AppButton = ({ title, color, onPress, style, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color || colors.primary },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppButton;
