import './Categories.scss';
import {useEffect, useState} from "react";

export const Categories = (setCategory) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories () {
            const data = await fetch('/api/categories');
            setCategories(await data.json());
        }
        getCategories()
            .catch(() => console.log('Erreur de récupération des catégories'));
    }, []);

    return (
        <>
            <select name="" id={'categories'} className={"category-selection"} onChange={(e) => setCategory(parseInt(e.target.value))}>
                {categories.map(category =>
                    <option value={category.id} key={category.id}>
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </option>
                )}

            </select>
        </>
    )
}