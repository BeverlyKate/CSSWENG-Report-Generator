import React from "react";
import FullLogo from "./FullKevlerLogo.png";

import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;
  const content = (
    <>
      <div className="upperbox">
        <img src={FullLogo} alt="" />
      </div>
      <div className="lowerbox">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-1">
            username:
          </label>
          <input
            className="input-box"
            type="text"
            id="username"
            name="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password" className="text-1">
            password:
          </label>
          <input
            className="input-box"
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
          <b>
            <p
              ref={errRef}
              className={errClass}
              aria-live="assertive"
              type="error"
              id="loginError"
            >
              {errMsg}
            </p>
          </b>
          <button type="submit" id="login" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </>
  );
  
  return content;
};

export default Login;
