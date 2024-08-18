import { useState, useEffect } from "react";

const useCaseSensitive = (lettersArray, inputValue) => {
    const [letters, setLetters] = useState(lettersArray);
    const endOfSentence = /(?<=([a-zA-Z0-9].+))[.?!]\s?$/gm;

    useEffect(() => {
        if(!inputValue || endOfSentence.test(inputValue)) setLetters(getUpperCase());
        else setLetters(getLowerCase());
    }, [inputValue]);

    function getUpperCase() {
        const newLetters = [];
        letters.forEach(letter => { newLetters.push(letter.toUpperCase()) });

        return newLetters;
    }

    function getLowerCase() {
        const newLetters = [];
        letters.forEach(letter => { newLetters.push(letter.toLowerCase()) });

        return newLetters;
    }

    return letters;
}

export default useCaseSensitive;