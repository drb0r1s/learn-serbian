import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import HeaderBottom from "./HeaderBottom";
import useContent from "../../hooks/useContent";
import useMobile from "../../hooks/useMobile";
import { images } from "../../data/images";

const Header = () => {
    const { pathname } = useLocation();
    const { isMobile } = useMobile(1025);
    
    const linksContent = useContent("header", ["li"]);
    
    function getActiveLink(link) {
        if(link === "Home" && pathname === "/") return true;
        return link.toLowerCase() === pathname.substring(1);
    }
    
    return(
        <>
            <header>
                <div className="header-holder">
                    <div className="header-title-block">
                        {pathname === "/" ? <p id="header-title">learn serbian</p> : <HeaderSearch />}
                    </div>

                    {isMobile ? <></> : <nav><ul>{Object.values(linksContent).map((link, index) => {
                        return <li
                            key={index}
                            className={getActiveLink(link) ? "nav-li-active" : ""}
                        >
                            <Link
                                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                            >{link}</Link>
                        </li>;
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