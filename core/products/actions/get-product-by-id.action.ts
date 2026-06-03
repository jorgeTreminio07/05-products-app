import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/products/${image}`),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
};
