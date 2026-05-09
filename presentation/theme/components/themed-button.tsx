import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";
import { ThemedText } from "./themed-text";

interface IProps extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ icon, children, ...rest }: IProps) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? primaryColor + 90 : primaryColor },
      ]}
    >
      <ThemedText style={{ color: "white", fontWeight: "bold" }}>
        {children}
      </ThemedText>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
