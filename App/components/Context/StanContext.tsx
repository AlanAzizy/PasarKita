import {
  useContext,
  createContext,
  ReactNode,
  Children,
  useState,
  useEffect,
} from "react";
import { Stan, User } from "@/constants/Types";
import { GetUserData } from "@/services/AuthService";
import { UserContext } from "./UserContext";
import { getCurrentStan } from "@/services/StanService";

export type stanType = {
  stan: Stan;
  setStan: (stan: Stan) => void;
};

export const StanContext = createContext<stanType | undefined>(undefined);

export default function StanProvider({ children }: { children: ReactNode }) {
  const [stan, setStan] = useState<Stan | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setStan(stan);
      } catch (error) {
        console.log("there is an error to get data");
      }
    };
  }, [stan]);

  return (
    <StanContext.Provider value={{ stan, setStan }}>
      {children}
    </StanContext.Provider>
  );
}
