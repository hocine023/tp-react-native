import { Product } from "./product";

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};
