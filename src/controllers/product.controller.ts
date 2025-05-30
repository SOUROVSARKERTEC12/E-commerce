import { createProductDto } from './../dtos/create.product.dto';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product.interface';

const productService = new ProductService();

export const getProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getProductControllerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid product ID' });
      return;
    }

    const product = await productService.getProductById(id);
    if (!product) {
      res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
      return;
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: Product = createProductDto.fromInput(req.body);
    if (!productData.name || !productData.price) {
      res.status(httpStatus.BAD_REQUEST).json({ message: 'Missing required product fields' });
      return;
    }

    const newProduct = await productService.createProduct(productData);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.body.id);
  
    if (isNaN(id)) {
      res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid product ID' });
      return;
    }

    const updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
      return;
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Product updated successfully',
      data: updated
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid product ID' });
      return;
    }

    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
      return;
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
