import React from "react";
import useContent from "../../hooks/useContent";

const HeaderSearch = () => {
    const [inputSearchContent] = useContent("header.input_search");
    
    return(
        <input id="header-search" type="text" placeholder={inputSearchContent} />
    );
}

export default HeaderSearch;