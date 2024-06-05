import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { doc, getDocs, where, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
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

export const getAllStan = async ()=>{
  try{
    const q = query(collection(firestore, 'stans'),where('owner','==',auth.currentUser?.uid))
    const stanDoc = await getDocs(q); 
    const stans = stanDoc.docs.map((stanEl)=>{
      const id = stanEl.id
      const date = (stanEl.data().until as Timestamp).toDate()
      return {id, until : date, ...stanEl.data()} as Stan 
    })

    return stans
  }
  catch(err){
      console.log(err)
  }
}

export const getBookedStan = async ()=>{
  try{
    const q = query(collection(firestore, 'stans'),where('owner','==',auth.currentUser?.uid,), where("availability", "==", false))
    const stanDoc = await getDocs(q); 
    const stans = stanDoc.docs.map((stanEl)=>{
      const id = stanEl.id
      const date = (stanEl.data().until as Timestamp).toDate()
      return {id, until : date, ...stanEl.data()} as Stan 
    })

    return stans
  }
  catch(err){
      console.log(err)
  }
}


export const getUnBookedStan = async ()=>{
  try{
    const q = query(collection(firestore, 'stans'),where('owner','==',auth.currentUser?.uid,), where("availability", "==", true))
    const stanDoc = await getDocs(q); 
    const stans = stanDoc.docs.map((stanEl)=>{
      const id = stanEl.id
      const date = (stanEl.data().until as Timestamp).toDate()
      return {id, until : date, ...stanEl.data()} as Stan 
    })

    return stans
  }
  catch(err){
      console.log(err)
  }
}


export const addStan = async (stan : Stan) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    // Assuming user.stan is an array
      const stanDocRef = collection(firestore, 'stans');
      const stanDoc = await addDoc(stanDocRef, {
        availability : true,
        blockNumber : stan.blockNumber,
        paymentStatus : false,
        price : stan.price,
        size : 7.5,
        type : "medium",
        until : new Date(),
        owner : auth.currentUser.uid
      });
      

  } catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
};

export const bookStan = async (stan : Stan, duration : number) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    // Assuming user.stan is an array
      const stanDocRef = doc(firestore, `stans/${stan.id}`);
      let currentDate = new Date();

      if (currentDate.getMonth()+duration==2){
        if (currentDate.getDate()>28){
          currentDate.setDate(28);
          currentDate.setMonth(currentDate.getMonth()+duration)
        }else{
          currentDate.setMonth(currentDate.getMonth()+duration)
        }
      }else{
        if (currentDate.getDate()>=30){
          currentDate.setDate(30);

        }
        currentDate.setMonth(currentDate.getMonth()+duration)
      }
      const stanDoc = await updateDoc(stanDocRef, {
        availability : false,
        blockNumber : stan.blockNumber,
        paymentStatus : stan.paymentStatus,
        price : stan.price,
        size : stan.size,
        type : stan.type,
        until : currentDate,
        owner : stan.owner
      });
      

  } catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
};


export const editStan = async (stan : Stan, price : number, paymentStatus : boolean, availability : boolean) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    // Assuming user.stan is an array
      console.log("try to update")
      const stanDocRef = doc(firestore, `stans/${stan.id}`);
      let currentDate = new Date();
      const stanDoc = await updateDoc(stanDocRef, {
        availability : availability,
        blockNumber : stan.blockNumber,
        paymentStatus : paymentStatus,
        price : price,
        size : stan.size,
        type : stan.type,
        until : currentDate,
        owner : stan.owner
      });

  } catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
};


export const deleteStan = async (stan : Stan) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    // Assuming user.stan is an array
    const stanPath = 'stans/'+stan.id;

      const stanDocRef = doc(firestore, stanPath);
      const stanDoc = await deleteDoc(stanDocRef);
      

  } catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
};

export const countBookStanPercentage= async()=>{

  try{
    const numberOfBookedStan = (await getBookedStan())?.length
    const numberOfAllStan = (await getAllStan())?.length
    if (numberOfAllStan && numberOfBookedStan){
      return numberOfBookedStan/numberOfAllStan
    }
  }catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
}

export const updateStanStatus = async()=>{
  const today = new Date()
  try{
    const q = query(collection(firestore, 'stans'), where('until', '<=', Timestamp.fromDate(today)));
const stansSnapshot = await getDocs(q);
const newStanPromises = stansSnapshot.docs.map(async (stan) => {
    const stanDocRef = doc(firestore, 'stans', stan.id);
    await updateDoc(stanDocRef, {
        availability: true,
        paymentStatus: false,
        until: today,
    });
});
await Promise.all(newStanPromises); // Wait for all updates to complete

  }
  catch (error) {
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
}

