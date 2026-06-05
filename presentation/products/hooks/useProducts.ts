import { UpdateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //mutation
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      UpdateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),

    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // Actualizar el ID del producto después de la creación
      Alert.alert(
        "Producto actualizado",
        `El producto ${data.title} ha sido actualizado correctamente.`,
      );
      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
    },
  });

  //mantener el id del producto en caso de ser uno nuevo

  return {
    productQuery,
    productMutation,
  };
};
