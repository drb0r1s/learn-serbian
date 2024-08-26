import React from "react";
import useContent from "../../hooks/useContent";
import { images } from "../../data/images";

const HeaderBottom = () => {
    const linksContent = useContent("header", { keywords: ["li"] });
    const imageArray = [images.homeIcon, images.lessonsIcon, images.forumIcon, images.linkIcon];
    
    return(
        <div className="header-bottom">
            <div className="header-bottom-link-holder">
                {Object.values(linksContent).map((link, index) => {
                    return(
                        <div className="header-bottom-link" key={index}>
                            <img src={imageArray[index]} alt="LINK" />
                            <p>{link}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HeaderBottom;