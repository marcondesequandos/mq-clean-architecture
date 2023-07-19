import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

describe("Test find customer use case", ()=> {
  let sequelize: Sequelize;

  beforeEach(async ()=> {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async ()=> {
    await sequelize.close();
  });


  //"Entendendo problemas com testes de integração", esse é um teste que integra diversas funcionalidades  vamos testar isso aqui em outro formato, em um formato que eu consiga isolar isso aqui, para resolver o nosso problema
  it("should find a customer", async ()=> {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const product = new Product("123", "Rex", 30);

    await productRepository.create(product);

    const input = {
      type: "a",
      name: "Rex",
      price: 50
    }

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });

  })

})