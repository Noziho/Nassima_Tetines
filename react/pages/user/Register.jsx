import {useState} from "react";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";

export const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleClick(first_name, last_name, email, password) {
        await fetch('/api/user/add', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                "first_name" : first_name,
                "last_name" : last_name,
                "email" : email,
                "password" : password,
            })


        })
            .then((response) => {
                if (response.ok) {
                    location.href = "http://127.0.01:8000/";
                }
            })

    }
    return (
        <>
            <Header />
            <h1>Register</h1>
            <div>
                <label htmlFor="first_name">Prénom</label>
                <input type="text" id={'first_name'} name={'first_name'} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="last_name">Nom</label>
                <input type="text" id={'last_name'} name={'last_name'} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id={'email'} name={'email'} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id={'password'} name={'password'} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div>
                <button onClick={() => (handleClick(firstName, lastName, email, password))}>Inscription</button>
            </div>

            <Footer />
        </>
    )
}