import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase/config'
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import product1 from '../../../assets/img/1.png'
import LoginNav from '../../loginNav'
import { useHistory } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react'
import { Link } from 'react-router-dom';

function Product() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [buyButton, setBuyButton] = useState(null);

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
    // checkAvb();
  },[productId]);

  if (!product) {
    return <div className='container10' > <div className="container11">Loading...</div> </div>
  }

  const BuyProduct = () => {
    navigate('/payment/address')
  }

  return (
    <>

      <LoginNav />

      <div className="card-wrapper">
        <div className="card">

          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img className='img' src={product.image} alt="shoe image" />
              </div>
            </div>
          </div> 
          {/* <!-- card right --> */}
          <div className="product-content">
            <h2 className="product-title">{product.title}</h2>
            <a onClick={() => navigate('/')} style={{cursor:'pointer'}} className="product-link">visit HBS store</a>

            <div className="product-price">
              <p className="new-price">Price: <span>₹{product.amount}.00</span></p>
              <p className="new-price">Measurement: <span>₹{product.mes}</span></p>
            </div>

            <div className="product-detail">
              <h2>about this item: </h2>
              <p>{product.desc}</p>
              <ul>
                <li>Available: <span>{product.avb}</span></li>
                <li>Shipping Area: <span>All over kerala</span></li>
              </ul>
            </div>

            <div className="purchase-info">

              {
                product.avb ==='In Stock'? 
                <Link to={`/payment/addressFor/${productId}`} > <button id='buyBtn' >Buy Now</button> </Link>
                :
                <button id='notBuyBtn' disabled  >Not Available</button>
              }

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Product
