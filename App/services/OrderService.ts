import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User, Stan, Item } from "@/constants/Types";
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


export const createOrder = async (order : Order) =>{

    try {
        await setDoc(doc(firestore, `order/`), {
            order
          });
    }catch(err){
        console.log(err)
    }
}

  export const getOrder = async (stan: Stan): Promise<Order[]> => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {        
          const orderPromises = stan.orders.map(async (order) => {
            console.log(order.path)
            const itemDocRef = doc(firestore, order.path);
            const itemDoc = await getDoc(itemDocRef);
            const date = (itemDoc.data().date.toDate())
            const name = itemDoc.data().name
            const orderItem = itemDoc.data().orderItem
            const total = itemDoc.data().total
            const status = itemDoc.data().status
            const cashierId = itemDoc.data().cashierId
            return { id: itemDoc.id, name, date, orderItem, total, status, cashierId} as Order;
          });
          
          const orders = await Promise.all(orderPromises);
          return orders;
        }
  
    catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Internal Server Error");
    }
  };




