import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lessonsActions } from "../../../state/reducers/lessonsSlice";
import { images } from "../../../data/images";

const InnerHeader = ({ inner }) => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => { inner.current.style.top = "0" }, 1);
    }, []);

    function stopLesson() {
        inner.current.style.top = "";
        setTimeout(() => { dispatch(lessonsActions.updateInLesson(false)) }, 500);
    }
    
    return(
        <header className="lessons-inner-header">
            <div className="lessons-inner-header-points-holder">
                <img src={images.linkYellowIcon} alt="POINTS" />
                <strong>0</strong>
            </div>

            <h2>{activeLesson.name}</h2>

            <img src={images.xIcon} alt="X" onClick={stopLesson} />
        </header>
    );
}

export default InnerHeader;