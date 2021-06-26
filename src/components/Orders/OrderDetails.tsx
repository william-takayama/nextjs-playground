import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { OrderType } from "../../pages/orders";
import { withOptimizedAnimation } from "../HOC/withLazyMotion/withOptimizedAnimation";
import classes from "./Order.module.scss";

function OrderDetails({ orderDetails }: { orderDetails: OrderType }) {
  const router = useRouter();

  return (
    <>
      <div className={classes.container}>
        <Link
          href={{
            pathname: "/orders",
            query: { mode: "orders" },
          }}
          as={`/orders`}
        >
          <button onClick={() => router.back()}>
            <FiArrowLeft size={20} color="var(--color-contrast)" />
          </button>
        </Link>
        <h2 className={classes.title}>
          Order Number: {orderDetails?.number ?? "Something went wrong"}
        </h2>
      </div>
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

export default withOptimizedAnimation(OrderDetails, "OrderDetails");
