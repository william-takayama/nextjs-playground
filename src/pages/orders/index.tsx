import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { orders } from "../../mock/orders";
import classes from "./index.module.scss";

type OrderType = typeof orders[0];

type OrderState = "orders" | "details";

export default function OrderPage({}) {
  const router = useRouter();
  const mode = (router.query?.mode as OrderState) ?? "orders";
  const [isVisible, setIsVisible] = useState(false);

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
      <BottomSheet id="orders" visible={isVisible} onDismiss={onDismiss}>
        {mode === "orders" && <OrdersList orders={orders} />}
        {mode === "details" && <OrderDetails orderDetails={orderDetails} />}
      </BottomSheet>
    </>
  );
}

function OrdersList({ orders }: { orders: OrderType[] }) {
  return (
    <ul className={classes.ordersList}>
      {orders.map((order) => (
        <li className={classes.orderItem}>
          <h2 className={classes.title}>Number: {order.number}</h2>
          <Link
            href={{
              pathname: "/orders",
              query: { mode: "details", orderNumber: order.number },
            }}
            as={`/orders/${order.number}`}
          >
            <a>See more</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PageComponent({ setIsVisible }) {
  return (
    <button onClick={() => setIsVisible(true)}>
      <FiArrowRight size={20} color="white" />
    </button>
  );
}

function OrderDetails({ orderDetails }: { orderDetails: OrderType }) {
  const router = useRouter();

  return (
    <>
      <Link
        href={{
          pathname: "/orders",
          query: { mode: "orders" },
        }}
        as={`/orders`}
      >
        <button onClick={() => router.back()}>
          <FiArrowLeft size={20} color="var(--color-foreground)" />
        </button>
      </Link>
      <h2 className={classes.title}>
        Order Number: {orderDetails?.number ?? "Something went wrong"}
      </h2>
      <table
        //@ts-ignore
        border={1}
        cellPadding={20}
        className={classes.tableContainer}
      >
        <thead>Order Details</thead>
        <tbody>
          <tr>
            <th>Street</th>
            <th>{orderDetails?.details?.address?.street}</th>
          </tr>
          <tr>
            <td>Number</td>
            <td>{orderDetails?.details?.address?.number}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
