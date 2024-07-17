import { useState, useEffect } from "react";

const useContent = (content, keywords) => {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const newContents = [];
        
        Object.keys(content).forEach((key, index) => {
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
    
            if(result) newContents.push(Object.values(content)[index]);
        });

        setContents(newContents);
    }, [content]);

    return contents;
}

export default useContent;