
export default interface Product {
    id : number,
    name : string,
    stan_id : number,
    price : number,
    stok : number
}

export const products = [{
    id : 1,
    name : "Pepsodent",
    stan_id : 2,
    price : 10000,
    stok : 10
},
{
    id : 2,
    name : "Royco",
    stan_id : 2,
    price : 1000,
    stok : 15
},
{
    id : 3,
    name : "Bimoli",
    stan_id : 2,
    price : 18000,
    stok : 5
}]