import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export const getProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const getProductControllerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.getProductById(id);
    if (!product) {
      res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: 'Product not found',
      });
      return;
    }
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// Placeholder for updating a product
export const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
      message: 'Update product functionality not implemented yet.',
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// Placeholder for deleting a product
export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
      message: 'Delete product functionality not implemented yet.',
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
