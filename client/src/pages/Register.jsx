import cls from "./Register.module.css";
import { asset, PF } from "./../constants/constants";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { validateRegisterForm } from "../validations/formValidations";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef(); 
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const msg = new URLSearchParams(location.search).get("msg");
    if (msg === 'notfound') setError("User not found! Please register here");
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    
    const { err, user } = validateRegisterForm(emailRef.current.value, usernameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value);
    if (err) return setError(err);
    
    
    try {
      await axios.post('/register', user);
      navigate('/login');
    } catch (err) {
      console.log(err); 
    }
  } 
    
  const googleAuthHandler = () => {
      // window.open('http://localhost:8000/auth/google', '_self');
  } 

  return (
      <div className={cls["outer-container"]}>
          <div className={cls["poster-container"]}>
            <img src={asset('poster.avif', "cover")} alt="" className={cls["poster"]} />
          </div>
          <div className={cls["register-container"] + " box-shadow"} >
            <form onSubmit={submitHandler} className={cls["register-form"]}>
                <div className={cls["brand-container"]}>
                    <img src={asset('', 'profile')} alt="" className={cls["brandLogo"]} />
                    <span className={cls["brand-title"]}>ChatOcean</span>
                </div>
                <div className={cls["inner-container"]}>
                  <div className={cls["normal-register-wrapper"]}>
                    <div className={cls["form-control"]}>
                        <label htmlFor="email">Email</label>
                        <input ref={emailRef} required id="email" type="email" />
                    </div>                    
                    <div className={cls["form-control"]}>
                        <label htmlFor="username">Username</label>
                        <input ref={usernameRef} required id="username" type="text" />
                    </div>                    
                    <div className={cls["form-control"]}>
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} required id="password" type="password" />
                    </div>                    
                    <div className={cls["form-control"]}>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input ref={confirmPasswordRef} required id="confirm-password" type="password" />
                    </div>                    
                    <div className={cls["submit-wrapper"]}>
                      <button className={cls["submit-btn"]} type="submit" >Sign Up</button>
                      { error && <span className={cls["error"]}>{error}</span> }
                    </div>
                  </div>
                   <div className={cls["form-divider"]} ></div>
                  {/* To be completed */}
                   <div className={cls["oauth-register-wrapper"]}>
                      <span>Register with </span>
                      <button onClick={googleAuthHandler} className={cls["google"]}>
                        <GoogleIcon /> Google                
                      </button> 
                    </div> 
                </div>
            </form> 
            <div className={cls["other-options"]}>
                <span className={cls["other-options-text"]}>Already have an account?</span>
                <Link to="/login" className={cls["other-options-btn"] + " linkStyles"}>Log In</Link>
            </div>
          </div>
      </div>
  )
}

export default Register