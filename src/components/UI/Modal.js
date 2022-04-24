import { createPortal } from "react-dom";
import styles from './Modal.module.css'

const Backdrop=(props)=>{
    return <div className={styles.backdrop} onClick={props.onCartHide}></div>
}

const ModalOverlay=props=>{
    return <div>
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    </div>
}
const portalElement=document.getElementById('overlays')
const Modal=props=>{
    return <>
    {createPortal(<Backdrop onCartHide={props.onCartHide}></Backdrop>,portalElement)}
    {createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
}
export default Modal;