// import { React, useState, useEffect } from 'react'
// import axios from 'axios';
// import { collection, addDoc, doc, getDoc, setDoc, updateDoc, getDocs, } from "firebase/firestore";
// import { getAuth } from 'firebase/auth'
// import { db } from './firebase/config'

// function HomePage(props) {
//     const productsChannelRef = collection(db, "products")

//     const { homePic, aboutPic } = props;

//     const [Products, setProducts] = useState([]);

//     const [cartItemCount, setCartItemCount] = useState(0);


//     useEffect(() => {

//         const getProducts = async () => {
//             const data = await getDocs(productsChannelRef);
//             setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//         }

//         getProducts();

//     }, [])

    // const getProducts = async () => {
    //     const data = await getDocs(productsChannelRef);
    //     setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // }

    // const incrementCartCount = async () => {

    //     const user = getAuth().currentUser?.uid;
    //     const productsChannelRef = doc(collection(db, "carts"), user)

    //     try {
    //         await setDoc(productsChannelRef, {
    //             // Update the cart data structure based on your Firestore structure
    //             itemCount2: cartItemCount + 1,

    //         });
    //         setCartItemCount(cartItemCount + 1);
    //     } catch (error) {
    //         console.error('Error updating cart count:', error);
    //     }

    // };


//     return (
        

//     )
// }

// export default HomePage;
