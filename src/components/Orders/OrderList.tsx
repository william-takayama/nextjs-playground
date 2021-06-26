import Link from "next/link";
import React from "react";
import { OrderType } from "../../pages/orders";
import { withOptimizedAnimation } from "../HOC/withLazyMotion/withOptimizedAnimation";
import classes from "./Order.module.scss";

function OrdersList({ orders }: { orders: OrderType[] }) {
  return (
    <ul className={classes.ordersList}>
      {orders.map((order) => (
        <Link
          href={{
            pathname: "/orders",
            query: { mode: "details", orderNumber: order.number },
          }}
          as={`/orders/${order.number}`}
        >
          <a>
            <li className={classes.orderItem}>
              <h2 className={classes.title}>Number: {order.number}</h2>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
}

export default withOptimizedAnimation(OrdersList, "OrdersList", {
  initial: { opacity: 0, y: "-50%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-50%" },
  transition: { type: "spring", damping: 25 },
});
