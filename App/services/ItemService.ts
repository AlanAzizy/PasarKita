import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User, Stan, Item } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { deleteDoc, doc, getDocs, updateDoc, where } from "firebase/firestore";
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

  // this code is used for moving items to subcollection
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

  export const addItem = async (stan : Stan, item : Item) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      // Assuming user.stan is an array
      const stanPath = 'stans/'+stan.id;
  
      const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/pasarkita-7542e.appspot.com/o/items%2Fdefault%20item.jpg?alt=media&token=b12eb5b5-4ad8-4710-ba8e-3a9cb9eb1c42'

        const itemDocRef = collection(firestore, stanPath+'/items');
        const itemDoc = await addDoc(itemDocRef, {
          name : item.name,
          price : item.price,
          stok : item.stok,
          additional : item.additional,
          image : defaultImage
        });
        
        console.log(itemDoc.id)
  
    } catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }
  };


  export const deleteItem = async (stan : Stan, id : string) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      // Assuming user.stan is an array
      const stanPath = 'stans/'+stan.id;
  
      console.log(id)
        const itemDocRef = doc(firestore, stanPath+'/items/'+id);
        const itemDoc = await deleteDoc(itemDocRef);
        
        console.log(itemDoc)
  
    } catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }
  };


  export const editItem = async (stan : Stan, item : Item) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      // Assuming user.stan is an array
      const stanPath = 'stans/'+stan.id;
      console.log('----------+++++++')
      console.log(item);
  
        const itemDocRef = doc(firestore, stanPath+'/items/'+item.id);
        const itemDoc = await updateDoc(itemDocRef, {
          name : item.name,
          price : item.price,
          stok : item.stok,
          additional : item.additional,
        });
        
        console.log(itemDoc)
  
    } catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }
  };
