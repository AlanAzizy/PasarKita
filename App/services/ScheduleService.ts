import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { Order, schedule, User } from "@/constants/Types";
import { doc, getDocs, where, updateDoc, deleteDoc, Timestamp, orderBy } from "firebase/firestore";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

export const getAllSchedule = async ()=>{
  
  try{
    const q = query(collection(firestore, 'users/'+auth.currentUser?.uid+'/schedule'))
    const scheduleDoc = await getDocs(q); 
    const schedules = scheduleDoc.docs.map((schedule)=>{
      const id = schedule.id
      const startTime = (schedule.data()["startTime"] as Timestamp).toDate()
      return {id, startTime : startTime, ...schedule.data()} as schedule 
    })
    return schedules
  }
  catch(err){
    console.log(err)
  }
}


export const getScheduleByDate = async (date : Date)=>{
  const specificDate = date
    const startOfDay = new Date(specificDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(specificDate.setHours(23, 59, 59, 999));

  const startTimestamp = Timestamp.fromDate(startOfDay);
  const endTimestamp = Timestamp.fromDate(endOfDay);
    try{
      const q = query(collection(firestore, 'users/'+auth.currentUser?.uid+'/schedule'), where("startTime",">=",startTimestamp), where("startTime", "<=", endTimestamp), orderBy("startTime"))
      const scheduleDoc = await getDocs(q); 
      const schedules = scheduleDoc.docs.map((schedule)=>{
        console.log(schedule.id)
        const id = schedule.id
        const startTime = (schedule.data().startTime as Timestamp).toDate()
        return {id, startTime : startTime, ...schedule.data()} as schedule 
      })
      return schedules
    }
    catch(err){
        console.log(err)
    }
  }

  export const addSchedule = async (schedule : schedule) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
    console.log(schedule)
    const time = (schedule.startTime)
    time.setHours(time.getHours())
    try {
        const scheduleDocRef = collection(firestore, 'users/'+auth.currentUser.uid+'/schedule');
        const scheduleDoc = await addDoc(scheduleDocRef, {
          blockNumber : schedule.blockNumber,
          status : false,
          type : schedule.type,
          startTime : Timestamp.fromDate(time),
          worker : schedule.worker
          });
        
        console.log(scheduleDoc.id)
  
    } catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }
  };


  export const moveSchedule = async() => {
    try{
      const schedule = await getAllSchedule();
      const schedulePromise = schedule?.map(async (e)=>{
        await addSchedule(e)
      })

      const result = await Promise.all(schedulePromise);

    }catch (error) {
      console.error("Error moving items:", error);
      throw new Error("Internal Server Error");
    }

  }

