import { ExtendedMath } from "./ExtendedMath";

function handType(element, text, isInput = false) {
    let position = 0;

    update();
    
    let interval = setInterval(() => {
        if(position > text.length - 1) return clearInterval(interval);
        update();
    }, ExtendedMath.random(1, 2) * 100);
    
    function update() {
        if(isInput) element.value += text[position];
        else element.innerText += text[position];

        position++;
    }
}

export default handType;