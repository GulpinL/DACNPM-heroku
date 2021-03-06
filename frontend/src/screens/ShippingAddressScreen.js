import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [ fullName, setFullName ] = useState(shippingAddress.fullName);
    const [ address, setAddress ] = useState(shippingAddress.address);
    const [ city, setCity ] = useState(shippingAddress.city);
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
    const [ country, setCountry ] = useState(shippingAddress.country);
    console.log(shippingAddress);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
        navigate('/payment');
    }

    useEffect(() => {
        if(!userInfo) {
            navigate('/signin')
        }
    }, [navigate, userInfo]);

    return (
    <div>
        <CheckoutSteps step1 step2 />
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Shipping Address</h1>
            </div>
            <div>
                <label htmlFor="fullName">Full name</label>
                <input 
                    type="text"
                    id="fullName"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required   
                ></input>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input 
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required   
                ></input>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input 
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required   
                ></input>
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input 
                    type="text"
                    id="postalCode"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required   
                ></input>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input 
                    type="text"
                    id="country"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required   
                ></input>
            </div>
            <div>
                <label/>
                <button className="primary" type="submit">Continue</button>
            </div>
        </form>
    </div>
  )
}
