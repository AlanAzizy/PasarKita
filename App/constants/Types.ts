import { DocumentReference } from "firebase/firestore"

export interface User{
    username : string,
    email : string
    phoneNumber : string
    role : string
    photoUrl : string | null
    stan : DocumentReference
}

export interface OrderItem{
    id : string,
    item : DocumentReference
    number : number
    product : Item
}

export interface Order{
    id : string,
    name : string,
    date : Date,
    orderItem : DocumentReference[]
    total : number
    status : boolean
    cashierId : DocumentReference
}

export interface Item{
    id : string,
    name : string,
    price : number
    stok : number
    additional : number
    image : string
}

export interface Stan{
    id : string,
    availibility : boolean,
    blockNumber : number,
    paymentStatus : boolean,
    price : number,
    size : number,
    type : string,
    until : Date
}
