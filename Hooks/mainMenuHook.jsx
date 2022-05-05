import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase.Config";
import { collection, onSnapshot } from "firebase/firestore";
/*
custom hook used to get main menu meals from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the menu database
*/
export const useGetMainMenuMeals = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "MainMenu"), (snapshot) => {
        setDocuments(snapshot.docs.map((doc) => doc));
      }),
    []
  );
  return [documents];
};
