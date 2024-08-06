import { createSlice } from "@reduxjs/toolkit";
import { lessons } from "../../externalData/lessons";

const initialState = {
    activeLesson: {...Object.values(lessons)[0], id: 0}
};

const lessonsSlice = createSlice({
    name: "lessons",
    initialState,
    
    reducers: {
        updateActiveLesson: (state, action) => {
            state.activeLesson = action.payload;
        }
    }
});


export const { updateActiveLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;