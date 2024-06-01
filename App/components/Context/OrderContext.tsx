import {
  useContext,
  createContext,
  ReactNode,
  Children,
  useState,
} from "react";
import Product from "../Interface/Product";
import { OrderItem } from "../../constants/Types";

type orderContextType = {
  orders: OrderItem[] | null;
  setOrders: (orders: OrderItem[]) => void;
};

export const OrderContext = createContext<orderContextType | undefined>(
  undefined
);

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
