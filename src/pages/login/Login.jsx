import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const { user, loading, error, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    login(credentials).then(() => {
      navigate("/");
    });
  };

  console.log("user...: ", user);

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="name"
          id="name"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
