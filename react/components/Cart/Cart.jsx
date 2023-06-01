import './Cart.scss';
import {useEffect, useState} from "react";
import {CartItem} from '../CartItem/CartItem';

export const Cart = ({cartUpdated, setCartUpdated}) => {

    const [CartItems, setCartItems] = useState([]);
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
                {CartItems.map((cartItem) => <CartItem key={cartItem.product.id} product={cartItem.product} />)}
            </div>
        </div>
    )
}