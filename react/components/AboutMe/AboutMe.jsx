import './AboutMe.scss';
import { Link } from 'react-router-dom';
export const AboutMe = () => {
    return (
        <>
            <div className={"spacer"}>
                <div className={"aboutMe"}>
                    <h1>Présentation: </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, consequatur dicta dolores
                        eaque earum ex, illum incidunt ipsam iusto molestias non possimus sequi soluta tenetur,
                        voluptatibus? Cupiditate deserunt quis unde.
                    </p>
                </div>

                <div>
                    <button>
                        <Link to="/products">Mes produits</Link>
                    </button>
                </div>
            </div>

        </>
    )
}