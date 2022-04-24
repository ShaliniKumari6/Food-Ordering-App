import { useRef } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const enteredAmountRef=useRef()
    const submitFormHandler=(event)=>{
        event.preventDefault();
        const enteredAmount=enteredAmountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        if(enteredAmount.trim().length ===0|| enteredAmountNumber< 1 || enteredAmountNumber > 5){
            return; 
        }
        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={styles.form}>
        <Input label='Amount' ref={enteredAmountRef} input={{
           
            id: 'amount' + props.id,
            type: 'number',
            min: 1,
            max: 5,
            step: 1,
        }}></Input>
        <button onClick={submitFormHandler}>+ Add</button>
    </form>
}
export default MealItemForm;