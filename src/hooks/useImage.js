import { useState, useEffect } from "react";
import { images } from "../data/images";

const useImage = (imageName) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        let newImage = "";

        Object.keys(images).forEach((key, index) => {
            if(imageName === key) newImage = Object.values(images)[index];
        });

        setImage(newImage);
    }, []);

    return image;
}

export default useImage;