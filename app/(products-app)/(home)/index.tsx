import ProductList from "@/presentation/products/components/productList";
import { useProducts } from "@/presentation/products/hooks/useProduct";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");

  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
    </View>
  );
};

export default HomeScreen;
