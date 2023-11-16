import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import "../register/Register.css";
import { auth} from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      console.log("login successfuly");
      return response.user;
    } catch (error) {
      console.log(error);
    }
  };


 

  return (
    <div className="Register">
      <h2>Sign In Page</h2>
      <form action="" onSubmit={handleSubmit}>
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
        </div>
        <div className="__b">
          <Button  type="primary" htmlType="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
