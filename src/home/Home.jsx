import React from "react";
import Header from "../components/Header";
import HomeBlock from "./HomeBlock";
import { images } from "../data/images";
import { content } from "../data/content/home";

const Home = () => {
    return(
        <section>
            <Header currentPage="home" />

            <div className="home-section home-hero">
                <HomeBlock
                    title={content.H2_HERO_TITLE}
                    info={content.P_HERO_INFO}
                    button={content.BUTTON_HERO_EXPLORE}
                />
            </div>

            <div className="home-section home-info">
                <div className="home-inner-section home-lessons">
                    <img src={images.star} alt="STAR" />

                    <HomeBlock
                        title={content.H2_LESSONS_TITLE}
                        info={content.P_LESSONS_INFO}
                        button={content.BUTTON_LESSONS_EXPLORE}
                    />
                </div>

                <div className="home-inner-section">
                    <HomeBlock
                        title={content.H2_FORUM_TITLE}
                        info={content.P_FORUM_INFO}
                        button={content.BUTTON_FORUM_EXPLORE}
                    />

                    <img src={images.forum} alt="FORUM" />
                </div>
            </div>
        </section>
    );
}

export default Home;