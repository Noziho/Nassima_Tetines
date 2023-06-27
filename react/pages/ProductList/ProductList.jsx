import './ProductList.scss';
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {useEffect, useState} from "react";
import {Product} from "../../components/Product/Product";
import {Categories} from "../../components/Categories/Categories";
import {Cart} from "../../components/Cart/Cart";

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

    const [category, setCategory] = useState(1);

    return (
        <>
            <Header/>
            <div className={"containerProductPage"}>
                <Cart />

                <div id={"productListContainer"}>
                    <div id={"categoriesSelect"}>
                        <Categories setCategory={setCategory}/>
                    </div>
                    <div className='productList'>
                        {
                            products
                                .filter(product => category === 0 || product.category.id === category)
                                .map(product => <Product key={product.id} product={product} />)
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </>

    )
}