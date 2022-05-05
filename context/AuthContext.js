import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../Firebase/firebase.Config";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
//import { NotificationManager } from "react-notifications";
import * as RootNavigation from "../navigation/rootNavigation";
import { Alert } from "react-native";
//this authentication context all the magic happen here
//create context and create google provider
const authContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  //contains user login data
  const [currentUser, setCurrentUser] = useState(null);
  //contains user personal data
  const [dataUser, setdataUser] = useState([]);

  //create account and send verification email to be verified
  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
      sendEmailVerification(auth.currentUser);
      RootNavigation.navigate("Home");
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert("خطأ", "الإيميل مستخدم بالفعل", [{ text: "حسناً" }]);
          break;
        case "auth/wrong-password":
          Alert.alert("خطأ", "الايميل او كلمة السر خطأ", [{ text: "حسناً" }]);
          break;
        case "auth/user-not-found":
          Alert.alert("خطأ", "المستخدم غير مسجل", [{ text: "حسناً" }]);
          break;
        default:
          Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);
          break;
      }
    }
  };
  //login with email and password , it first sign out the user if he is login then sign in
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      RootNavigation.navigate("Home");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert("خطأ", "الإيميل مستخدم بالفعل", [{ text: "حسناً" }]);
          break;
        case "auth/wrong-password":
          Alert.alert("خطأ", "الايميل او كلمة السر خطأ", [{ text: "حسناً" }]);
          break;
        case "auth/user-not-found":
          Alert.alert("خطأ", "المستخدم غير مسجل", [{ text: "حسناً" }]);
        case "auth/too-many-requests":
          Alert.alert(
            "خطأ",
            "عدد كبير من محاولات تسجيل الدخول , حاول في وقت لاحق",
            [{ text: "حسناً" }]
          );
          break;
        default:
          Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);

          break;
      }
    }
  };
  //login using google mail service , check if existed if not it will create prifile for him
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      //navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          // NotificationManager.error("الإيميل مستخدم بالفعل", "خطأ", 5000);
          break;
        case "auth/wrong-password":
          //NotificationManager.error("الايميل او كلمة السر خطأ", "خطأ", 5000);
          break;
        case "auth/user-not-found":
          //NotificationManager.error("المستخدم غير مسجل", "خطأ", 5000);
          break;
        case "auth/popup-closed-by-user":
          //NotificationManager.error("المستخدم  اغلق التسجيل", "خطأ", 5000);
          break;
        default:
          //NotificationManager.error("خطأ في الخدمة", "خطأ", 5000);
          break;
      }
    }
  };

  //log out simple and easy
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setdataUser([]);
  };
  // it will send password reset mail
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("تم ارسال الطلب", "سيصلك ايميل لتغيير كلمة السر", [
        { text: "حسناً" },
      ]);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("خطأ", "الايميل غير صالح", [{ text: "حسناً" }]);
          break;
        case "auth/user-not-found":
          Alert.alert("خطأ", "المستخدم غير مسجل", [{ text: "حسناً" }]);
          break;
        default:
          Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);
          break;
      }
    }
  };
  ///hook to manage logged user data and if he is logged or not, changed if the user changed
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = user
          ? query(collection(db, "users"), where("uid", "==", user?.uid))
          : "";
        const querySnapshot = q ? await getDocs(q) : "";
        setdataUser(querySnapshot ? querySnapshot.docs[0]?.data() : []);
        setCurrentUser(user);
      }
    });
  }, []);

  const value = {
    currentUser,
    dataUser,
    signUp,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
