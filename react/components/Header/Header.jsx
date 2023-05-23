import './Header.scss';
import logo from '../../../assets/img/first-image1-transformed.png';
export const Header = () => {
    return (
        <header>
            <div className={"logo"}>
                <img src={logo} alt=""/>
            </div>
        </header>
    )
}