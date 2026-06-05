import { router } from "@/.expo/types/router";
import ProductList from "@/presentation/products/components/productList";
import { useProducts } from "@/presentation/products/hooks/useProduct";
import { FAB } from "@/presentation/theme/components/FAB";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
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

      <FAB
        iconName="add-outline"
        onPress={() => router.push("/(products-app)/product/[id]?id=new")}
      />
    </View>
  );
};

export default HomeScreen;
