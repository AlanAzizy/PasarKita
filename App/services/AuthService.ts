import { auth, firebaseStorage, firestore } from "@/config/firebase";
import { User } from "@/constants/Types";
import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { doc } from "firebase/firestore";
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

export const LoginServices = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  try {
    loginSchema.parse({ email, password });

    const result = await signInWithEmailAndPassword(auth, email, password);
    
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error.errors.map((e) => e.message).join("\n");
    } else {
      throw "Invalid email or password";
    }
  }
};

export const RegisterServices = async ({
  email,
  password,
  username,
  phoneNumber,
  role,
  photoUrl
}: {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role : string
  photoUrl : string
}) => {
  const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  try {
    registerSchema.parse({ email, password });

    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(firestore, `users/${result.user.uid}`), {
      username: username,
      phoneNumber : phoneNumber,
      photoUrl : photoUrl,
      role : role
    });
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error.errors.map((e) => e.message).join("\n");
    } else {
      throw "Invalid register to ";
    }
  }
};

export async function GetUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, `users/${auth.currentUser?.uid}`),
      (doc) => {
        const data = doc.data();
        if (data) {
          setUser(data as User);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}

export async function GetUserDataOnce() {
  try {
    if (!auth.currentUser) {
      throw new Error("User is not logged in");
    }

    const docRef = doc(firestore, `users/${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {email : auth.currentUser.email,...docSnap.data()} as User;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export const AddPersonalizeUser = async ({
  email,
  fullname,
  image,
  phone_number,
  preferences,
}: {
  email: string;
  fullname: string;
  image: string | null;
  phone_number: string;
  preferences: string[];
}) => {
  const registerSchema = z.object({
    fullname: z.string(),
    phone_number: z.string().min(10, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
  });
  try {
    registerSchema.parse({ fullname, phone_number, email });

    let data = {
      fullname,
      email,
      phone_number,
      preferences,
      photo_url: "",
    };

    if (image) {
      // Upload image to Firebase Storage
      // Mengonversi URI menjadi blob
      const response = await fetch(image);
      const blob = await response.blob();

      // Upload blob ke Firebase Storage
      const storageRef = ref(
        firebaseStorage,
        "images/" + auth.currentUser?.uid
      );
      const snapshot = await uploadBytes(storageRef, blob);

      // Mendapatkan URL download gambar yang diunggah
      const downloadURL = await getDownloadURL(snapshot.ref);

      data = { ...data, photo_url: downloadURL };
    }

    await setDoc(doc(firestore, `users/${auth.currentUser?.uid}`), data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw err.errors.map((e) => e.message).join("\n");
    } else {
      throw "Internal server error";
    }
  }
};

export const logout = () => {
  try {
    const status = signOut(auth);
  }
  catch(err){
    // An error happened.
    if (err instanceof z.ZodError) {
      throw err.errors.map((e) => e.message).join("\n");
    } else {
      throw "Internal server error";
    }
  };
}