import {
  useContext,
  createContext,
  ReactNode,
  Children,
  useState,
  useEffect,
} from "react";
import { User } from "@/constants/Types";
import { GetUserData } from "@/services/AuthService";

export type userType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<userType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userLogin = (await GetUserData()).user;
        setUser(userLogin);
      } catch (error) {
        console.log("there is an error to get data");
      }
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
