export type RootStackParamList = {
  Home: undefined;
  Category: { title: string };
};


export interface Category {
  category_id: number;
  category_name: string;
  category_description: string | null;
  category_image: string | null;
  category_status: number;
}

export interface Product {
  quantity(quantity: any, arg1: number): number | undefined;
  product_id: number;
  product_name: string;
  product_description: string | null;
  product_price: number;
  product_image: string | null;
  category_id: number;
  product_stock: number;
  product_discount: number | null;
}

export interface CartItem extends Product {
  quantity: number;
}
