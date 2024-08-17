export const ArrayFunctions = {
    compareTwo: (first, second) => {
        if(first.length !== second.length) return false;

        let status = true;
        for(let i = 0; i < first.length; i++) if(first[i] !== second[i]) status = false;

        return status;
    },

    randomize: (array, savePosition) => {
        const randomizedArray = [];
        const usedIndexes = [];

        while(array.length !== randomizedArray.length) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if(usedIndexes.indexOf(randomIndex) > -1) continue;

            if(savePosition) randomizedArray.push({ element: array[randomIndex], index: randomIndex });
            else randomizedArray.push(array[randomIndex]);
            
            usedIndexes.push(randomIndex);
        }

        return randomizedArray;
    }
};