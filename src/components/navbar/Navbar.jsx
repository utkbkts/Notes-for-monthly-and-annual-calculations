import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import MyContext from "../../context/context";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
const Navbar = () => {
  const { user, todo,searchTerm, setSearchTerm } = useContext(MyContext);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const navigate = useNavigate();
  const SignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="Navbar">
      <div className="__a">
        <h1>LOGO</h1>
      </div>
      <div style={{ flex: "1" }}>
        <ul className="item">
          <span className="input">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </span>
          {user ? (
            <>
              <span>Welcome,{user.displayName}</span>
              <Button onClick={SignOut} type="primary" danger>
                Logout
              </Button>
              <Link to={"/process"}><Button type="primary">Add Todo</Button></Link>
            </>
          ) : (
            <>
              {" "}
              <Link to={"/login"}>
                <li>Login</li>
              </Link>
              <Link to={"/signup"}>
                <li>Register</li>
              </Link>
            </>
          )}
         
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
