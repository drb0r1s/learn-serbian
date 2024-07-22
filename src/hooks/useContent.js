import { useState, useEffect } from "react";
import { content } from "../data/content";

const useContent = (contentKey, keywords = []) => {
    const [contents, setContents] = useState([]);

    function getContentObject() {
        const realContentKey = contentKey.split(".")[0];
        let contentObject = {};

        Object.keys(content).forEach((key, index) => {
            if(realContentKey === key) contentObject = Object.values(content)[index];
        });

        return contentObject;
    }

    useEffect(() => {
        const contentObject = getContentObject();
        const newContents = [];
        
        if(!keywords.length) {
            const specifiedContentKey = contentKey.split(".")[1];

            if(specifiedContentKey) Object.keys(contentObject).forEach((key, index) => {
                if(specifiedContentKey.toLowerCase() === key.toLowerCase()) newContents.push(Object.values(contentObject)[index]);
            });
        }
        
        else Object.keys(contentObject).forEach((key, index) => {
            let result = true;
            let counter = 0;

            const dividedKeys = key.split("_");
    
            while(result && keywords[counter]) {
                let matching = false;
                
                dividedKeys.forEach(dividedKey => {
                    if(keywords[counter].toLowerCase() === dividedKey.toLowerCase()) matching = true;
                });

                if(!matching) result = false;
                else counter++;
            }
    
            if(result) newContents.push(Object.values(contentObject)[index]);
        });

        setContents(newContents);
    }, [contentKey]);

    return contents;
}

export default useContent;