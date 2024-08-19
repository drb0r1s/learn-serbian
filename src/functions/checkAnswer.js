import extractWords from "./extractWords";
import { ArrayFunctions } from "./ArrayFunctions";
import { Language } from "./Language";

function checkAnswer(block, userAnswer) {
    let isCorrect = false;
    
    switch(block.type) {
        case "multipleChoice":
            if(userAnswer === block.answer) isCorrect = true;
            break;

        case "translate":
            const userAnswerWords = extractWords(userAnswer);

            Language.inject(block.answers).forEach(answer => {
                const answerWords = extractWords(answer);
                if(ArrayFunctions.compareTwo(userAnswerWords, answerWords)) isCorrect = true;
            });
        
            break;
        
        default:
    }

    return { isCorrect };
}

export default checkAnswer;