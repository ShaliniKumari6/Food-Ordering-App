import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from "../Carts/CartIcon"
import styles from "./HeaderCartButton.module.css"

const HeaderCartButton=props=>{
    const [btnHighlighted, setBtnHighlighted]=useState(false)
    const cartCtx = useContext(CartContext);
    const {items} =cartCtx;
    
    const numberOfCartItems=cartCtx.items.reduce((currNo,item)=>{
       return currNo + item.amount; 
    },0)

    const btnStyle=`${styles.button} ${btnHighlighted? styles.bump : ''}`;
    useEffect(()=>{
        if (items.length === 0) {
            return;
          }
          setBtnHighlighted(true);
      
          const timer = setTimeout(() => {
            setBtnHighlighted(false);
          }, 300);
      
          return () => {
            clearTimeout(timer);
          };
        }, [items]);

    return(
        <button className={btnStyle} onClick={props.onClick}>
            <span className={styles.icon}><CartIcon></CartIcon></span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton;