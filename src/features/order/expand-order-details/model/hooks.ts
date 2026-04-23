import { useAppDispatch, useAppSelector } from "@app/appStore";
import { useLazyGetOrderDetailsQuery } from "@entities/order/api/order-api";
import { toggleOrderDetails } from "@features/order/expand-order-details/model/slice";
import { useEffect } from "react";

export const useExpendedOrders = (id: number) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.orders.expandedOrderIds.includes(id));
  
    const [trigger, { isLoading, data: details }] = useLazyGetOrderDetailsQuery();
  
    useEffect(() => {
      if (isOpen && !details && !isLoading) {
        trigger(id);
      }
    }, [isOpen, id, details, isLoading, trigger]);
  
    const handleOrderClick = () => {
      dispatch(toggleOrderDetails(id));
    };
  
    return {
      isOpen,
      details,
      isLoading,
      handleOrderClick,
    };
  };