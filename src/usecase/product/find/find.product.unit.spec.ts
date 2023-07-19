import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find customer use case", () => {
  // criando mocks se evita depender de fatores externos

  const product = new Product("123", "Rex", 50);

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  it("should find a customer", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);
    const product = new Product("123", "Rex", 50);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Rex",
      price: 50,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("Should not find a customer", () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
