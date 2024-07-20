import React from "react";
import HeaderBottom from "./HeaderBottom";
import useMobile from "../../hooks/useMobile";
import { content } from "../../data/content/header";
import { images } from "../../data/images";

const Header = ({ currentPage }) => {
    const { isMobile } = useMobile(1025);
    
    return(
        <>
            <header>
                <div className="header-holder">
                    <div className="header-title-block">
                        <p id="header-title">learn serbian</p>
                    </div>

                    {isMobile ? <></> : <nav><ul>{Object.values(content).map((link, index) => {
                        return <li
                            key={index}
                            className={link === currentPage ? "nav-li-active" : ""}
                        ><a href="#">{link}</a></li>;
                    })}</ul></nav>}

                    <div className="header-user-block">
                        <img src={images.userPlaceholder} alt="USER" />
                    </div>
                </div>
            </header>
            
            {isMobile ? <HeaderBottom /> : <></>}
        </>
    );
}

export default Header;