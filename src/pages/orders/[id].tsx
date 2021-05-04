import React, { useState } from "react";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import { orders } from "../../mock/orders";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.id,
      order: orders.find((order) => order.number === ctx.params.id),
    },
  };
};

export default function DetailPage({
  id,
  order,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  return (
    <BottomSheet
        id="details"
        visible={true}
        onDismiss={() => {}}
      >
        <button onClick={() => router.back()}>
          <FiArrowLeft size={20} color="var(--color-foreground)" />
        </button>
        <h1>Order Number: {order?.number ?? "Something went wrong"}</h1>
        <table
          //@ts-ignore
          border={1}
          cellPadding={20}
          style={{
            fontSize: "1rem",
            borderColor: "white",
            textAlign: "center",
            width: "60%",
          }}
        >
          <thead>Order Details</thead>
          <tbody>
            <tr>
              <th>Street</th>
              <th>{order?.details?.address?.street}</th>
            </tr>
            <tr>
              <td>Number</td>
              <td>{order?.details?.address?.number}</td>
            </tr>
          </tbody>
        </table>
      </BottomSheet>
  );
}
