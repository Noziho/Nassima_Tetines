import {Header} from "../components/Header/Header";
import {AboutMe} from "../components/AboutMe/AboutMe";
import {Footer} from "../components/Footer/Footer";
import {useState} from "react";

export const Home = () => {
    return (
        <>
            <Header />
            <AboutMe />
            <Footer />
        </>
    )
}