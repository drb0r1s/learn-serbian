import React from "react";

const FooterBlock = ({ title, links }) => {
    return(
        <div className="footer-block">
            <strong>{title}</strong>

            <ul>
                {links.map((link, index) => {
                    return <li key={index}><a href="#">{link}</a></li>;
                })}
            </ul>
        </div>
    );
}

export default FooterBlock;