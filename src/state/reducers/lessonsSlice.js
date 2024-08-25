import { createSlice } from "@reduxjs/toolkit";
import { lessons } from "../../externalData/lessons";

const initialState = {
    activeLesson: {...Object.values(lessons)[0], id: 0},
    inLesson: false,
    lessonBlock: 0,
    searchbar: ""
};

const lessonsSlice = createSlice({
    name: "lessons",
    initialState,
    
    reducers: {
        updateActiveLesson: (state, action) => {
            state.activeLesson = action.payload;
        },

        updateInLesson: (state, action) => {
            state.inLesson = action.payload;
        },

        updateLessonBlock: (state, action) => {
            state.lessonBlock += action.payload;
        },

        updateSearchbar: (state, action) => {
            state.searchbar = action.payload;
        }
    }
});


export const lessonsActions = lessonsSlice.actions;
export default lessonsSlice.reducer;