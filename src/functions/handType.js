import { ExtendedMath } from "./ExtendedMath";

function handType({ element, content, isInput, onFinish }) {
    let position = 0;

    update();
    
    let interval = setInterval(() => {
        if(position > content.length - 1) {
            clearInterval(interval);
            if(onFinish) onFinish();
        }
        
        else update();
    }, ExtendedMath.random(1, 2) * 100);
    
    function update() {
        if(isInput) element.value += content[position];
        else element.innerText += content[position];
        
        position++;
    }
}

export default handType;