// tests/services/product.service.create.test.ts
import { describe, it, mock, afterEach } from "node:test";
import assert from "node:assert";
import { createProduct } from "../../services/product.service";
import { db } from "../../db/index";
import type { Product } from "../../interface/product.interface";

describe("Product Service - createProduct", () => {
  // Mock the db.insert method
  const mockInsert = mock.method(db, "insert", () => ({
    values: () => ({
      returning: () => [
        {
          id: 1,
          uuid: "mocked-uuid",
          name: "Test Product",
          image: "mocked-image-url",
          price: 99.99,
          description: "Test Description",
          quantity: 10,
        },
      ],
    }),
  }));

  it("should create a new product with auto-generated id and uuid", async () => {
    const productData: Omit<Product, "id" | "uuid"> = {
      name: "Test Product",
      image: "mocked-image-url",
      price: 99.99,
      description: "Test Description",
      quantity: 10,
    };

    const result = await createProduct(productData as Product);
    assert.strictEqual(result.name, productData.name);
    assert.strictEqual(result.price, productData.price);
    assert.strictEqual(result.description, productData.description);
    assert.strictEqual(result.image, productData.image);
    assert.strictEqual(result.quantity, productData.quantity);

    // Verify the mock was called correctly
    assert.strictEqual(mockInsert.mock.calls.length, 1);
  });

  it("should return the created product with all fields", async () => {
    const productData: Omit<Product, "id" | "uuid"> = {
      name: "Another Product",
      price: 49.99,
      description: "Another Description",
      image: "mocked-image-url",
      quantity: 5,
    };

    const result = await createProduct(productData as Product);
    assert.strictEqual(result.name, "Test Product");
    assert.strictEqual(result.price, 99.99);
    assert.strictEqual(result.description, "Test Description");
    assert.strictEqual(result.image, "mocked-image-url");
    assert.strictEqual(result.quantity, 10);
  });

  // Reset mocks after each test
  afterEach(() => {
    mockInsert.mock.resetCalls();
  });
});
