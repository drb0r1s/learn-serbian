import React from "react";
import Header from "../../components/header/Header";
import LessonsTree from "./LessonsTree";

const Lessons = () => {
    return(
        <section id="lessons">
            <Header />
            
            <div className="lessons-holder">
                <LessonsTree />
            </div>
        </section>
    );
}

export default Lessons;