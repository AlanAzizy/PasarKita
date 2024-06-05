import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User, Stan, Item, OrderItem } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { Timestamp, doc, getDocs, where} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  orderBy,
  limit
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { z } from "zod";
import { editItem } from "./ItemService";


export const createOrder = async (stan : Stan,orders : OrderItem[], order : Order) =>{

    try {
        const orderItemId = await createOrderItem(stan, orders);
        const stanPath = 'stans/'+stan.id
        const orderDoc = await addDoc(collection(firestore, stanPath+'/orders'), {
          name : order.name,
          date : order.date,
          orderItem : orderItemId?.map((id)=>stanPath+`/orderItem/${id}`),
          total : order.total,
          status : order.status,
          cashierId : order.cashierId,
          });
          return orderDoc
    }catch(err){
        console.log(err)
    }
}


export const createOrderItem = async (stan : Stan, orders : OrderItem[]) =>{

  try {
      const stanPath = 'stans/'+stan.id
      const orderItemPromises = orders.map(async (order) => {
        const newStok = order.product.stok - order.number
        const prevItem = order.product
        const item = {name :prevItem.name ,stok : newStok, additional : order.number*-1, id : prevItem.id, image : prevItem.image, price : prevItem.price} as Item
        await editItem(stan, item);
        const orderItemDoc = await addDoc(collection(firestore, `${stanPath}/orderItem`), {
          item: stanPath+'/items/'+order.product.id,
          number: order.number
        });
        return orderItemDoc.id;
      });
    
      // Wait for all promises to resolve
      const orderItemIds = await Promise.all(orderItemPromises);
  
    
      return orderItemIds;
  }catch(err){
      console.log(err)
  }
}

  export const getOrder = async (stan: Stan): Promise<Order[]> => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {        
      const orderDocRef = collection(firestore, 'stans/'+stan.id+'/orders');
      const orderDoc = await getDocs(orderDocRef);
      const orders = orderDoc.docs.map((order)=>{
            const date = (order.data().date as Timestamp).toDate()
            const name = order.data().name
            const orderItem = order.data().orderItem
            const total = order.data().total
            const status = order.data().status
            const cashierId = order.data().cashierId
            return { id: order.id, name, date, orderItem, total, status, cashierId} as Order;
          });
          
          return orders;
        }
  
    catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Internal Server Error");
    }
  };

  export const getOrderSortedByDate = async (stan: Stan): Promise<Order[]> => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {        
      const orderDocRef = collection(firestore, 'stans', stan.id, 'orders');
const querySnapshot = await getDocs(query(orderDocRef, orderBy('date', 'asc'), limit(20)));
const orders = querySnapshot.docs.map((order) => {
    const date = (order.data().date as Timestamp).toDate();
    const name = order.data().name;
    const orderItem = order.data().orderItem;
    const total = order.data().total;
    const status = order.data().status;
    const cashierId = order.data().cashierId;
    return { id: order.id, name, date, orderItem, total, status, cashierId } as Order;
});
return orders;
}
    catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Internal Server Error");
    }
  };


  export const getProfit = async(stan : Stan)=>{
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    const stanPath = 'stans/'+stan.id+'/orders/'

    const q = query(
        collection(firestore, stanPath),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp)
    );

    try {
        const querySnapshot = await getDocs(q);
        var sum = 0
        querySnapshot.forEach((doc) => {
            sum += doc.data().total
        });

        return sum
    } catch (e) {
        console.error('Error querying documents: ', e);
    }

  }

  export function formatToRupiah(number : number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
}

export const getOrderProfitForEveryMonth = async (stan: Stan) => {
  const year = 2024;
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const stanPath = 'stans/'+stan.id+'/orders/'

  try {
    const profits = await Promise.all(months.map(async (month) => {
      const startDate = new Date(year, month, 1); // Corrected the month parameter
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Corrected the month parameter and date logic
      console.log(1)
      // Convert to Firestore Timestamps
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      const q = query(
        collection(firestore, stanPath),
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      );
      const querySnapshot = await getDocs(q);
      // Process the results
      const documents: Order[] = [];
      querySnapshot.forEach((doc) => {
        documents.push(doc.data() as Order);
      });
      const sum = documents.reduce((accumulator, order) => {
        return accumulator + order.total;
      }, 0);
      return sum/1000000;
    }));

    return profits;

  } catch (e) {
    console.error('Error querying documents: ', e);
  }
};



