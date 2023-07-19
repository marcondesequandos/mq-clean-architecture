export interface InputListProductDto {}

type Product = {
  id: String;
  name: string;
  price: number;
}

export interface OutputListProductDto {
  products: Product[];
}