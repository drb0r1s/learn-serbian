import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "./reducers/lessonsSlice";

export const store = configureStore({
    reducer: {
        lessons: lessonsReducer
    }
});