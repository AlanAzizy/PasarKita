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


export const getAllItem = async (stan : Stan):Promise<Item>=> {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      // Assuming user.stan is an array
      const stanPath = 'stans/'+stan.id;
  
      console.log(stanPath)
      
        // Get the stan document
        // Query a reference to a subcollection
        const querySnapshot = await getDocs(collection(firestore, stanPath, "items"));
        const items = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return {id : doc.id, ...doc.data()} as Item
        });
          
          return items;
  
    } catch (error) {
      console.error("Error fetching items:", error);
      throw new Error("Internal Server Error");
    }
  };


  export const moveItem = async (stan : Stan, items : Item[]) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      // Assuming user.stan is an array
      const stanPath = 'stans/'+stan.id;
  
      console.log(stanPath)
      
        // Get the stan document
          const itemPromises = items.map(async (item) => {
            const itemDocRef = collection(firestore, stanPath+'/items');
            const itemDoc = await addDoc(itemDocRef, {
              name : item.name,
              price : item.price,
              stok : item.stok,
              additional : item.additional,
              image : item.image
            });
          });
          
        const result = await Promise.all(itemPromises);
        console.log(result)
  
    } catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }
  };

