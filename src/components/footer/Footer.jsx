import React from "react";
import FooterBlock from "./FooterBlock";
import useContent from "../../hooks/useContent";
import { content } from "../../data/content/footer";
import { images } from "../../data/images";

const Footer = () => {
    const strongTitles = useContent(content, ["strong"]);
    
    const generalLinks = useContent(content, ["li", "general"]);
    const servicesLinks = useContent(content, ["li", "services"]);
    const legalLinks = useContent(content, ["li", "legal"]);
    const contributeLinks = useContent(content, ["li", "contribute"]);

    const linksArray = [generalLinks, servicesLinks, legalLinks, contributeLinks];
    
    return(
        <footer>
            <div className="footer-title">learn serbian</div>

            <div className="footer-block-holder">
                {strongTitles.map((strongTitle, index) => {
                    return <FooterBlock
                        key={index}
                        title={strongTitle}
                        links={linksArray[index]}
                    />
                })}
            </div>

            <div className="footer-image-holder">
                <img src={images.discordIcon} alt="DISCORD" />
                <img src={images.youtubeIcon} alt="YOUTUBE" />
                <img src={images.redditIcon} alt="REDDIT" />
                <img src={images.instagramIcon} alt="INSTAGRAM" />
            </div>

            <div className="footer-copyright">
                <span>&#169; Learn Serbian 2019-{new Date().getFullYear()}</span>
            </div>
        </footer>
    );
}

export default Footer;