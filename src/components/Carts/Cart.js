import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props => {
    const [isCheckout, setIsCheckout]=useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx=useContext(CartContext);
    const hasItem=cartCtx.items.length>0;
    const totalAmount=`Rs.${cartCtx.totalAmount.toFixed(2)}`

    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item, amount:1});
    };

    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id);
    };
    const checkoutHandler=()=>{
        setIsCheckout(true)
    }

    const cancelCheckoutHandler=()=>{
        setIsCheckout(false);
    }
    const confirmCheckoutHandler= async (userData)=>{
        setIsSubmitting(true);
        await fetch('https://indian-meals-default-rtdb.firebaseio.com/ordres.json',
         {
            method :'POST',
            body: JSON.stringify({
                user: userData,
                orderedItem: cartCtx.items
            })
            } );
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();

    }

    const cartItem = (<ul className={styles['cart-items']}>
        {cartCtx.items.map(item => (
        <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
       ></CartItem>
    ))}
    </ul>);

    const cartModalContent=(<>
    {!isCheckout && cartItem}
            <div className={styles.total}>
                <span> Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={confirmCheckoutHandler} onCancelCheckout={cancelCheckoutHandler}></Checkout>}
            {!isCheckout && <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onCartHide}>Close</button>
                {hasItem && <button className={styles.button} onClick={checkoutHandler}>Order</button>}
            </div>}
    </>);
    const isSubmittingModalContent=<p>Sending Orderd Data.....</p>
    const didSubmitModalContent= <><p>Successfully Sent Orderd Data !!</p>
    <div className={styles.actions}>
                <button className={styles.button} onClick={props.onCartHide}>Close</button>
            </div>
    </> 

    return (
        <Modal onCartHide={props.onCartHide}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};
export default Cart;