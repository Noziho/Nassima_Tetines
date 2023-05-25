import './Product.scss';

export const Product = ({product}) => {
    return (
        <>
            <div>
                <h1>{product.name}</h1>
            </div>
        </>

    )
}