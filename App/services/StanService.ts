import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, User } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { doc, getDocs, where, updateDoc, deleteDoc, Timestamp, DocumentReference } from "firebase/firestore";
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

export const bookStan = async (custId : string,stan : Stan, duration : number) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }
  console.log(stan)
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

      const stanRef = doc(firestore, 'stans', stan.id)
      const q = doc(firestore, 'users', custId);
      await setDoc(q, {
          stan : stanRef
          
      },{ merge: true });


      

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


export const editStanPaymentStatus = async (stan : Stan, price : number, availability : boolean) => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    // Assuming user.stan is an array
      console.log("try to update")
      
      await updatePayments(stan)
      const stanDocRef = doc(firestore, `stans/${stan.id}`);
      let currentDate = new Date();
      const stanDoc = await updateDoc(stanDocRef, {
        availability : availability,
        blockNumber : stan.blockNumber,
        paymentStatus : true,
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

export const updatePayments = async(stan : Stan) =>{

  try{
    const stanDocRef = collection(firestore, `payments/`);
      let currentDate = new Date();
      const stanDoc = await addDoc(stanDocRef,{
        stanId : stan.id,
        total : stan.price,
        date : currentDate
      })

    console.log(stanDoc.id)
  }catch(error){
    console.error("Error moving items:", error);
    throw new Error("Internal Server Error");
  }
}

export const getStanProfitForEveryMonth = async (stan: Stan) => {
  const year = 2024;
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const stanPath = 'payments/'

  try {
    const profits = await Promise.all(months.map(async (month) => {
      const startDate = new Date(year, month, 1); // Corrected the month parameter
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Corrected the month parameter and date logic

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


export const updateStanOwner = async() => {

  try{
    const unBookedStan = (await getUnBookedStan());
    if (unBookedStan?.length>0){
      const q = query(collection(firestore, 'users'), where('stan', 'in', unBookedStan?.map((stan)=>'stans/'+stan.id)));
      const usersSnapshot = await getDocs(q);
      const userUpdate = usersSnapshot.docs.map(async (user)=>{
        const userDocRef = doc(firestore, 'users', user.id);
        await updateDoc(userDocRef, {
          stan : "",
          ...user
      });
      })
  
    await Promise.all(userUpdate);
    }

  }catch(e){
    console.error('Error querying documents: ', e);
  }

}


