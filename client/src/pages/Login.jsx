import React from "react";
import cls from "./Login.module.css";
import { asset, PF } from "./../constants/constants";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, tryLogin } from "../store/auth";
import { useRef, useState } from "react";
import axios from "axios";
import { loginUser } from "../store/auth";

const Login = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginError } = useSelector(state => state.ui);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    
    dispatch(loginUser(userData));
  };

  const googleAuthHandler = () => {
      // window.open('http://localhost:8000/auth/google', '_self');
  }

  return (
    <div className={cls["outer-container"]}>
      <div className={cls["poster-container"]}>
        <img src={asset('poster.avif', "cover")} alt="" className={cls["poster"]} />
      </div>
      <div className={cls["login-container"] + " box-shadow"}>
        <form onSubmit={submitHandler} className={cls["login-form"]}>
          <div className={cls["brand-container"]}>
            <img src={asset('', 'profile')} alt="" className={cls["brandLogo"]} />
            <span className={cls["brand-title"]}>ChatOcean</span>
          </div>
          <div className={cls["inner-container"]}>
            <div className={cls["normal-login-wrapper"]}>
              <div className={cls["form-control"]}>
                <label htmlFor="email">Email</label>
                <input required ref={emailRef} id="email" type="email" />
              </div>
              <div className={cls["form-control"]}>
                <label htmlFor="password">Password</label>
                <input required ref={passwordRef} id="password" type="password" />
              </div>
                <div className={cls["submit-wrapper"]}>
                  <button className={cls["submit-btn"]} type="submit" >Log In</button>
                  { loginError && <span className={cls["error"]}>{loginError}</span> }
                </div>
            </div>
           <div className={cls["form-divider"]} ></div>
            {/* To be completed */}
           <div className={cls["oauth-login-wrapper"]}>
              <span>Log In with </span>
              <button onClick={googleAuthHandler} className={cls["google"]}>
                <GoogleIcon /> Google                
              </button> 
            </div> 
          </div>
        </form>
        <div className={cls["other-options"]}>
          <span className={cls["other-options-text"]}>
            Don't have an account yet?
          </span>
          <Link to="/register" className={cls["other-options-btn"] + " linkStyles"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
