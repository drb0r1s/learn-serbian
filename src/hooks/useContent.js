import { useState, useEffect } from "react";
import { content } from "../data/content";
import { Language } from "../functions/Language";

const useContent = (contentKey, keywords = []) => {
    const [contents, setContents] = useState([]);
    const languageContent = Language.inject(content);

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

    function getContentObject() {
        const realContentKey = contentKey.split(".")[0];
        let contentObject = {};

        Object.keys(languageContent).forEach((key, index) => {
            if(realContentKey === key) contentObject = Object.values(languageContent)[index];
        });

        return contentObject;
    }

    return contents;
}

export default useContent;