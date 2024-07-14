import React from "react";
import Header from "../components/Header";
import { content } from "../data/content/home";

const Home = () => {
    return(
        <section>
            <Header currentPage="home" />

            <div className="home-section home-hero">
                <div className="home-hero-block">
                    <h1>{content.h1Title}</h1>
                    <p>{content.pInfo}</p>
                    <button>{content.buttonExplore}</button>
                </div>
            </div>

            <div className="home-section"></div>
            <div className="home-section"></div>
        </section>
    );
}

export default Home;