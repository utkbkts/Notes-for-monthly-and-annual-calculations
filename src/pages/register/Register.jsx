import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const Register = () => {
  const [name,setname]=useState("")
  const [lastname,setlastname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [error,setError]=useState(false)

  useEffect(() => {
    passwordType();
  }, [password]);

  const passwordType = () => {
    if (password.length === 0) {
      setError("");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters.");
    } else {
      setError("");
    }
  };


  const handlesubmit=async(e)=>{
    e.preventDefault()
      try {
        const Response = await createUserWithEmailAndPassword(auth,email,password)
        if(Response.user){
          const userRef = collection(db,"Users")
          const userDoc = await addDoc(userRef,{
            displayName:name,
            lastname:lastname,
            email: email,
            password: password,
            time: serverTimestamp(),
            uid: Response.user.uid,
          });
            await updateProfile(Response.user, {
            displayName: name,
  
          });
          localStorage.setItem("user", JSON.stringify(Response.user));
        }
        console.log("Register Successfully");
        return Response.user;
      } catch (error) {
        console.log(error);
      }
  }

 


  return (
    <div className="Register">
      <h2>Sign Up Page</h2>
      <form action="" onSubmit={handlesubmit}>
        <div className="wrapper">
          <div className="__a">
            <input value={name} onChange={(e)=>setname(e.target.value)} type="text" required name="name"  placeholder=" " />
            <label htmlFor="">Name</label>
          </div>
          <div className="__a">
            <input
              type="text"
              required
              name="lastname"
              value={lastname} onChange={(e)=>setlastname(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="">LastName</label>
          </div>
        </div>
        <div className="__a">
          <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" required name="email"  placeholder=" " />
          <label htmlFor="">Email</label>
        </div>
        <div className="__a">
          <input
            type="password"
            value={password} onChange={(e)=>setpassword(e.target.value)}
            required
            name="password"
            placeholder=" "
          />
          <label htmlFor="">Password</label>
         {error && (<span className="error">{error}</span>)}
        </div>
        <div className="__b">
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
