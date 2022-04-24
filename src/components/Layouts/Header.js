import React, {Fragment} from 'react';
import styles from "./Header.module.css"

import Image from "../../images/food-image.jpg"
import HeaderCartButton from './HeaderCartButton';

const Header=(props)=>{
    return(
        <Fragment>
            <header className={styles.header}>
                <h1>Indian Meals</h1>
                <HeaderCartButton onClick={props.onCartShow}></HeaderCartButton>
           
            </header>
            <div className={styles['main-image']}>
                <img src={Image} alt=" Delicious Food!!"></img>
            </div>
        </Fragment>
        )
}
export default Header;