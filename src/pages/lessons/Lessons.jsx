import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import LessonsTree from "./LessonsTree";
import { images } from "../../data/images";

const Lessons = () => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);
    
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
                            <strong>10:00</strong>
                        </div>

                        <div className="lessons-info-holder-points-holder">
                            <img src={images.linkYellowIcon} alt="POINTS" />
                            <strong>135</strong>
                        </div>
                    </div>

                    <button>Begin</button>
                </div>

                <div className="lessons-tree-holder">
                    <LessonsTree />
                </div>
            </div>
        </section>
    );
}

export default Lessons;