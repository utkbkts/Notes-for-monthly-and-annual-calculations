import React, { useEffect, useState } from "react";
import MyContext from "./context";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useParams } from "react-router-dom";

const Mystate = ({ children }) => {
  const {id}=useParams()

  //!USERONOUT

  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const [getmonth, setgetmonth] = useState([]);
  //!MonthGet
  const montstorage = async () => {
    const colref = collection(db, "Months");
    const q = query(colref, orderBy("order"));
    const docsnap = await getDocs(q);

    let dizi = [];

    docsnap.forEach((doc) => {
      dizi.push({ ...doc.data(), id: doc.id });
    });

    setgetmonth(dizi);
    return dizi;
  };
  useEffect(() => {
    montstorage();
  }, []);
  //!GetYear
  const [getYear, setGetYear] = useState([]);
  const getyear = async () => {
    const colref = collection(db, "Years");
    const q = query(colref, orderBy("name"));
    const docsnap = await getDocs(q);

    let dizi = [];

    docsnap.forEach((doc) => {
      dizi.push({ ...doc.data(), id: doc.id });
    });
    setGetYear(dizi);
    return dizi;
  };
  useEffect(() => {
    getyear();
  }, []);

  //!getTodo
  // query(collection(db, "Todo"), where("userId", "==", user.uid)), //!herkes kendi todosunu görür
  const [todo, setTodo] = useState([]);
  const todoget = async () => {
    const unsub = onSnapshot(
      collection(db, "Todo"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTodo(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  };
  useEffect(() => {
    todoget();
  }, []);
  //!search
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todo.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  //!deletedoc

  const handleDeleteDoc = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?"))
      try {
        await deleteDoc(doc(db, "Todo", id));
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <MyContext.Provider
      value={{
        getmonth,
        searchTerm,
        setSearchTerm,
        setgetmonth,
        getYear,
        todo,
        user,
        filteredTodos,
        handleDeleteDoc,
        id
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Mystate;
