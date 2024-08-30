import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InnerProgressBar from "./InnerProgressBar";
import { images } from "../../../data/images";
import { Language } from "../../../functions/Language";

const InnerHeader = ({ inner, innerHeader, stopLesson, progressBar }) => {
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

            <InnerProgressBar progressBar={progressBar} />
        </header>
    );
}

export default InnerHeader;