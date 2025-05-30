import { InsertProductInput } from '../inputs/product.inputs';
export class createProductDto{
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly image: string,
        public readonly price: number,
        public readonly quantity: number
    ){}

    static fromInput(input: InsertProductInput):createProductDto{
        return new createProductDto(input.name,input.description, input.image,input.price,input.quantity);
    }
}