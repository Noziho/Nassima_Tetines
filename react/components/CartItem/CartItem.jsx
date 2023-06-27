import './CarItem.scss';
import {useEffect, useState} from "react";

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
                </div>
            </div>

        </>
    )
}