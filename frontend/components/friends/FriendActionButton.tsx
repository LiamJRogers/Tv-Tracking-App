import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles as buttonStyles } from "../../styles/friendActionButton.styles";
import { ComponentProps } from "react";

type FriendActionButtonProps = {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  iconColor: string;
  text: string;
  textColor: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const FriendActionButton: React.FC<FriendActionButtonProps> = ({
  icon,
  iconColor,
  text,
  textColor,
  onPress,
  disabled,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[buttonStyles.button, { opacity: disabled ? 0.6 : 1 }, style]}
    disabled={disabled}
    onPress={onPress}
  >
    <MaterialIcons
      name={icon}
      size={24}
      color={iconColor}
      style={buttonStyles.icon}
    />
    <Text style={[buttonStyles.text, { color: textColor }, textStyle]}>
      {text}
    </Text>
  </TouchableOpacity>
);
