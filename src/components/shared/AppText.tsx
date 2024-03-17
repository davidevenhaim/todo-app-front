// @@ React
import { Text, TextProps } from "react-native";

// @@ Constants
import colors from "../../utils/colors";

const AppText = ({ children, style, ...rest }: TextProps) => {
  return (
    <Text style={[{ color: colors.text }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
