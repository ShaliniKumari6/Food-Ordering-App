import React, {useState} from 'react';
import Cart from './components/Carts/Cart';
import Header from './components/Layouts/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartShown,setCartShown] = useState(false);

  const showCartHandler=props=>{
    setCartShown(true);
  }
  const hideCartHandler=props=>{
    setCartShown(false);
  }
  return (
    <CartProvider>
      {cartShown && <Cart onCartHide={hideCartHandler}></Cart>}
      <Header onCartShow={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
