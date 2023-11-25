import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../components/firebase/config'

function SubscribedEmail() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'emails')); // Replace with your collection name
                const newData = [];

                querySnapshot.forEach((doc) => {
                    newData.push({ id: doc.id, ...doc.data() });
                });

                setData(newData);
            } catch (error) {
                console.error('Error fetching data from Firestore: ', error);
            }
        };

        fetchData();
    }, [])

    if (!data) {
        return <div className='container10' > <div className="container11">Loading...</div> </div>
    }

    return (
        <>
            <div className='container10' >
                <div className="container11">
                    <h1>Subscibed emails</h1>
                    <ul style={{ listStyleType: 'disc' }} >
                        {
                            data.map((item) => {
                                return (
                                    <li key={item.id}> {item.mail} </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SubscribedEmail
