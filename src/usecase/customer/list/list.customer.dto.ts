export interface InputListCustomerDto {}

type Customer = {
  id: String;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

export interface OutputListCustomerDto {
  customers: Customer []
}