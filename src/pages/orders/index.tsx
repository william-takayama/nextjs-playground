import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import OrderDetails from "../../components/Orders/OrderDetails";
import OrdersList from "../../components/Orders/OrderList";
import { orders } from "../../mock/orders";
import classes from "./index.module.scss";

export type OrderType = typeof orders[0];

type OrderState = "orders" | "details";

export default function OrderPage({}) {
  const router = useRouter();
  const mode = (router.query?.mode as OrderState) ?? "orders";
  const [isVisible, setIsVisible] = useState(false);
  // const DynamicDetails = dynamic(() => import("../../components/Orders/OrderDetails").then((mod) => mod.OrderDetails));
  // const orders = dynamic(() => import("../../mock/orders").then((mod) => mod.orders));

  const orderDetails = useMemo(
    () => orders.find((order) => order.number === router?.query?.orderNumber),
    [mode]
  );

  const onDismiss = useCallback(() => {
    setIsVisible(false);
    router.push("/orders");
  }, []);

  return (
    <>
      <PageComponent setIsVisible={setIsVisible} />
      <BottomSheet
        id="orders"
        visible={isVisible}
        onDismiss={onDismiss}
        contentClassName={classes.contentContainer}
      >
        {mode === "orders" && <OrdersList orders={orders} />}
        {mode === "details" && <OrderDetails orderDetails={orderDetails} />}
      </BottomSheet>
    </>
  );
}

function PageComponent({ setIsVisible }) {
  return (
    <div className={classes.container}>
      <p>Open orders</p>
      <button onClick={() => setIsVisible(true)}>
        <FiArrowRight size={20} color="white" />
      </button>
    </div>
  );
}
