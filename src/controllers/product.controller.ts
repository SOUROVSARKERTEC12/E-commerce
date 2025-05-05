import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { Product } from '../interface/product.interface';

export const getProductController = async(req: Request, res: Response)=>{
    try {
        const products:Product[] = [
            { id: 1, name: 'Product 1', price: 100},
            { id: 2, name: 'Product 2', price: 200 },
        ];
        res.status(httpStatus.OK).send({
            status: httpStatus.OK,
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createProductController = async(req: Request, res: Response)=>{

}