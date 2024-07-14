import React from "react";
import { headerNav } from "../data/header";
import { images } from "../data/images";

const Header = ({ currentPage }) => {
    return(
        <header>
            <div className="header-holder">
                <div className="header-title-block">
                    <p id="header-title">learn serbian</p>
                </div>

                <nav><ul>{headerNav.map((link, index) => {
                    return <li
                        key={index}
                        className={link === currentPage ? "nav-li-active" : ""}
                    ><a href="#">{link}</a></li>;
                })}</ul></nav>

                <div className="header-user-block">
                    <img src={images.userPlaceholder} alt="USER" />
                </div>
            </div>
        </header>
    );
}

export default Header;