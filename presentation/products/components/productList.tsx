import { Product } from "@/core/products/interfaces/product.interface";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductCard } from "../components/productCard";

interface IProps {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: IProps) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    setIsRefreshing(false);
  };
  const primary = useThemeColor({}, "primary");
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;
