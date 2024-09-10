import React from "react";
import useCaseSensitive from "../hooks/useCaseSensitive";

const SpecialLetters = ({ inputValue, setInputValue, isDisabled }) => {
    const specialLetters = useCaseSensitive(["č", "ć", "š", "đ", "ž"], inputValue);
    
    function writeSpecialLetter(e) {
        const specialLetter = e.target.innerText;
        setInputValue(prevInputValue => prevInputValue + specialLetter);
    }
    
    return(
        <div className="special-letters-holder">
            {specialLetters.map((specialLetter, index) => {
                return <button
                    className={isDisabled ? "button-disabled" : ""}
                    disabled={isDisabled}
                    onClick={writeSpecialLetter}
                    key={index}
                >{specialLetter}</button>
            })}
        </div>
    );
}

export default SpecialLetters;