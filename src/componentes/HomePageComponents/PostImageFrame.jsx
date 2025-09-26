import { useRef, useState } from "react";
import {useImageExtractColor} from "../Hooks/useImageExtractColor"

export const PostImageFrame = ({src}) => {
    const imgRef = useRef(null)
    const bgColor = useImageExtractColor(imgRef,src)

    return (
        <div className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px] bg-amber-950" style={{backgroundColor:bgColor}}>
            <img ref={imgRef} src={src} alt="alterno" crossOrigin="anonymous" className="object-contain max-h-[500px]" />
        </div>
    );
};