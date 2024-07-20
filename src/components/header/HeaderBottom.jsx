import React from "react";
import { content } from "../../data/content/header";
import { images } from "../../data/images";

const HeaderBottom = () => {
    const imageArray = [images.homeIcon, images.lessonsIcon, images.forumIcon, images.linkIcon];
    
    return(
        <div className="header-bottom">
            <div className="header-bottom-link-holder">
                {Object.values(content).map((link, index) => {
                    return(
                        <div className="header-bottom-link">
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