import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/header/Header";
import Inner from "./inner/Inner";
import LessonsTree from "./LessonsTree";
import useExternalData from "../../hooks/useExternalData";
import { lessonsActions } from "../../state/reducers/lessonsSlice";
import { images } from "../../data/images";

const Lessons = () => {
    const lessonsReducer = useSelector(state => state.lessons);
    const dispatch = useDispatch();
    
    const lessons = useExternalData("lessons");

    const [treeLessons, setTreeLesons] = useState(lessons);

    useEffect(() => { setTreeLesons(lessons) }, [lessons]);

    useEffect(() => {
        let newLessons = {};

        Object.values(lessons).forEach((lesson, index) => {
            const lessonKey = Object.keys(lessons)[index];
            const lessonName = lesson.name.toLowerCase();
            
            if(lessonName.includes(lessonsReducer.searchbar.toLowerCase())) newLessons = {...newLessons, [lessonKey]: lesson};
        });

        setTreeLesons(newLessons);
    }, [lessonsReducer.searchbar]);

    function startLesson() {
        dispatch(lessonsActions.updateInLesson(true));
    }

    return(
        <section id="lessons">
            <Header />
            {lessonsReducer.inLesson ? <Inner /> : <></>}
            
            <div className="lessons-holder">
                <div className="lessons-info-holder">
                    <h2>{lessonsReducer.activeLesson.name}</h2>
                    <p>{lessonsReducer.activeLesson.description}</p>
                
                    <div className="lessons-info-holder-time-points-holder">
                        <div className="lessons-info-holder-time-holder">
                            <img src={images.timeBlueIcon} alt="TIME" />
                            <strong>{lessonsReducer.activeLesson.time}</strong>
                        </div>

                        <div className="lessons-info-holder-points-holder">
                            <img src={images.linkYellowIcon} alt="POINTS" />
                            <strong>{lessonsReducer.activeLesson.points}</strong>
                        </div>
                    </div>

                    <button onClick={startLesson}>Begin</button>
                </div>

                <div
                    className="lessons-tree-holder"
                    style={!Object.values(treeLessons).length ? { alignItems: "center", margin: "0" } : {}}
                >
                    {!Object.values(treeLessons).length ? <strong id="lessons-tree-no-lessons">There are no lessons.</strong> : <></>}
                    <LessonsTree treeLessons={treeLessons} />
                </div>
            </div>
        </section>
    );
}

export default Lessons;