export class User{
    _id?: string;

    account: string;
    
    password: string;
    
    cart:[{
        _id?:string;
        name: string;
        price: number;
    }];
}