import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'

import ill1 from '../assets/img/ill1.png'
import LoginNav from '../components/loginNav';
import lgbg from '../assets/img/login-bg.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginPage() {

  const navigate = useNavigate();

  const navSignUp = () => {
    navigate('/accounts/signup')
  }

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [load, setLoad] = useState('Login');

  const Login = (e) => {
    setLoad('loading..')
    e.preventDefault();
    if (email !== '' && password !== '') {
      if (password.length > 7) {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          console.log(userCredential);
          setLoad('Navigating to home page..')
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
        }).catch((error) => {
          setLoad('Login')
          toast.error('No user found or bad credenitals', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
          })
          console.log(error);
        })
      } else {
        setLoad('Login')
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
    } else {
      setLoad('Login')
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


  return (
    <>
      {/* <LoginNav/> */}
      <ToastContainer />
      <div class="login6">
        <img src={lgbg} alt="" class="login__img6" />

        <div class="login__form6">
          <h1 class="login__title6">Login</h1>

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

          <div class="login__check6">

            <a class="login__forgot6" style={{ cursor: 'pointer' }} >Forgot Password?</a>
          </div>

          <button onClick={Login} class="login__button6">{load}</button>

          <p class="login__register6">
            Don't have an account? <a onClick={navSignUp} >Register</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
