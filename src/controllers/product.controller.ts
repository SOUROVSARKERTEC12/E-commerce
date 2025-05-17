import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import * as ProductService from '../services/product.service';

export const getProductController = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await ProductService.getAllProducts();
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
      const product = await ProductService.getProductById(id);
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

export const createProductController = async(req: Request, res: Response)=>{
    try {
        const productData = req.body;
        const newProduct = await ProductService.createProduct(productData);
        res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: 'Product created successfully',
            data: newProduct,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

export const updateProductController = async(req: Request, res: Response) : Promise<void>=>{

}

export const deleteProductController = async(req: Request, res: Response):Promise<void>=>{

}