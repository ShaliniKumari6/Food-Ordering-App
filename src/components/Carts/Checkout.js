import {useRef, useState} from 'react';
import styles from './Checkout.module.css'
const Checkout= props=>{
    const [isFormValidity, setIsFormValidity]=useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();

    const isEmpty=(value)=>value.trim()==='';
    const isSixChars=(value)=>value.trim().length===6;

    const confirmHandler=(event)=>{
    
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostal=postalInputRef.current.value;
        const enteredCity=cityInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredPostalIsValid=isSixChars(enteredPostal);
        const enteredCityIsValid=!isEmpty(enteredCity);

        setIsFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal:enteredPostalIsValid,
            city: enteredCityIsValid
        });

        const formIsValid=(enteredCityIsValid && enteredStreetIsValid && enteredNameIsValid && enteredPostalIsValid);

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity
        })

    };

    const nameControlStyles=`${styles.control} ${isFormValidity.name?'':styles.invalid }`;
    const streetControlStyles=`${styles.control} ${isFormValidity.street?'':styles.invalid }`;
    const postalControlStyles=`${styles.control} ${isFormValidity.postal?'':styles.invalid }`;
    const cityControlStyles=`${styles.control} ${isFormValidity.city?'':styles.invalid }`;
    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlStyles}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!isFormValidity.name && <p>Please enter valid name!!</p>}
            </div>
            <div className={streetControlStyles}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!isFormValidity.street && <p>Please enter valid street!!</p>}
            </div>
            <div className={postalControlStyles}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!isFormValidity.postal && <p>Please enter valid Postal Code (6 digit)!!</p>}
            </div>
            <div className={cityControlStyles}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!isFormValidity.city && <p>Please enter valid city!!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancelCheckout}>
                    Cancel
                </button>
        <button className={styles.submit}>Confirm</button>
      </div>
        </form>
    )
}
export default Checkout;