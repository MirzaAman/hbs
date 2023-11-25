import React, { useEffect, useState } from 'react'
import thanks from '../../../../assets/img/Thank You Card.png'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

function PaymentSuccess() {

  const navigate = useNavigate();

  // useEffect(() => {
  //   toast.success('Your order has been placed', {
  //     position: "top-center",
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined
  //   })

  // })

  return (
    <>
      <ToastContainer />
      <div className="container7">
        <div className="thanks-card">
          <img src={thanks} alt="your order has been placed" />
          <button className='userEmailBtn' onClick={() => navigate('/')} >Go Home </button>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess
