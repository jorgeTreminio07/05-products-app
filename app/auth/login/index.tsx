import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/themed-button";
import ThemedLink from "@/presentation/theme/components/themed-link";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedTextInput from "@/presentation/theme/components/themedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const height = useWindowDimensions().height;
  const backgroundColor = useThemeColor({}, "background");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);
  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) return;

    setIsPosting(true);

    try {
      const wasSuccessful = await login(email, password);

      if (wasSuccessful) {
        router.replace("/");
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (error) {
      // Si el store lanza un error (throw Error), caerá aquí
      Alert.alert("Error", "Hubo un problema con la conexión al servidor");
    } finally {
      // Esto se ejecuta SIEMPRE, haya error o no
      setIsPosting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Porfavor ingrese para continuar
          </ThemedText>
        </View>

        {/*email y password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <ThemedTextInput
            placeholder="Contrasena"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          {/*boton ingresar */}
          <ThemedButton
            icon="log-in-outline"
            onPress={onLogin}
            disabled={isPosting}
          >
            Ingresar
          </ThemedButton>

          {/*boton crear cuenta */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ color: "grey" }}>
              No tienes una cuenta?
            </ThemedText>
            <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
              crear una cuenta
            </ThemedLink>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
