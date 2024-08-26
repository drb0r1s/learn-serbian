import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HomeBlock from "./HomeBlock";
import useContent from "../../hooks/useContent";
import useMobile from "../../hooks/useMobile";
import { images } from "../../data/images";

const Home = () => {
    const { isMobile } = useMobile();

    const [heroTitle, heroInfo, heroButton] = useContent("home", { keywords: ["hero"] });
    const [lessonsTitle, lessonsInfo, lessonsButton] = useContent("home", { keywords: ["lessons"] });
    const [forumTitle, forumInfo, forumButton] = useContent("home", { keywords: ["forum"] });

    return(
        <section id="home">
            <Header />

            <div className="home-section home-hero">
                <HomeBlock
                    title={heroTitle}
                    info={heroInfo}
                    button={heroButton}
                    isMobile={false}
                />

                {isMobile ? <img src={images.hero} alt="GREETINGS" /> : <></>}
            </div>

            <div className="home-section home-info">
                <div className="home-inner-section home-lessons">
                    {isMobile ? <></> : <img src={images.star} alt="STAR" />}

                    <HomeBlock
                        title={lessonsTitle}
                        image={images.star}
                        info={lessonsInfo}
                        button={lessonsButton}
                        isMobile={isMobile}
                    />
                </div>

                <div className="home-inner-section">
                    <HomeBlock
                        title={forumTitle}
                        image={images.forum}
                        info={forumInfo}
                        button={forumButton}
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