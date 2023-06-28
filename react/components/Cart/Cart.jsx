import './Cart.scss';
import {useContext, useEffect, useState} from "react";
import {CartItem} from '../CartItem/CartItem';
import {CartContextProvider} from "../../context/CartContext";

export const Cart = () => {

    const [CartItems, setCartItems] = useState([]);
    const {cartUpdated, setCartUpdated} = useContext(CartContextProvider);

    useEffect(() => {
       async function getCart() {
           const response = await fetch('/api/cart');
           const data = await response.json();
           setCartItems(data.cartItems);
           setCartUpdated(false);
       }

       getCart()
        .catch (() => console.log('Erreur lors de la récupération du panier.'));
    }, [cartUpdated]);

    return (
        <div className={"cart"}>
            <h1>Panier</h1>
            <div className={'cartItems'}>
                {CartItems.map((cartItem) => <CartItem key={cartItem.product_id} cartItem={cartItem}  />)}

                <div>
                    <button>Vider le panier</button>
                </div>
            </div>
        </div>
    )
}