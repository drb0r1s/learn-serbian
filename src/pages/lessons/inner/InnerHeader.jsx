import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { images } from "../../../data/images";
import { Language } from "../../../functions/Language";

const InnerHeader = ({ inner, innerHeader, stopLesson }) => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);

    useEffect(() => {
        setTimeout(() => { inner.current.style.top = "0" }, 1);
    }, []);
    
    return(
        <header className="lessons-inner-header" ref={innerHeader}>
            <div className="lessons-inner-header-points-holder">
                <img src={images.linkYellowIcon} alt="POINTS" />
                <strong>0</strong>
            </div>

            <h2>{Language.inject(activeLesson.name)}</h2>

            <img src={images.xIcon} alt="X" onClick={stopLesson} />
        </header>
    );
}

export default InnerHeader;