import ThemedButton from "@/presentation/theme/components/themed-button";
import ThemedLink from "@/presentation/theme/components/themed-link";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedTextInput from "@/presentation/theme/components/themedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const RegisterScreen = () => {
  const height = useWindowDimensions().height;

  const backgroundColor = useThemeColor({}, "background");
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Crear Cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Porfavor crea una cuenta para continuar
          </ThemedText>
        </View>

        {/*email y password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre Completo"
            autoCapitalize="words"
            icon="person-outline"
          />

          <ThemedTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <ThemedTextInput
            placeholder="Contrasena"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />

          {/*boton ingresar */}
          <ThemedButton icon="log-in-outline">Crear Cuenta</ThemedButton>

          {/*boton crear cuenta */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ color: "grey" }}>
              ya tienes una cuenta?
            </ThemedText>
            <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
              iniciar sesion
            </ThemedLink>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
