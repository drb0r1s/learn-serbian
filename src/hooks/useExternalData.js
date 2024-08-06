import { useEffect, useState } from "react"
import { lessons } from "../externalData/lessons"

const useExternalData = (key) => {
    const [externalData, setExternalData] = useState({});
    
    useEffect(() => {
        switch(key) {
            case "lessons":
                setExternalData(injectIds(lessons));
                break;
            default:
        }
    }, []);

    function injectIds(data) {
        let newData = data;

        Object.values(newData).forEach((value, index) => {
            newData = {...newData, [Object.keys(newData)[index]]: {...value, id: index}};
        });

        return newData;
    }

    return externalData;
}

export default useExternalData;