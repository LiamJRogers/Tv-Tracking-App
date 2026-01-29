import React, { useState } from "react";
import { View, Image, StyleProp, ViewStyle, ImageStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type AvatarProps = {
  uri?: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
};

export default function Avatar({
  uri,
  size = 56,
  style,
  rounded = true,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const borderRadius = rounded ? size / 2 : 8;
  const showRemote = !!uri && !imageError;

  const defaultStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius,
    backgroundColor: "#E9EDF4",
  };

  if (showRemote) {
    return (
      <Image
        source={{ uri: uri as string }}
        onError={() => setImageError(true)}
        style={[defaultStyle as ImageStyle, style as unknown as ImageStyle]}
      />
    );
  }

  return (
    <View
      style={[
        defaultStyle,
        { alignItems: "center", justifyContent: "center" },
        style,
      ]}
    >
      <MaterialIcons
        name="person"
        size={Math.round(size * 0.6)}
        color="#9CA3AF"
      />
    </View>
  );
}
