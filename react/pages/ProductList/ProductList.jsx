import './ProductList.scss';
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {useEffect, useState} from "react";
import {Product} from "../../components/Product/Product";
import {Categories} from "../../components/Categories/Categories";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const data = await fetch('/api/products');
            setProducts(await data.json());
        }

        getProducts()
            .catch(() => console.log('Erreur lors de la récupération des produits'));
    }, []);

    const [category, setCategory] = useState(0);

    return (
        <>
            <Header/>
            <Categories setCategory={setCategory} />
            <div className='productList'>
                {
                    products
                        .filter(product => category === 0 || product.category.id === category)
                        .map(product => <Product key={product.id} product={product}/>)
                }
            </div>

            <Footer />
        </>

    )
}