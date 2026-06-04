import ProductImages from "@/presentation/products/components/productImages";
import { useProduct } from "@/presentation/products/hooks/useProducts";
import ThemedButton from "@/presentation/theme/components/themed-button";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedButtomGroup from "@/presentation/theme/components/ThemedButtomGroup";
import ThemedTextInput from "@/presentation/theme/components/themedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, "background");

  const { productQuery } = useProduct(`${id}`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="camera-outline"
          size={25}
          style={{ marginLeft: 5 }}
          color={"white"}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Ionicons name="cloud-download-outline" size={50} color={"white"} />
      </ThemedView>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data!;

  console.log("product", product);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <ScrollView>
        {/* Product images */}
        <ProductImages images={product.images} />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />
          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemedTextInput
            placeholder="Descripcion"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>

        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>

        <ThemedView style={{ marginHorizontal: 10 }}>
          <ThemedButtomGroup
            options={["XS", "S", "M", "L", "XL", "XXL"]}
            selectedOption={product.sizes}
            onSelect={(option) => console.log({ option })}
          />

          <ThemedButtomGroup
            options={["kid", "men", "women", "unisex"]}
            selectedOption={[product.gender]}
            onSelect={(option) => console.log({ option })}
          />
        </ThemedView>

        <View style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}>
          <ThemedButton
            icon="save-outline"
            onPress={() => console.log("guardar")}
          >
            Guardar
          </ThemedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
