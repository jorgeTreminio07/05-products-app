import { Link, LinkProps } from "expo-router";
import React from "react";
import { useThemeColor } from "../hooks/use-theme-color";

interface IProps extends LinkProps {
  children: string;
}

const ThemedLink = ({ style, ...rest }: IProps) => {
  const primaryColor = useThemeColor({}, "primary");
  return <Link style={[{ color: primaryColor }, style]} {...rest}></Link>;
};

export default ThemedLink;
function useThemedColor() {
  throw new Error("Function not implemented.");
}
