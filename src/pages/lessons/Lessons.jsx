import React from "react";
import Header from "../../components/header/Header";
import LessonsTree from "./LessonsTree";
import { images } from "../../data/images";

const Lessons = () => {
    return(
        <section id="lessons">
            <Header />
            
            <div className="lessons-holder">
                <div className="lessons-info-holder">
                    <h2>Lesson title</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet possimus cum nam minus tenetur unde inventore ipsum sunt, temporibus harum eius quam ipsam, eos tempora nihil tempore? Minus, placeat esse!</p>
                
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