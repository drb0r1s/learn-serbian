import InnerDefault from "../pages/lessons/inner/content/InnerDefault";
import InnerMultipleChoice from "../pages/lessons/inner/content/InnerMultipleChoice";
import InnerTranslate from "../pages/lessons/inner/content/InnerTranslate";
import InnerConversation from "../pages/lessons/inner/content/InnerConversation";
import InnerConnect from "../pages/lessons/inner/content/InnerConnect";
import InnerEnd from "../pages/lessons/inner/content/InnerEnd";

function getLessonBlockComponent(type) {
    switch(type) {
        case "default": return InnerDefault;
        case "multipleChoice": return InnerMultipleChoice;
        case "translate": return InnerTranslate;
        case "conversation": return InnerConversation;
        case "connect": return InnerConnect;
        case "end": return InnerEnd;
    }
}

export default getLessonBlockComponent;