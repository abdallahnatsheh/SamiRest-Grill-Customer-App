import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase.Config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
/*
custom hook used to get special  orders of specific user

*/
export const useProfileSpecialOrdersHook = () => {
  const [documents, setDocuments] = useState([]);
  const [row, setRow] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const updatedOrder = [...row];

    onSnapshot(
      query(
        collection(db, "specialOrders"),
        where("dataUser.uid", "==", currentUser ? currentUser.uid : "")
      ),
      (snapshot) => {
        setDocuments(
          snapshot.docs.map((document) => {
            let temp = {
              id: document.id,
              date: document.data().orderDate,
              time: document.data().orderTime,
              status: document.data().status,
              orders: document.data().specialOrder,
              orderType: "special",
            };
            const updatedItemIndex = updatedOrder.findIndex(
              (item) => item.id === temp.id
            );

            if (updatedItemIndex < 0) {
              updatedOrder.push(temp);
            } else {
              const updatedItem = {
                ...updatedOrder[updatedItemIndex],
              };
              updatedOrder[updatedItemIndex] = updatedItem;
            }
            setRow(updatedOrder);
          })
        );
      }
    );
  }, [currentUser]);

  return row;
};
