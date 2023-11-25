import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import emailjs from '@emailjs/browser';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close, Try } from '@mui/icons-material'

function Address() {

  const [openAirPopup, setAirPopup] = useState(false);

  const [isPaymentProcessing, setPaymentProcessing] = useState(false);

  const navigate = useNavigate();

  const { productId } = useParams();

  const [Product, setProduct] = useState(null);

  const [Sum, setSum] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDocRef);

        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data());
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (fullName.length > 0 && emaill.length > 0 && phoneNumber.length > 0 && addLine1.length > 0 && pincode.length > 0) {
      setSum(true)
    } else {
      setSum(false);
    }
  })

  const [fullName, setFullName] = useState('');
  const [emaill, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addLine1, setAddLine1] = useState('');
  const [addLine2, setAddLine2] = useState('');
  const [pincode, setPincode] = useState('');

  const [PayButton, setPayButton] = useState('Pay Now');

  const [loaderPr, setLoaderPr] = useState('');
  const [dummy, seDummy] = useState('orderPr');



  const form = useRef();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Month is zero-based
  const year = today.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const shDate = `${formattedDay}/${formattedMonth}/${year}`;


  const UpdateDisabled = async () => {
    const prIDD = productId;
    const Availablty = Product.avb;
    try {
      const productRef = doc(db, "products", prIDD);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        // Product document exists, retrieve its data
        const productData = productSnapshot.data();

        // Update the specific fields (title and price)
        if (Availablty !== undefined) {
          productData.avb = 'No Stock';
        }

        // Update the product document with the new data
        await updateDoc(productRef, productData);
        console.log('Product updated successfully!');
      } else {
        console.log('No such product document!');
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleSubmit1 = (e) => {
    e.preventDefault()
    setAirPopup(true)
  }

  const onsdd = (e) => {
    e.preventDefault();
  }

  if (!Product) {
    return <div className='container10' > <div className="container10">Loading...</div></div>
  }

  return (
    <>
      <ToastContainer />
      <div className="container13">
        <div className="container12">
          <form className="form13" ref={form} id={loaderPr} onSubmit={handleSubmit1}  >
            <div className="allPr">
              <div className="image10" >
                <img src={Product.image} alt="" id='primg' />
                <h1>Amount : ₹{Product.amount}</h1>
              </div>
              <div className="input12">
                <input type="text" placeholder='Full Name' id='flname' name='flname' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="email" placeholder='Email' name='email' value={emaill} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Phone number' name='phnmber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input type="text" placeholder='Address line 1' name='addLine1' value={addLine1} onChange={(e) => setAddLine1(e.target.value)} />
                <input type="text" placeholder='Address line 2' name='addLine2' value={addLine2} onChange={(e) => setAddLine2(e.target.value)} />
                <input type="text" placeholder='pincode' name='pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                <input type="text" id='orderPr' name='message' value={`Order for ${Product.title} at ₹${Product.amount} is placed. Product ID : ${productId}.`} />
                <input type="text" id='orderPr' name='prname' value={Product.title} />
                <input type="text" id='orderPr' name='date' value={shDate} />
                <input type="text" id='orderPr' name='id' value={productId} />
                <input type="text" id='orderPr' name='price' value={Product.amount} />
              </div>
              <div className="lsdjnfs">
                <button id="buyBtn" type='submit' > {isPaymentProcessing ? 'Processing...' : 'Pay Now'} </button>
              </div>
            </div>
          </form>
          <div className="container10" id={dummy} >
            <h4 className='label10' >Navigating..</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Address
