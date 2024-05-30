import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User, Stan, Item, OrderItem } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { doc, getDocs, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { z } from "zod";


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
          console.log(orderDoc)
          return orderDoc
    }catch(err){
        console.log(err)
    }
}


export const createOrderItem = async (stan : Stan, orders : OrderItem[]) =>{

  try {
      const stanPath = 'stans/'+stan.id
      const orderItemPromises = orders.map(async (order) => {
        const orderItemDoc = await addDoc(collection(firestore, `${stanPath}/orderItem`), {
          item: stanPath+'/items/'+order.product.id,
          number: order.number
        });
        return orderItemDoc.id;
      });
    
      // Wait for all promises to resolve
      const orderItemIds = await Promise.all(orderItemPromises);
    
      console.log('----------');
      console.log(orderItemIds);
    
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
            const date = (order.data().date.toDate())
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




