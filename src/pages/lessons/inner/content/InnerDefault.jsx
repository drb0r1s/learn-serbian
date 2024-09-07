import React from "react";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useImage from "../../../../hooks/useImage";
import { Language } from "../../../../functions/Language";

const InnerDefault = ({ id, block, blockJump }) => {
    const buttonContent = useContent("lessonsInner.button_default_continue");
    const image = useImage(block.image);
    
    return(
        <div className="lessons-inner-block lessons-inner-default">
            <div className="lessons-inner-block-holder lessons-inner-default-holder">
                <h3>{Language.inject(block.title)}</h3>
                <p>{Language.inject(block.description)}</p>
                
                <BlockButton
                    content={buttonContent}
                    blockJump={blockJump}
                    blockId={id}
                />
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerDefault;