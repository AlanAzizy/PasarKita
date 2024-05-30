import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User } from "@/constants/Types";
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
import { Stan } from "@/constants/Types";

export const getCurrentStan = async (user : User)=>{
  try{
      const stanDoc = await getDoc(doc(firestore, user.stan.path)); 
      const stan = {
        id: stanDoc.id,
        ...stanDoc.data(),
      } as Stan;
      return stan
    }
    catch(err){
        console.log(err)
    }
}