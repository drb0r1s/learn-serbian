import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import LessonsTree from "./LessonsTree";
import useExternalData from "../../hooks/useExternalData";
import { images } from "../../data/images";

const Lessons = () => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);
    const lessonsSearchbar = useSelector(state => state.lessons.searchbar);
    
    const lessons = useExternalData("lessons");

    const [treeLessons, setTreeLesons] = useState(lessons);

    useEffect(() => { setTreeLesons(lessons) }, [lessons]);

    useEffect(() => {
        let newLessons = {};

        Object.values(lessons).forEach((lesson, index) => {
            const lessonKey = Object.keys(lessons)[index];
            const lessonName = lesson.name.toLowerCase();
            
            if(lessonName.includes(lessonsSearchbar.toLowerCase())) newLessons = {...newLessons, [lessonKey]: lesson};
        });

        setTreeLesons(newLessons);
    }, [lessonsSearchbar]);

    return(
        <section id="lessons">
            <Header />
            
            <div className="lessons-holder">
                <div className="lessons-info-holder">
                    <h2>{activeLesson.name}</h2>
                    <p>{activeLesson.description}</p>
                
                    <div className="lessons-info-holder-time-points-holder">
                        <div className="lessons-info-holder-time-holder">
                            <img src={images.timeBlueIcon} alt="TIME" />
                            <strong>{activeLesson.time}</strong>
                        </div>

                        <div className="lessons-info-holder-points-holder">
                            <img src={images.linkYellowIcon} alt="POINTS" />
                            <strong>{activeLesson.points}</strong>
                        </div>
                    </div>

                    <button>Begin</button>
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