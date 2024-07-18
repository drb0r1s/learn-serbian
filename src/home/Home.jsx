import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import HomeBlock from "./HomeBlock";
import { images } from "../data/images";
import { content } from "../data/content/home";

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const checkIsMobile = () => { setIsMobile(window.innerWidth <= 768) }
        window.addEventListener("resize", checkIsMobile);
    }, []);

    return(
        <section>
            <Header currentPage="home" />

            <div className="home-section home-hero">
                <HomeBlock
                    title={content.H2_HERO_TITLE}
                    info={content.P_HERO_INFO}
                    button={content.BUTTON_HERO_EXPLORE}
                    isMobile={false}
                />

                {isMobile ? <img src={images.hero} alt="GREETINGS"></img> : <></>}
            </div>

            <div className="home-section home-info">
                <div className="home-inner-section home-lessons">
                    {isMobile ? <></> : <img src={images.star} alt="STAR" />}

                    <HomeBlock
                        title={content.H2_LESSONS_TITLE}
                        image={images.star}
                        info={content.P_LESSONS_INFO}
                        button={content.BUTTON_LESSONS_EXPLORE}
                        isMobile={isMobile}
                    />
                </div>

                <div className="home-inner-section">
                    <HomeBlock
                        title={content.H2_FORUM_TITLE}
                        image={images.forum}
                        info={content.P_FORUM_INFO}
                        button={content.BUTTON_FORUM_EXPLORE}
                        isMobile={isMobile}
                    />

                    {isMobile ? <></> : <img src={images.forum} alt="FORUM" />}
                </div>
            </div>

            <Footer />
        </section>
    );
}

export default Home;