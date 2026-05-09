import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

const LogOutIconButton = () => {
  const primaryColor = useThemeColor({}, "primary");

  const { logout } = useAuthStore();

  return (
    <TouchableOpacity onPress={logout} style={{ marginRight: 8 }}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogOutIconButton;
