import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const ProductDetails = ({setCartUpdated}) => {

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [firstname, setFirstname] = useState("");
    const [mouthPiece, setMouthPiece] = useState("");
    const [age, setAge] = useState("");
    const [color, setColor] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const params = useParams();

    async function handleClick(productID, quantity, firstname, mouthPiece, age, color, fontFamily) {
        await fetch('/api/cart/add', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                "product_id" : productID,
                "quantity" : quantity,
                "firstname" : firstname,
                "mouthPiece" : mouthPiece,
                "age" : age,
                "color" : color,
                "fontFamily" : fontFamily
            })


        })
            .then((response) => {
                if (response.ok) {
                    location.href = "http://127.0.01:8000/products";
                }
            })

    }

    useEffect(() => {
        async function getProduct() {
            const data = await fetch('/api/product/' + params.productID);
            setProduct(await data.json());
        }

        getProduct()
            .catch(() => console.log('Erreur lors de la récupération du produit'));
    }, []);
    return (
        <>
            <Header />
            <div className={"productDetails"}>
                <h1>{product.name}</h1>
                <div>
                    <label htmlFor="quantity">Quantité: </label>
                    <select name="quantity" id="quantity" onChange={(e) => setQuantity(parseInt(e.target.value))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                    <label htmlFor="first_name">Prénom: </label>
                    <input id="first_name" name="first_name" type="text" min="2" maxLength="55" onChange={(e) => setFirstname(e.target.value)}/>

                        <label htmlFor="tips">Embout: </label>
                        <select name="tips" id="tips" onChange={(e) => setMouthPiece(e.target.value)}>
                            <option value="Anatomique">Anatomique</option>
                            <option value="Cerise">Cerise</option>
                            <option value="Dynamique">Dynamique</option>
                            <option value="Physiologique">Physiologique</option>
                        </select>

                    <label htmlFor="age">Age: </label>
                    <select name="age" id="age" onChange={(e) => setAge(e.target.value)}>
                        <option value="6">0/6mois</option>
                        <option value="36">6/36 mois</option>
                    </select>

                    <label htmlFor="color"> Couleur: </label>
                    <select name="color" id="color" onChange={(e) => setColor(e.target.value)}>
                        <option className="pink" value="Rose">Rose</option>
                        <option className="violet" value="Violet">Violet</option>
                        <option className="skyBlue" value="Bleu ciel">Bleu ciel</option>
                        <option className="blue" value="Bleu marine">Bleu marine</option>
                        <option className="yellow" value="Jaune">Jaune</option>
                        <option className="red" value="Rouge">Rouge</option>
                        <option className="appleGreen" value="Pomme">Pomme</option>
                        <option className="fushia" value="Fushia">Fushia</option>
                        <option className="black" value="Noir">Noir</option>
                        <option className="cyan" value="Cyan">Cyan</option>
                        <option className="white" value="Blanc">Blanc</option>
                        <option className="orange" value="Orange">Orange</option>
                        <option className="brown" value="Marron">Marron</option>
                        <option className="green" value="Vert">Vert</option>
                    </select>

                    <label htmlFor="font_family"> Police d'écriture: </label>
                    <select name="font_family" id="font_family" onChange={(e) => setFontFamily(e.target.value)}>
                        <option value="Police d'écriture 1">Écriture 1</option>
                        <option value="Police d'écriture 2">Écriture 2</option>
                        <option value="Police d'écriture 3">Écriture 3</option>
                        <option value="Police d'écriture 4">Écriture 4</option>
                        <option value="Police d'écriture 5">Écriture 5</option>
                        <option value="Police d'écriture 6">Écriture 6</option>
                        <option value="Police d'écriture 7">Écriture 7</option>
                        <option value="Police d'écriture 8">Écriture 8</option>
                        <option value="Police d'écriture 9">Écriture 9</option>
                        <option value="Police d'écriture 10">Écriture 10</option>
                    </select>

                    <button onClick={() => handleClick(product.id, quantity, firstname, mouthPiece, age, color, fontFamily)}>Ajoutez au panier</button>
                </div>
            </div>
            <Footer />
        </>
    )
}