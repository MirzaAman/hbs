import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
Elements,
CardElement,
useStripe,
useElements
} from "@stripe/react-stripe-js"

const CheckoutForm = () => {
    const stripe = useStripe();

    return <form>
                <CardElement/>
                <button type='submit' disabled={!stripe}></button>
        </form>
}

const stripePromise = await loadStripe('pk_test_51NtpXqSADMqeVZrCq1oDVVL5088fSSHHouAiOZlbN6UawDn5euPSiWaFYht5pwfKBJA8cBE5IYMpNK8sZ8b9WY5t00gxwX5FOB');

function Pay() {

    
    return (
        <Elements stripe={stripePromise} >
            <CheckoutForm/>
        </Elements>
    )
}

export default Pay
