import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {auth} from '../components/firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth'

import ill2 from '../assets/img/ill2.png'
import lgbg from '../assets/img/login-bg.png'
import LoginNav from '../components/loginNav';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignupPage() {

  const navigate = useNavigate();

  const navSignUp = () => {
    navigate('/accounts/login')
  }

  const home = () => {
    navigate('/')
  }

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [load,setLoad] = useState('Sign Up');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const SignUp = (e) =>{
    setLoad('loading...')
    e.preventDefault();
    if(email !== '' && password !==''){
      if(password.length > 7){
        createUserWithEmailAndPassword(auth, email,password).then((userCredential)=>{
          localStorage.setItem('user',true);
          setLoad('Navigating to home page..')
          console.log(userCredential);
          toast.success(`Logged in as ${userCredential.user.email} `, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
          })
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }).catch((error)=>{
          console.log(error);
        })
      }else{
        setLoad('Sign Up')
        toast.error("The password must include 8 characters or above", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        })
      }
    }else{
      setLoad('Sign Up')
      toast.error("Please enter the credentials", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      })
    }
  }

  // const Up = firebase.auth().currentUser?.email

  return (
    <>
    <ToastContainer />
    <div class="login6">
        <img src={lgbg} alt="" class="login__img6" />

        <div class="login__form6">
          <h1 class="login__title6">Sign Up</h1>

          <div class="login__content6">
            <div class="login__box6">
              <i class="ri-user-3-line login__icon6"></i>

              <div class="login__box-input6">
                <input type="email" required class="login__input6" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
                <label htmlFor="" class="login__label6">Email</label>
              </div>
            </div>

            <div class="login__box6">
              <i class="ri-lock-2-line login__icon6"></i>

              <div class="login__box-input6">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required class="login__input6" id="login-pass" placeholder=" " />
                <label htmlFor="" class="login__label6">Password</label>
                <i onClick={handleTogglePassword} class={showPassword ? 'ri-eye-line login__eye6' : 'ri-eye-off-line login__eye6'} id="login-eye"></i>
              </div>
            </div>
          </div>

          <button onClick={SignUp} class="login__button6">{load}</button>

          <p class="login__register6">
            Already have an account? <a onClick={navSignUp} >Login</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupPage;
