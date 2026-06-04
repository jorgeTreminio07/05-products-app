import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props {
  options: string[];
  selectedOption: string[];
  onSelect: (option: string) => void;
}
const ThemedButtomGroup = ({ options, selectedOption, onSelect }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View style={style.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            style.button,
            selectedOption.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            numberOfLines={1}
            style={[
              style.buttonText,
              selectedOption.includes(option) && style.selectedButtonText,
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemedButtomGroup;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
});
