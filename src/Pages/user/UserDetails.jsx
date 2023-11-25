import React, { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserDetails() {

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

export default UserDetails
