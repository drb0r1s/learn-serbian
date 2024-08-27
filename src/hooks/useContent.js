import { useState, useEffect } from "react";
import { content } from "../data/content";
import { Language } from "../functions/Language";

const useContent = (contentKey, options) => {
    const [contents, setContents] = useState([]);
    const languageContent = Language.inject(content);

    useEffect(() => {
        const contentObject = getContentObject();
        
        if(!options?.keywords?.length) {
            let newContent = "";
            const specifiedContentKey = contentKey.split(".")[1];

            if(specifiedContentKey) Object.keys(contentObject).forEach((key, index) => {
                if(specifiedContentKey.toLowerCase() === key.toLowerCase()) newContent = Object.values(contentObject)[index];
            });

            if(options?.parameters) Object.keys(options.parameters).forEach((key, index) => {
                newContent = newContent.replaceAll(`<${key}>`, Object.values(options.parameters)[index]);
            });

            setContents(newContent);
        }
        
        else {
            const newContents = [];
            
            Object.keys(contentObject).forEach((key, index) => {
                let result = true;
                let counter = 0;
    
                const dividedKeys = key.split("_");
        
                while(result && options.keywords[counter]) {
                    let matching = false;
                    
                    dividedKeys.forEach(dividedKey => {
                        if(options.keywords[counter].toLowerCase() === dividedKey.toLowerCase()) matching = true;
                    });
    
                    if(!matching) result = false;
                    else counter++;
                }
        
                if(result) newContents.push(Object.values(contentObject)[index]);
            });

            setContents(newContents);
        }
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