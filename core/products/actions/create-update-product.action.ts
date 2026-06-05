import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interface";

export const UpdateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product as Product);
  }

  return createProduct(product as Product);
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;
  try {
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update product");
  }
};
const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;
  try {
    const { data } = await productsApi.post<Product>(`/products`, {
      ...rest,
      images: images.length > 0 ? images : ["https://placeimg.com/640/480/any"],
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
};
