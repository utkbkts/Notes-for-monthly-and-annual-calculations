import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import "./process.css";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  selectedMonth: "January",
  selectedYear: 2023,
  title: "",
  description: "",
  number: "",
};

const Process = () => {
  const [form, setForm] = useState(initialState);
  const { getmonth, getYear, todo, user } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate()
  const getBlogDetailUpdate = async () => {
    const docRef = doc(db, "Todo", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists) {
      setForm({ ...snapshot.data() });
    }
  };
  useEffect(() => {
    if (id) {
      getBlogDetailUpdate();
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form) {
        if (!id) {
          await addDoc(collection(db, "Todo"), {
            ...form,
            timestamps: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
        } else {
          try {
            await updateDoc(doc(db, "Todo", id), {
              ...form,
              timestamp: serverTimestamp(),
              author: user.displayName,
              userId: user.uid,
            });
            console.log("Blog updated successfully");
          } catch (err) {
            console.log(err);
          }
        }
      }
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="Form-Created">
      <h3>{id ? "Update Blog" : "Create Blog"}</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="wrapper">
          <input
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Title.."
            name="title"
            id=""
          />
          <input
            value={form.description}
            type="text"
            onChange={handleChange}
            placeholder="description.."
            name="description"
            id=""
          />
          <input
            value={form.number}
            type="number"
            onChange={handleChange}
            placeholder="number.."
            name="number"
            id=""
          />
          <select
            value={form.selectedMonth}
            onChange={handleChange}
            name="selectedMonth"
          >
            {getmonth?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={form.selectedYear}
            onChange={handleChange}
            name="selectedYear"
          >
            {getYear?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div>
            <Button type="primary" htmlType="submit">
              {" "}
              {id ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Process;
