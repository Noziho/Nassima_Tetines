import './CarItem.scss';
import {useEffect, useState} from "react";
import {redirect} from "react-router-dom";

export const CartItem = ({cartItem}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function getProduct() {
            const data = await fetch('/api/cartItem/' + cartItem.id);
            setProduct(await data.json());
            console.log(cartItem)
        }

        getProduct()
            .catch(() => console.log("Erreur lors de la récupération des produits pour le panier"))
    }, [])

    function handleClick () {
        const data = fetch('/api/cartItem/delete/' + cartItem.id)
        {/** #TODO: update cartitem/cart component  **/}
        if (data.response.ok) {
            location.href('http://127.0.0.1/products');
        }
    }
    return (
        <>
            <div className={'cartItem'}>
                <h3>{product.name}</h3>
                <div>
                    <img className={"productImgThumbnail"} src={"/img/productsImg/" + product.image}  alt=""/>
                </div>
                <div>
                    <p>Prénom: {cartItem.firstName}</p>
                    <p>Embout: {cartItem.mouthPiece}</p>
                    <p>Couleur: {cartItem.color}</p>
                    <p>Âge: {cartItem.age}</p>
                    <p>Quantité: {cartItem.quantity}</p>
                    <p>Prix: {product.price} €</p>
                    <button onClick={handleClick}>Supprimez</button>
                </div>
            </div>

        </>
    )
}