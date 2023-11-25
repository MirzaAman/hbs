import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close, Try } from '@mui/icons-material'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from '../../components/firebase/config'
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'

function Admin() {

  const productsChannelRef = collection(db, "products")
  const navigate = useNavigate();

  const [openAirPopup, setAirPopup] = useState(false);
  const [openAirPopup2, setAirPopup2] = useState(false);
  const [Item, setItem] = useState('');
  const [Amount, setAmount] = useState(10);
  const [Img, setImg] = useState('');
  const [Desc, setDesc] = useState('');
  const [Mesure, setMesure] = useState('');
  const [Availablty, setAvailablty] = useState('');

  const [Item2, setItem2] = useState('');
  const [Amount2, setAmount2] = useState(10);
  const [Desc2, setDesc2] = useState('');
  const [Mesure2, setMesure2] = useState('');
  const [Availablty2, setAvailablty2] = useState('');

  const [uploadImage, setuplaodImage] = useState(null);

  const [products, setProducts] = useState([]);

  const [updBtn, setUpdBtn] = useState('Upld IMG');


  useEffect(() => {

    const getProducts = async () => {
      const data = await getDocs(productsChannelRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getProducts();

  }, [])

  const getProducts = async () => {
    const data = await getDocs(productsChannelRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const uploadImagee = async () => {

    setUpdBtn('Loading..');

    if (!uploadImage) return;

    const storageRef = ref(storage);

    const imageRef = ref(storage, `images/${uploadImage.name}`);

    try {
      // Upload image to Firebase Storage
      await uploadBytes(imageRef, uploadImage);

      // Get the URL of the uploaded image
      const url = await getDownloadURL(imageRef);
      // setImg(url);
      console.log(url); // Note: Use 'url' instead of 'Img'
      setImg(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setUpdBtn('uploaded!')

  }

  const addData = async () => {
    try {
      // Upload the image and set the Img state
      // await uploadImagee();

      // Wait for the Img state to be set before proceeding with Firestore write
      if (Img) {
        await addDoc(productsChannelRef, {
          title: Item,
          amount: Amount,
          image: Img, // Assuming Img holds the URL
          desc: Desc,
          mes: Mesure,
          avb: Availablty
        });

        // Perform other actions after Firestore write
        getProducts();
        setAirPopup(false);
        setAmount('');
        setItem('');
      } else {
        console.error('Image URL is missing.');
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  const dltPrdct = async (id) => {
    const Product = doc(db, 'products', id)
    await deleteDoc(Product).then(() => {
      getProducts()
    });
  }

  const [tempPrId, setTempPrId] = useState('');

  const editProductPopup = (productId) => {
    setAirPopup2(true);
    setTempPrId(productId);
    showPr(productId);
  }

  const EditData = async () => {
    const ProductId = tempPrId;
    try {
      const productRef = doc(db, "products", ProductId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        // Product document exists, retrieve its data
        const productData = productSnapshot.data();

        // Update the specific fields (title and price)
        if (Item2 !== undefined) {
          productData.title = Item2;
        }
        if (Amount2 !== undefined) {
          productData.amount = Amount2;
        }
        if (Desc2 !== undefined) {
          productData.desc = Desc2;
        }
        if (Mesure2 !== undefined) {
          productData.mes = Mesure2;
        }
        if (Availablty2 !== undefined) {
          productData.avb = Availablty2;
        }

        // Update the product document with the new data
        await updateDoc(productRef, productData);
        // console.log('Product updated successfully!');
        setAirPopup2(false);
        setTempPrId('');
        toast.success('Product updated successfully', {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        })
        getProducts();
      } else {
        // console.log('No such product document!');
        toast.error('Something went wrong or product not found in database', {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const showPr = async (ProductId) => {
    try {
      const productRef = doc(db, "products", ProductId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        // Product document exists, retrieve its data
        const productData = productSnapshot.data();

        // Update the specific fields (title and price)
        if (productData.title !== undefined) {
          setItem2(productData.title)
        }
        if (productData.amount !== undefined) {
          setAmount2(productData.amount)
        }
        if (productData.avb !== undefined) {
          setAvailablty2(productData.avb)
        }
        if (productData.mes !== undefined) {
          setMesure2(productData.mes)
        }
        if (productData.desc !== undefined) {
          setDesc2(productData.desc)
        }

      } else {
        // console.log('No such product document!');
      }
    } catch (error) {

    }
  }

  const showSbr = () => {
    navigate('/admin/panel/subcriptions')
  }

  return (
    <>
      <ToastContainer />
      <div className="filter"></div>

      <table className="table1">
        <button className="addBtn" onClick={showSbr} style={{marginRight:'20px',background:'#d12013'}} >Subscribed users</button>
        <button onClick={() => setAirPopup(true)} className='addBtn' >Add product</button>
        <tr className="tr1">
          <th className="th1">Image</th>
          <th className="th1">Title</th>
          <th className="th1">Description</th>
          <th className="th1">Measurement</th>
          <th className="th1">Price</th>
          <th className="th1">avb</th>
        </tr>
        {
          products.map((items, index) => {
            return (
              <tr className="tr2" key={index} >
                <td className="td1"> <img height={10} width={20} src={items.image} alt="" /> </td>
                <td className="td1"> {items.title} </td>
                <td className="td1"> {items.desc} </td>
                <td className="td1"> {items.mes} </td>
                <td className="td1"> {items.amount} </td>
                <td className="td1"> {items.avb} </td>
                <td className="td1"> <button className='editBtn' onClick={() => editProductPopup(items.id)} >Edit</button></td>
                <td className="td1"> <button className='deltBtn' onClick={() => dltPrdct(items.id)} >Delete</button></td>
              </tr>
            );
          })
        }
      </table>

      


      {/* POPUP OPEN */}
      <Dialog open={openAirPopup} >
        <DialogTitle>
          <div className="title">
            <div className="hed">New product</div>
            <div className="icon-cross" onClick={() => setAirPopup(false)} ><Close /></div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input type="file" onChange={(e) => setuplaodImage(e.target.files[0])} placeholder='Image' />
              <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='PR Name' />
              <input type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
              <input type="text" value={Desc} onChange={(e) => setDesc(e.target.value)} placeholder='Desc' />
              <input type="text" value={Mesure} onChange={(e) => setMesure(e.target.value)} placeholder='Mesure' />
              <div>
                <label>Select an option: </label>
                <select value={Availablty} onChange={(e) => setAvailablty(e.target.value)}>
                  <option value="">-- Select One --</option>
                  <option value="In Stock">In Stock</option>
                  <option value="No Stock">No Stock</option>
                </select>
              </div>
            </div>
            <div className="buttons">
              <button onClick={uploadImagee} >{updBtn}</button>
              <button onClick={addData} >Add</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* POPUP CLOSED */}



      {/* POPUP OPEN */}
      <Dialog open={openAirPopup2} >
        <DialogTitle>
          <div className="title">
            <div className="hed">Edit product</div>
            <div className="icon-cross" onClick={() => setAirPopup2(false)} ><Close /></div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input type="text" value={Item2} onChange={(e) => setItem2(e.target.value)} placeholder='pr name' />
              <input type="number" value={Amount2} onChange={(e) => setAmount2(e.target.value)} placeholder='Amount ₹' />
              <input type="text" value={Desc2} onChange={(e) => setDesc2(e.target.value)} placeholder='Desc' />
              <input type="text" value={Mesure2} onChange={(e) => setMesure2(e.target.value)} placeholder='Mesure' />
              <div>
                <label>Select an option: </label>
                <select value={Availablty2} onChange={(e) => setAvailablty2(e.target.value)}>
                  <option value="">-- Select One --</option>
                  <option value="In Stock">In Stock</option>
                  <option value="No Stock">No Stock</option>
                </select>
              </div>
            </div>
            <div className="buttons">
              <button onClick={EditData} >Submit</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* POPUP CLOSED */}
    </>
  )
}

export default Admin


