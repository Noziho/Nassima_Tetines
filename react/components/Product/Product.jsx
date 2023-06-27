import './Product.scss';
import {Link} from "react-router-dom";

export const Product = ({product}) => {
    return (
        <>
            <div className={"product"}>
                <div className={"productPresentation"}>
                    <img className={"productImg"} src={"/img/productsImg/" + product.image} alt="Image"/>
                    <h1 className={"productName"}>{product.name}</h1>
                </div>

                <div className={"persoButton"}>
                    <Link to={"/product/" + product.id}>
                        <button>
                            Personnalisez
                        </button>
                    </Link>
                </div>

            </div>
        </>

    )
}