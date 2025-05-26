import { describe, it, mock, afterEach, beforeEach } from 'node:test';
import assert from 'node:assert';
import { ProductService } from '../../services/product.service';
import { db } from '../../db/index';
import type { Product } from '../../interface/product.interface';
import { matchSnapshot } from '../utils/snapshort';
import dotenv from 'dotenv';
dotenv.config();

describe('Product Service - createProduct snapshot', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  const mockInsert = mock.method(db, 'insert', () => ({
    values: () => ({
      returning: () => [
        {
          name: 'Test Product',
          image: 'mocked-image-url',
          price: 99.99,
          description: 'Test Description',
          quantity: 10,
        },
      ],
    }),
  }));

  it('should match snapshot on first and subsequent runs', async () => {
    const productData: Omit<Product, 'id'> = {
      name: 'Test Product',
      image: 'mocked-image-url',
      price: 99.99,
      description: 'Test Description',
      quantity: 10,
    };

    const result = await productService.createProduct(productData as Product);

    // Automatically creates snapshot on first run
    matchSnapshot('product.create.snapshot', result, process.env.UPDATE === 'true');
  });

  afterEach(() => {
    mockInsert.mock.resetCalls();
  });
});
