import React, { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyProfile() {

  // const [profileImage, setProfileImage] = useState(null);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setProfileImage(file);
  // }

  // const navigate = useNavigate();
  // const profileChannelRef = collection(db, "profiles")

  // const [dpImg, setDpImg] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [PhoneNumber, setPhoneNumber] = useState('');
  // const [streetName, setStreetName] = useState('');
  // const [LandMark, setLandMark] = useState('');
  // const [pinCode, setPincode] = useState('');
  // const [AdressLine1, setAdressLine1] = useState('');
  // const [AdressLine2, setAdressLine2] = useState('');
  // const [gender, setGender] = useState('');

  // const [array, setArray] = useState([]);

  // const [UserReg, setUserReg] = useState(false);


  // useEffect(() => {

  //   const getProfile = async () => {
  //     const localStorageValue = localStorage.getItem('userReg');
  //     if (localStorageValue === 'true') {
  //       setUserReg(true);
  //     } else {
  //       setUserReg(false);
  //     }
  //     console.log(UserReg);
  //   };

  //   getProfile();

  // }, [])

  // const postData = async () => {
  //   if (fullName && PhoneNumber && streetName && LandMark && pinCode && AdressLine1 && gender !== '') {
  //     if (PhoneNumber.length > 9) {
  //       await addDoc(profileChannelRef, {
  //         fullNameame: fullName,
  //         PhoneNumber: PhoneNumber,
  //         streetName: streetName,
  //         LandMark: LandMark,
  //         pinCode: pinCode,
  //         AdressLine1: AdressLine1,
  //         AdressLine2: AdressLine2,
  //         gender: gender,
  //       }).then(() => {
  //         localStorage.setItem('userReg',true)
  //         navigate('/');
  //       })
  //     }
  //   }
  // }

  // return (
  //   <>
  //   {
  //     UserReg?
  //     <UserDetails/>
  //     :
  //     <div className="allFill">
  //     <div className="container2">
  //       <div className="form">
  //         <h2 className="h2">Registration {dpImg} </h2>
  //         <div className="content">
  //           <div className="input-box2">
  //             <label htmlFor="dpic">Profile picture</label>
  //             <input className="input2" type="file" name="dpic" required onChange={(e) => setDpImg(e.target.value)} />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="name">Full name</label>
  //             <input className="input2" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" name="name" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="phonenumber">Phone number</label>
  //             <input className="input2" type="tel" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" name="phonenumber" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="street">Street name</label>
  //             <input className="input2" type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} name="street" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="lndMark">Landmark</label>
  //             <input className="input2" type="text" value={LandMark} onChange={(e) => setLandMark(e.target.value)} name="lndMark" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="pincode">Pincode</label>
  //             <input className="input2" type="number" value={pinCode} onChange={(e) => setPincode(e.target.value)} name="pincode" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="add1">Adress line1</label>
  //             <input className="input2" type="text" value={AdressLine1} onChange={(e) => setAdressLine1(e.target.value)} name="add1" required />
  //           </div>
  //           <div className="input-box2">
  //             <label htmlFor="add2">Address line2 (optional)</label>
  //             <input className="input2" type="text" value={AdressLine2} onChange={(e) => setAdressLine2(e.target.value)} name="add2" />
  //           </div>
  //           <span className="gender-title">Gender</span>
  //           <div className="gender-category">
  //             <input type="radio" name="gender" id="male" onChange={(e) => setGender('Male')} />
  //             <label htmlFor="gender">Male</label>
  //             <input type="radio" name="gender" id="female" onChange={(e) => setGender('Female')} />
  //             <label htmlFor="gender">Female</label>
  //             <input type="radio" name="gender" id="other" onChange={(e) => setGender('Other')} />
  //             <label htmlFor="gender">Other</label>
  //           </div>
  //         </div>
  //         <div className="alert">
  //           <p>By clicking Register, you are agree to our <a href="" className="a">Terms</a>, <a href="" className="a">Privacy</a> and <a href="" className="a">Cookies Policy</a>. You may receive SMS
  //             notifications from us and can opt out at any time.</p>
  //         </div>
  //         <div className="button-container2">
  //           <button className="button2" onClick={postData} >Register</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   }
  //   </>
  // )

  const [userEmail, setUserEmail] = useState('Loading...');

    const navigate = useNavigate();
    
    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = getAuth().onAuthStateChanged(user => {
          if (user) {
            setUserEmail(user.email);
          }
        });
    
        // Clean up the subscription when the component unmounts
        return () => {
          unsubscribe();
        };
      }, []);

  return (
    <>
     <div className="container5">
        <p>Signed in as <span className="userEmail">{userEmail}</span> </p>
        <button onClick={()=>getAuth().signOut().then(()=>{navigate('/')})} className="userEmailBtn">Sign Out</button>
     </div>
    </>
  )
}

export default MyProfile
